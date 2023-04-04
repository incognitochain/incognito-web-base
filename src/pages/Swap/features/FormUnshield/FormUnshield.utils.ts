import { BigNumber } from 'bignumber.js';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE, PRV } from 'constants/token';
import { isAddress as isEtherAddress } from 'ethers/lib/utils';
import orderBy from 'lodash/orderBy';
import { ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import { getQueryPAppName } from 'pages/Swap/Swap.hooks';
import { formValueSelector, isSubmitting, isValid } from 'redux-form';
import { AppState } from 'state';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import { unshieldableTokens } from 'state/token';
import convert from 'utils/convert';
import format from 'utils/format';

import { GROUP_CURRENCY_TYPE_BY_PAPP_NAME, GROUP_SUPPORTED_NETWORK_BY_PAPPS } from './FormUnshield.constants';
import { FormTypes, IFormUnshieldState, ISwapExchangeData, ISwapFee, SwapExchange } from './FormUnshield.types';

const {
  encryptMessageOutCoin,
  BurningFantomRequestMeta,
  BurningPBSCRequestMeta,
  BurningPLGRequestMeta,
  BurningAvaxRequestMeta,
  BurningAuroraRequestMeta,
  BurningNearRequestMeta,
  BurningRequestMeta,
  getBurningAddress,
} = require('incognito-chain-web-js/build/web/wallet');
export interface IFee {
  networkFee: number;
  networkFeeToken: string;
  burnFee?: string;
  burnFeeToken?: string;
  feeAddress?: string;
  isUseTokenFee?: boolean;
  id?: number;
  estimatedBurnAmount: number;
  estimatedExpectedAmount: number;
  extraFee: number;
  useFast2xFee?: boolean;
  centralizedAddress?: string;
  feeAddressShardID?: number;
}

export interface IUnshieldData {
  formType: FormTypes;
  unshieldAddress: string;
  incAddress: string;

  sellToken: SelectedPrivacy;
  sellParentToken: any;
  sellTokenList: SelectedPrivacy[];
  sellCurrency: number;
  sellNetworkName: string;

  buyParentToken: any;
  buyToken: SelectedPrivacy;
  buyNetworkList: ITokenNetwork[] | undefined;
  buyTokenList: SelectedPrivacy[];
  buyCurrency: number;
  buyNetworkName: MAIN_NETWORK_NAME;

  isExternalAddress: boolean;
  disabledForm: boolean;

  userBalanceNoClip?: string;
  userBalance?: string;
  userBalanceFormatedText: string;
  userBuyBalanceFormatedText: string;

  minAmountText: string;
  maxAmountText: string;

  inputAmount: string;
  inputOriginalAmount: number;
  burnOriginalAmount: string;
  inputAddress: string;
  estReceiveAmount: string | number;
  expectedReceiveAmount: string | number;

  fee: IFee;

  isFetching: boolean;
  networkFeeText: string;
  enoughNetworkFee: boolean;
  burnFeeText: string;

  enoughPRVFee: boolean;

  // swap data
  exchangeSupports: any[];
  exchangeSelected: any;
  exchangeSelectedData: any;
  swapFee: any;
  tradePath: string;
  isUseTokenFee?: boolean;
  errorMsg: string | null;
  swapNetwork: MAIN_NETWORK_NAME;

  slippage: string;

  rate: string;

  minUnshield: number;
  minUnshieldText: string;

  isSubmitting: boolean;
  vaults: any;
}

const getTradePath = (exchange?: SwapExchange, routes?: any[], tokenList?: any): string => {
  if (!exchange || !routes) return '';
  let tradePathStr = '';
  const tradePathArrStr: any = [];
  for (let i = 0; i < routes.length; i++) {
    const tokenData = tokenList?.find(
      (token: any) =>
        token?.contractID?.toLowerCase() === routes[i]?.toLowerCase() ||
        token?.tokenID?.toLowerCase() === routes[i]?.toLowerCase()
    );
    if (tokenData) {
      tradePathArrStr.push(tokenData?.symbol);
    }
  }
  tradePathStr = tradePathArrStr?.join(' > ');
  return tradePathStr;
};

const checkSwapableToken = ({ sellToken, token }: { sellToken: SelectedPrivacy; token: SelectedPrivacy }) => {
  if (token.movedUnifiedToken) return false; // not supported moved unified token
  if (sellToken.poolPair || token.poolPair) return true; // swapable on PDEX

  // list supported network by sellToken
  const sellChildNetworks = sellToken.isUnified
    ? sellToken.listUnifiedToken.map((child) => child.networkName)
    : [sellToken.networkName];

  // list supported network by filtered token
  const tokenChildNetworks = token.isUnified
    ? token.listUnifiedToken.map((child) => child.networkName)
    : [token.networkName];
  return sellChildNetworks.some((networkName) => networkName && tokenChildNetworks.includes(networkName));
};

const filterTokensByPAppName = ({
  tokens,
  queryPAppName,
  ignoreFields = [],
  pairToken,
}: {
  tokens: SelectedPrivacy[];
  queryPAppName: any;
  ignoreFields?: string[];
  pairToken?: SelectedPrivacy;
}): SelectedPrivacy[] => {
  let tokensList = tokens;
  let supportedCurrencyType: any[] = [];
  if (queryPAppName.isValid) {
    const pAppName = queryPAppName.pAppName as any;
    supportedCurrencyType = (GROUP_CURRENCY_TYPE_BY_PAPP_NAME[pAppName] as any[]) || [];
    tokensList = tokensList.filter((token) => {
      // case PDEX supp
      if (queryPAppName.isPDex) {
        return token.poolPair && token.tokenID !== pairToken?.tokenID;
      }
      // PRV not supported for PApps now!
      // @ts-ignore
      if (token.isPRV || ignoreFields.some((field: string) => token[field])) return false;
      const mainTokenValid = supportedCurrencyType.includes(token.currencyType);
      const childCurrencyType = token.listUnifiedToken.map((childToken) => childToken.currencyType);
      let subTokenValid = false;
      if (childCurrencyType && childCurrencyType.length > 0) {
        subTokenValid = supportedCurrencyType.some((currencyType) => childCurrencyType.includes(currencyType));
      }
      return (mainTokenValid || subTokenValid) && token.tokenID !== pairToken?.tokenID;
    });
  }
  return tokensList;
};

const getUnshieldData = ({
  unshield,
  getDataByTokenID,
  getDepositTokenData,
  state,
}: {
  unshield: IFormUnshieldState;
  getDataByTokenID: (tokenID: string) => SelectedPrivacy;
  getDepositTokenData: (tokenID: string) => SelectedPrivacy;
  state: AppState;
}): IUnshieldData => {
  const {
    sellToken,
    buyToken,
    userFee,
    networkFee,
    isFetchingFee,
    networkFeeToken,
    isUseBurnFeeLevel1,
    exchangeSupports,
    vaults,
    exchangeSelected,
    errorMsg,
    swapNetwork,
  } = unshield;

  const {
    currency: sellCurrency,
    networkName: sellNetworkName,
    identify: sellIdentify,
    parentIdentify: sellParentIdentify,
  } = sellToken;
  const {
    currency: buyCurrency,
    networkName: buyNetworkName,
    identify: buyIdentify,
    parentIdentify: buyParentIdentify,
  } = buyToken;

  const formType: FormTypes =
    sellParentIdentify && buyParentIdentify && sellParentIdentify === buyParentIdentify
      ? FormTypes.UNSHIELD
      : FormTypes.SWAP;

  const formSelector = formValueSelector(FORM_CONFIGS.formName);
  const valid = isValid(FORM_CONFIGS.formName)(state);
  const submitting = isSubmitting(FORM_CONFIGS.formName)(state);

  const inputAmount: string = formSelector(state, FORM_CONFIGS.sellAmount);
  let inputAddress = formSelector(state, FORM_CONFIGS.toAddress);
  inputAddress = inputAddress?.trim();
  const inputSlippage: string = formSelector(state, FORM_CONFIGS.slippage) || '0';

  // get all tokens
  const unshieldAbleTokens = unshieldableTokens(state) || [];

  // sell token
  const _sellToken = getDataByTokenID(sellIdentify);

  // buy token
  const _buyToken = getDataByTokenID(buyIdentify);
  let _buyTokenList = [...unshieldAbleTokens];

  // getPAppName
  const queryPAppName = getQueryPAppName();
  let _sellTokenList = filterTokensByPAppName({ tokens: unshieldAbleTokens, queryPAppName, pairToken: _buyToken });
  _sellTokenList = orderBy(
    _sellTokenList.filter((token) => {
      return !(token.isPRV && token.movedUnifiedToken) && !token.isNearToken;
    }),
    ['isPRV', 'isUnified'],
    ['desc', 'desc']
  );

  if (formType === FormTypes.SWAP) {
    if (swapNetwork === MAIN_NETWORK_NAME.INCOGNITO) {
      _buyTokenList = _buyTokenList.filter((token: SelectedPrivacy) => {
        return checkSwapableToken({ sellToken: _sellToken, token });
      });
    } else {
      // Swap PApps
      _buyTokenList = _buyTokenList.filter((token: SelectedPrivacy) => {
        const _swapNetwork = token.networkName;
        // remove all unified tokens
        if (!_swapNetwork || token.hasChild) return false;

        // support filter tokens interswap
        if (buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO) {
          return token.networkName === swapNetwork || !!token.poolPair;
        }

        // case un-unified tokens
        return token.networkName === swapNetwork;
      });
    }
  } else {
    // case unshield Centralized + BTC just have 1 buyToken
    if (_sellToken.isBTC || _sellToken.isCentralized) {
      _buyTokenList = [Object.assign({}, _sellToken)];
    } else {
      _buyTokenList = _buyTokenList.filter((token: SelectedPrivacy) => {
        return token.networkName === buyNetworkName;
      });
    }
  }

  _buyTokenList = filterTokensByPAppName({
    tokens: _buyTokenList,
    queryPAppName,
    ignoreFields: queryPAppName?.isPDex ? [] : ['isCentralized', 'isNearToken'],
    pairToken: _sellToken,
  });

  // _buyTokenList = _buyTokenList.filter((token) => {
  //   const isNear = token.isNearToken;
  //   let isValid = true;
  //   // PRV not supported PApps
  //   if (queryPAppName.isValid) {
  //     isValid = !token.isPRV && !token.isCentralized;
  //   }
  //   return !isNear && isValid;
  // });

  let isUseTokenFee = false;
  let _sellParentToken, _buyParentToken, _buyNetworkList: any;
  let _buyNetworkName: MAIN_NETWORK_NAME = MAIN_NETWORK_NAME.INCOGNITO;

  if (sellParentIdentify) {
    _sellParentToken = getDataByTokenID(sellParentIdentify);
  }

  if (buyParentIdentify) {
    _buyParentToken = getDataByTokenID(buyParentIdentify);
  }

  _buyNetworkList = _sellToken?.supportedNetwork;
  // case unshield;
  if (formType === FormTypes.UNSHIELD) {
    _buyNetworkName = buyNetworkName;
    // _buyTokenList = getBuyTokenList(buyNetworkName, _buyTokenList, _sellToken, _buyNetworkList, pTokens);
  } else {
    _buyNetworkName = swapNetwork;
    if (_sellToken?.isUnified && vaults?.UnifiedTokenVaults) {
      const tokenVault = vaults?.UnifiedTokenVaults[_sellToken?.tokenID] || {};
      // Filter network enough vault
      _buyNetworkList = _buyNetworkList?.filter((_item: any) => {
        let isAccept = false;
        try {
          isAccept =
            tokenVault[_item?.identify?.split('-')[0]]['Amount'] -
              tokenVault[_item?.identify?.split('-')[0]]['LockedAmount'] >
            0;
        } catch (e) {
          console.log('CANT FILTER NETWORK LIST ERROR: ', e);
        }
        return isAccept;
      });
    }
  }

  // add incognito network
  if (!_buyNetworkList?.find((network: ITokenNetwork) => network?.networkName === MAIN_NETWORK_NAME.INCOGNITO)) {
    _buyNetworkList.unshift({
      parentIdentify: sellParentIdentify,
      identify: _sellParentToken?.identify,
      networkName: MAIN_NETWORK_NAME.INCOGNITO,
      currency: PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN,
    });
  }

  if (queryPAppName.isValid && queryPAppName.pAppName) {
    if (queryPAppName.isPDex) {
      _buyNetworkList = [
        {
          parentIdentify: sellParentIdentify,
          identify: _sellParentToken?.identify,
          networkName: MAIN_NETWORK_NAME.INCOGNITO,
          currency: PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN,
        },
      ];
    } else {
      const networkByPApps = GROUP_SUPPORTED_NETWORK_BY_PAPPS[queryPAppName.pAppName];
      _buyNetworkList = _buyNetworkList.filter(({ networkName }: { networkName: string }) => {
        return networkByPApps.includes(networkName);
      });
    }
  }

  const isExternalAddress =
    _buyToken.isCentralized || _buyToken.isBTC || _buyToken.isNearToken || _buyToken.isMainNEAR
      ? true
      : isEtherAddress(inputAddress);

  // amount validator
  const inputOriginalAmount =
    convert.toOriginalAmount({
      decimals: _sellToken.pDecimals,
      humanAmount: inputAmount || '0',
      round: true,
    }) || 0;

  let burnOriginalAmount: string = new BigNumber(inputOriginalAmount || 0).toString();
  if (formType === FormTypes.UNSHIELD && userFee && userFee?.estimatedBurnAmount) {
    burnOriginalAmount = userFee?.estimatedBurnAmount?.toString();
  }

  const userBalanceNoClip = _sellToken.formatAmountNoClip;
  const userBalance = _sellToken.formatAmount;
  const userBalanceFormatedText = `${_sellToken.formatAmount || 0} ${_sellToken.symbol}`;

  const userBuyBalanceFormatedText = `${_buyToken.formatAmount || 0} ${_buyToken.symbol}`;
  const incAccount = incognitoWalletAccountSelector(state);
  const nativeToken = getDataByTokenID(PRV.identify);
  const incAddress = incAccount ? incAccount.paymentAddress : '';

  // Handle network fee
  const enoughNetworkFee = new BigNumber(nativeToken.amount || 0).isGreaterThanOrEqualTo(networkFee);
  const networkFeeText = `${
    convert.toHumanAmountString({
      decimals: nativeToken.pDecimals,
      originalAmount: networkFee,
    }) || 0
  } ${nativeToken.symbol}`;

  let enoughPRVFee = true;

  // let maxAmountText = '';
  let maxAmountText = _sellToken.formatAmountNoClip || '0';
  let minAmountText = '';
  let combineFee: IFee = {
    networkFee,
    networkFeeToken: PRV.id,
    estimatedBurnAmount: 0,
    estimatedExpectedAmount: 0,
    extraFee: 0,
    feeAddressShardID: undefined,
  };
  let burnFeeTokenIdentify = '';
  let estReceiveAmount: any;
  let expectedReceiveAmount: any = '0';
  if (userFee) {
    isUseTokenFee = userFee?.isUseTokenFee || false;
    const { fee, id, feeAddress, estimatedBurnAmount, estimatedExpectedAmount, estimateFee, feeAddressShardID } =
      userFee;
    const burnFee = isUseBurnFeeLevel1 ? fee.level1 : fee.level2;
    burnFeeTokenIdentify = isUseTokenFee ? _sellToken.identify : PRV.identify;
    const burnFeeToken = isUseTokenFee ? _sellToken.tokenID : PRV.id;
    // if (_sellToken.identify === burnFeeTokenIdentify) {
    //   burnFee = new BigNumber(burnFee || 0).plus(estimateFee || 0).toString();
    // } else {
    //   _networkFee += estimateFee;
    // }
    combineFee = {
      ...combineFee,
      burnFee,
      burnFeeToken,
      centralizedAddress: userFee.centralizedAddress,

      feeAddress,
      isUseTokenFee,

      id,

      extraFee: estimateFee || 0,

      estimatedBurnAmount,
      estimatedExpectedAmount,
      useFast2xFee: !isUseBurnFeeLevel1,
      feeAddressShardID,
    };

    const minAmount: number = new BigNumber(_sellToken.identify === networkFeeToken ? 1 + networkFee : 1)
      .plus(_sellToken.identify === burnFeeTokenIdentify ? burnFee : 0)
      .toNumber();

    // If prv minus networkfee
    let maxAmount: number = new BigNumber(_sellToken.amount || 0)
      // .minus(isUseTokenFee ? 0 : networkFee)
      .minus(_sellToken.identify === burnFeeTokenIdentify ? burnFee : 0)
      .minus(estimateFee)
      .toNumber();

    if (maxAmount <= 0) {
      maxAmount = 0;
    }

    if (_sellToken.isBTC && formType === FormTypes.UNSHIELD) {
      maxAmount = new BigNumber(_sellToken.amount || 0).toNumber();
    }

    maxAmountText = format
      .formatAmount({
        originalAmount: maxAmount,
        decimals: _sellToken.pDecimals,
        clipAmount: false,
      })
      .toString();

    minAmountText = format.formatAmount({
      originalAmount: minAmount,
      decimals: _sellToken.pDecimals,
      clipAmount: false,
    });

    if (!isUseTokenFee) {
      enoughPRVFee = new BigNumber(nativeToken.amount || 0).isGreaterThanOrEqualTo(
        new BigNumber(combineFee.burnFee || 0).plus(networkFee)
      );
    }
    estReceiveAmount = userFee?.estimatedExpectedAmount ? userFee.estimatedExpectedAmount : inputAmount;
    if (_sellToken.isBTC && formType === FormTypes.UNSHIELD) {
      estReceiveAmount = format.formatAmount({
        originalAmount: new BigNumber(inputOriginalAmount || 0).minus(fee.level1 || 0).toNumber(),
        decimals: _sellToken.pDecimals,
        clipAmount: false,
      });
      if (new BigNumber(estReceiveAmount).lte(0)) {
        estReceiveAmount = 0;
      }
    }
    expectedReceiveAmount = userFee?.estimatedExpectedAmount ? userFee.estimatedExpectedAmount : inputAmount;
  }

  //  Swap data
  let exchangeSelectedData = null;
  let tradePath = '';
  let swapFee = null;
  if (formType === FormTypes.SWAP && exchangeSupports) {
    exchangeSelectedData = exchangeSupports?.find(
      (exchange: ISwapExchangeData) => exchange?.exchangeName === exchangeSelected
    );
    const swapFeeObj: ISwapFee | null = exchangeSelectedData?.fees[0] || null;
    isUseTokenFee = (swapFeeObj && swapFeeObj?.tokenId !== PRV.id) || false;

    if (!isUseTokenFee) {
      enoughPRVFee = new BigNumber(nativeToken.amount || 0).isGreaterThanOrEqualTo(
        new BigNumber(swapFeeObj?.amount || 0).plus(networkFee)
      );
    }

    estReceiveAmount = format.toFixed({
      number: exchangeSelectedData?.amountOut || 0,
      decimals: _sellToken.pDecimals,
    });

    expectedReceiveAmount = format.toFixed({
      number: new BigNumber(exchangeSelectedData?.expectedAmount || 0).toNumber(),
      decimals: _sellToken.pDecimals,
    });

    tradePath =
      typeof exchangeSelectedData?.routes === 'string'
        ? exchangeSelectedData?.routes
        : getTradePath(exchangeSelectedData?.appName, exchangeSelectedData?.routes, unshieldAbleTokens);

    let tradeFeeText = '';
    if (isUseTokenFee) {
      tradeFeeText = `${
        format.amountVer2({
          decimals: _sellToken.pDecimals,
          originalAmount: new BigNumber(swapFeeObj?.amount || 0).toNumber(),
        }) || 0
      } ${_sellToken.symbol}`;
    } else {
      tradeFeeText = `${
        format.amountVer2({
          decimals: PRV.pDecimals,
          originalAmount: new BigNumber(swapFeeObj?.amount || 0).toNumber(),
        }) || 0
      } PRV`;
    }

    swapFee = {
      ...swapFeeObj,
      tradeFeeText,
    };

    burnFeeTokenIdentify = isUseTokenFee ? _sellToken.identify : PRV.identify;

    const minAmount: number = new BigNumber(_sellToken.identify === networkFeeToken ? 1 + networkFee : 1)
      .plus(_sellToken.identify === burnFeeTokenIdentify ? swapFeeObj?.amount || 0 : 0)
      .toNumber();

    let maxAmount: number = new BigNumber(_sellToken.amount || 0)
      // .minus(isUseTokenFee ? 0 : networkFee)
      .minus(_sellToken.identify === burnFeeTokenIdentify ? swapFeeObj?.amount || 0 : 0)
      .toNumber();

    if (maxAmount <= 0) {
      maxAmount = 0;
    }

    maxAmountText = format
      .formatAmount({
        originalAmount: maxAmount,
        decimals: _sellToken.pDecimals,
        clipAmount: false,
      })
      .toString();

    minAmountText = format.formatAmount({
      originalAmount: minAmount,
      decimals: _sellToken.pDecimals,
      clipAmount: false,
    });
  }

  let disabledForm = false;

  if (
    formType === FormTypes.SWAP &&
    (!valid ||
      submitting ||
      new BigNumber(inputOriginalAmount).lte(0) ||
      !buyToken?.parentIdentify ||
      !buyToken?.identify ||
      errorMsg ||
      !exchangeSelected ||
      !exchangeSelectedData?.amountOutRaw ||
      !enoughPRVFee ||
      !enoughNetworkFee ||
      isFetchingFee)
  ) {
    disabledForm = true;
  }

  if (
    formType === FormTypes.UNSHIELD &&
    (!valid ||
      submitting ||
      !isExternalAddress ||
      new BigNumber(inputOriginalAmount).lte(0) ||
      !incAccount ||
      !buyToken?.parentIdentify ||
      !buyToken?.identify ||
      !networkFee ||
      isFetchingFee ||
      !enoughNetworkFee ||
      !enoughPRVFee ||
      errorMsg)
  ) {
    disabledForm = true;
  }

  const burnFeeToken = getDataByTokenID(burnFeeTokenIdentify);
  let burnFeeText = '';
  if (burnFeeToken.symbol) {
    burnFeeText = `${convert.toHumanAmountString({
      originalAmount: new BigNumber(combineFee.burnFee || 0).plus(combineFee.extraFee).toNumber(),
      decimals: burnFeeToken.pDecimals,
    })} ${burnFeeToken.symbol}`;
  }

  // console.log('LOGS UTILS', {
  //   sellParentID: sellParentIdentify,
  //   sellID: sellIdentify,
  //   buyParentID: buyParentIdentify,
  //   buyID: buyIdentify,
  //   swapNetwork,
  //   disabledForm,
  // });

  let _errorMsg = errorMsg;
  if (
    !_errorMsg &&
    !!exchangeSelectedData &&
    (!exchangeSelectedData?.amountOutRaw || !new BigNumber(exchangeSelectedData?.amountOutRaw || 0).toNumber()) &&
    !isFetchingFee
  ) {
    _errorMsg = 'Input amount is too small';
  }

  const minUnshield = userFee?.minUnshield || 0;
  const minUnshieldText = format.formatAmount({
    originalAmount: Number(minUnshield || 0),
    decimals: _sellToken.pDecimals,
    decimalDigits: true,
    clipAmount: false,
  });

  return {
    sellToken: _sellToken,
    sellParentToken: _sellParentToken,
    sellTokenList: _sellTokenList,
    sellCurrency,
    sellNetworkName,

    buyParentToken: _buyParentToken,
    buyToken: _buyToken,
    buyNetworkList: _buyNetworkList,
    buyTokenList: _buyTokenList,
    buyCurrency,
    buyNetworkName: _buyNetworkName,

    userBalanceNoClip,
    userBalance,
    userBalanceFormatedText,
    userBuyBalanceFormatedText,

    minAmountText,
    maxAmountText,

    isExternalAddress,
    unshieldAddress: inputAddress,
    incAddress,

    disabledForm,

    inputAmount,
    inputOriginalAmount,
    burnOriginalAmount,
    estReceiveAmount,
    expectedReceiveAmount,

    fee: combineFee,
    inputAddress,
    isFetching: unshield.isFetchingFee,
    enoughNetworkFee,
    networkFeeText,
    burnFeeText,

    enoughPRVFee,
    formType,

    // Swap data
    exchangeSupports,
    exchangeSelected,
    exchangeSelectedData,
    swapFee,
    tradePath,
    isUseTokenFee,
    errorMsg: _errorMsg,
    swapNetwork,

    slippage: inputSlippage,
    rate: exchangeSelectedData?.rate || '',
    minUnshield,
    minUnshieldText,

    isSubmitting: submitting,

    vaults,
  };
};

const getBurningMetaDataTypeForUnshield = (sellToken: SelectedPrivacy) => {
  if (sellToken?.isUnified) return 345;
  if (sellToken?.isBep20Token || sellToken.isMainBSC) return BurningPBSCRequestMeta;
  if (sellToken?.isPolygonErc20Token || sellToken.isMainMATIC) return BurningPLGRequestMeta;
  if (sellToken?.isFantomErc20Token || sellToken.isMainFTM) return BurningFantomRequestMeta;
  if (sellToken?.isAvaxErc20Token || sellToken.isMainAVAX) {
    return BurningAvaxRequestMeta;
  }
  if (sellToken?.isAuroraErc20Token || sellToken.isMainAURORA) {
    return BurningAuroraRequestMeta;
  }
  if (sellToken?.isNearToken || sellToken.isMainNEAR) {
    return BurningNearRequestMeta;
  }
  return BurningRequestMeta;
};

const getTokenPayments = async ({
  data,
  burnAmount,
  isEncryptMessageToken = true,
}: {
  data: any[];
  burnAmount?: number;
  isEncryptMessageToken?: boolean;
}) => {
  const burningAddress = await getBurningAddress();

  let tokenPayments = data.map((payment) => ({
    PaymentAddress: payment?.paymentAddress,
    Amount: new BigNumber(payment?.amount).toString(),
    Message: '',
  }));

  if (burnAmount) {
    tokenPayments.push({
      PaymentAddress: burningAddress,
      Amount: new BigNumber(burnAmount).toString(),
      Message: '',
    });
  }

  const isEncodeOnly = !isEncryptMessageToken;
  tokenPayments = await encryptMessageOutCoin(tokenPayments, isEncodeOnly);
  return tokenPayments;
};

const getPrvPayments = async (data: any[], isEncryptMessage = true) => {
  let prvPayments = data.map((payment) => ({
    PaymentAddress: payment?.paymentAddress,
    Amount: new BigNumber(payment?.amount || 0).toString(),
    Message: '',
  }));

  const isEncodeOnly = !isEncryptMessage;
  prvPayments = await encryptMessageOutCoin(prvPayments, isEncodeOnly);
  return prvPayments;
};

const getINCTokenWithNetworkName = ({
  parentToken,
  token,
  networkName,
}: {
  parentToken: SelectedPrivacy;
  token: SelectedPrivacy;
  networkName: MAIN_NETWORK_NAME;
}) => {
  let childToken = (parentToken.listUnifiedToken || []).find(
    (token: SelectedPrivacy) => token.networkName === networkName
  );
  if (!childToken && token.networkName === networkName) {
    childToken = token;
  }
  return childToken;
};

export {
  getBurningMetaDataTypeForUnshield,
  getINCTokenWithNetworkName,
  getPrvPayments,
  getTokenPayments,
  getUnshieldData,
};
