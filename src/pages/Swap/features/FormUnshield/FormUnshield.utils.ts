import { BigNumber } from 'bignumber.js';
import bn from 'bn.js';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE, PRV } from 'constants/token';
import { isAddress as isEtherAddress } from 'ethers/lib/utils';
import { ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import { formValueSelector, isSubmitting, isValid } from 'redux-form';
import { AppState } from 'state';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import { unshieldableTokens } from 'state/token';
import convert from 'utils/convert';
import format from 'utils/format';

import { FormTypes, IFormUnshieldState, ISwapExchangeData, ISwapFee, SwapExchange } from './FormUnshield.types';
const {
  encryptMessageOutCoin,
  BurningFantomRequestMeta,
  BurningPBSCRequestMeta,
  BurningPLGRequestMeta,
  BurningRequestMeta,
  getBurningAddress,
} = require('incognito-chain-web-js/build/wallet');
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
}

const getTradePath = (exchange?: SwapExchange, routes?: any[], tokenList?: any): string => {
  if (!exchange || !routes) return '';
  let tradePathStr = '';
  const tradePathArrStr: any = [];
  for (let i = 0; i < routes.length; i++) {
    const tokenData = tokenList?.find((token: any) => token?.contractID?.toLowerCase() === routes[i]?.toLowerCase());
    if (tokenData) {
      tradePathArrStr.push(tokenData?.symbol);
    }
  }
  tradePathStr = tradePathArrStr?.join(' > ');
  return tradePathStr;
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
  const inputAddress = formSelector(state, FORM_CONFIGS.toAddress);
  const inputSlippage: string = formSelector(state, FORM_CONFIGS.slippage) || '0';

  // sell token
  const _sellToken = getDataByTokenID(sellIdentify);
  const unshieldAbleTokens = unshieldableTokens(state) || [];
  const _sellTokenList = unshieldAbleTokens.filter((token) => !token.movedUnifiedToken);

  // buy token
  const _buyToken = getDataByTokenID(buyIdentify);
  let _buyTokenList = unshieldableTokens(state);

  if (formType === FormTypes.SWAP) {
    if (swapNetwork !== MAIN_NETWORK_NAME.INCOGNITO) {
      _buyTokenList = _buyTokenList.filter((token: any) => {
        if (swapNetwork === MAIN_NETWORK_NAME.POLYGON) {
          return (
            token?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN ||
            token?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.MATIC ||
            token?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20
          );
        }

        if (swapNetwork === MAIN_NETWORK_NAME.ETHEREUM) {
          return (
            token?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN ||
            token?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.ERC20 ||
            token?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.ETH
          );
        }

        if (swapNetwork === MAIN_NETWORK_NAME.BSC) {
          return (
            token?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN ||
            token?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB ||
            token?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20
          );
        }

        if (swapNetwork === MAIN_NETWORK_NAME.FANTOM) {
          return (
            token?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN ||
            token?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.FTM ||
            token?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20
          );
        }
      });
    } else {
      _buyTokenList = _buyTokenList.filter((token: any) => !token.movedUnifiedToken);
    }
  }

  let isUseTokenFee = false;
  let _sellParentToken, _buyParentToken, _buyNetworkList: any;
  let _buyNetworkName: MAIN_NETWORK_NAME = MAIN_NETWORK_NAME.INCOGNITO;

  if (sellParentIdentify) {
    _sellParentToken = getDataByTokenID(sellParentIdentify);
  }

  if (buyParentIdentify) {
    _buyParentToken = getDataByTokenID(buyParentIdentify);
  }

  // case unshield;
  if (formType === FormTypes.UNSHIELD) {
    _buyNetworkName = buyNetworkName;
    _buyNetworkList = _buyParentToken?.supportedNetwork;
    _buyTokenList = getBuyTokenList(buyNetworkName, _buyTokenList, _sellToken, _buyNetworkList);
  } else {
    _buyNetworkName = swapNetwork;
    _buyNetworkList = _sellParentToken?.supportedNetwork;
    if (_sellParentToken?.isUnified && vaults?.UnifiedTokenVaults) {
      const tokenVault = vaults?.UnifiedTokenVaults[_sellParentToken?.tokenID] || {};
      // Filter network enough vault
      _buyNetworkList = _buyNetworkList?.filter((_item: any) => {
        let isAccept = false;
        try {
          isAccept =
            tokenVault[_item?.identify?.split('-')[0]]['Amount'] -
              tokenVault[_item?.identify?.split('-')[0]]['LockedAmount'] >
            0;
        } catch (e) {
          console.log('CANT FILTER NETWORK LIST');
        }
        return isAccept;
      });
    }

    _buyTokenList = getBuyTokenList(swapNetwork, _buyTokenList, _sellToken, _buyNetworkList);
    // add incognito network
    if (!_buyNetworkList?.find((network: ITokenNetwork) => network?.networkName === MAIN_NETWORK_NAME.INCOGNITO)) {
      _buyNetworkList.unshift({
        parentIdentify: sellParentIdentify,
        identify: _sellParentToken?.identify,
        networkName: MAIN_NETWORK_NAME.INCOGNITO,
        currency: PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN,
      });
    }
  }

  const isExternalAddress = isEtherAddress(inputAddress);

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
  };
  let burnFeeTokenIdentify = '';
  let estReceiveAmount: any;
  let expectedReceiveAmount: any = '0';
  if (userFee) {
    isUseTokenFee = userFee?.isUseTokenFee || false;
    const { fee, id, feeAddress, estimatedBurnAmount, estimatedExpectedAmount, estimateFee } = userFee;
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

      feeAddress,
      isUseTokenFee,

      id,

      extraFee: estimateFee || 0,

      estimatedBurnAmount,
      estimatedExpectedAmount,
      useFast2xFee: !isUseBurnFeeLevel1,
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

    maxAmountText = convert
      .toHumanAmount({
        originalAmount: maxAmount,
        decimals: _sellToken.pDecimals,
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

    tradePath = getTradePath(exchangeSelectedData?.appName, exchangeSelectedData?.routes, unshieldAbleTokens);

    let tradeFeeText = '';
    if (isUseTokenFee) {
      tradeFeeText = `${
        convert.toHumanAmountString({
          decimals: _sellToken.pDecimals,
          originalAmount: swapFeeObj?.amount,
        }) || 0
      } ${_sellToken.symbol}`;
    } else {
      tradeFeeText = `${
        convert.toHumanAmountString({
          decimals: PRV.pDecimals,
          originalAmount: swapFeeObj?.amount,
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

    maxAmountText = convert
      .toHumanAmount({
        originalAmount: maxAmount,
        decimals: _sellToken.pDecimals,
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
      !enoughPRVFee)
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
    errorMsg,
    swapNetwork,

    slippage: inputSlippage,
    rate: exchangeSelectedData?.rate || '',
  };
};

const getBuyTokenList = (
  // Selected swap network
  selectedNetwork: MAIN_NETWORK_NAME,
  tokens: any,
  sellToken: any,
  supportedNetwork: any
) => {
  const buyTokenList: any = [];
  supportedNetwork = supportedNetwork?.filter(
    (network: ITokenNetwork) => network?.networkName !== MAIN_NETWORK_NAME.INCOGNITO
  );
  if (sellToken?.isUnified && selectedNetwork === MAIN_NETWORK_NAME.INCOGNITO) {
    for (let i = 0; i < tokens?.length; i++) {
      let tokenObj: any = null;
      for (let j = 0; j < supportedNetwork?.length; j++) {
        if (tokens[i].isUnified && tokens[i].supportedNetwork) {
          for (let k = 0; k < tokens[i].supportedNetwork.length; k++) {
            if (tokens[i].supportedNetwork[k].networkName === supportedNetwork[j].networkName) {
              tokenObj = tokens[i];
            }
          }
        } else {
          if (tokens[i].networkName === supportedNetwork[j].networkName) {
            tokenObj = tokens[i];
          }
        }
      }
      if (tokenObj != null) {
        buyTokenList.push(tokenObj);
      }
    }
  }

  if (sellToken?.isUnified && selectedNetwork !== MAIN_NETWORK_NAME.INCOGNITO) {
    for (let i = 0; i < tokens?.length; i++) {
      let tokenObj: any = null;
      if (tokens[i].isUnified) {
        for (let j = 0; j < tokens[i].supportedNetwork.length; j++) {
          if (tokens[i].supportedNetwork[j].networkName === selectedNetwork) {
            tokenObj = tokens[i];
          }
        }
      } else {
        if (tokens[i].networkName === selectedNetwork) {
          tokenObj = tokens[i];
        }
      }

      if (tokenObj != null) {
        buyTokenList.push(tokenObj);
      }
    }
  }

  if (!sellToken?.isUnified && selectedNetwork === MAIN_NETWORK_NAME.INCOGNITO) {
    for (let i = 0; i < tokens?.length; i++) {
      for (let j = 0; j < supportedNetwork?.length; j++) {
        if (tokens[i].isUnified) {
          for (let k = 0; k < tokens[i].supportedNetwork.length; k++) {
            if (tokens[i].supportedNetwork[k].networkName === supportedNetwork[j].networkName) {
              buyTokenList.push(tokens[i]);
            }
          }
        } else {
          for (let k = 0; k < tokens[i].supportedNetwork.length; k++) {
            if (tokens[i].supportedNetwork[k].networkName === supportedNetwork[j].networkName) {
              buyTokenList.push(tokens[i]);
            }
          }
        }
      }
    }
  }

  if (!sellToken?.isUnified && selectedNetwork !== MAIN_NETWORK_NAME.INCOGNITO) {
    for (let i = 0; i < tokens?.length; i++) {
      if (tokens[i].isUnified) {
        for (let j = 0; j < tokens[i].supportedNetwork.length; j++) {
          if (tokens[i].supportedNetwork[j].networkName === selectedNetwork) {
            buyTokenList.push(tokens[i]);
          }
        }
      } else {
        if (tokens[i].networkName === selectedNetwork) {
          buyTokenList.push(tokens[i]);
        }
      }
    }
  }
  return buyTokenList;
};

const getExchangeName = (exchange: SwapExchange) => {
  if (exchange === SwapExchange.PANCAKE_SWAP) {
    return 'PancakeSwap';
  }
  if (exchange === SwapExchange.UNISWAP) {
    return 'Uniswap';
  }
  if (exchange === SwapExchange.CURVE) {
    return 'Curve';
  }
  if (exchange === SwapExchange.SPOOKY) {
    return 'Spooky';
  }
};

// Parse fee data from api estimate swap fee
const parseFeeDataModelResponse = (fees: any[]) => {
  const data: ISwapFee[] = [];
  if (!fees?.length) return [];
  for (let i = 0; i < fees?.length; i++) {
    data.push({
      amount: fees[i]?.amount || 0,
      tokenId: fees[i]?.tokenid || '',
      amountInBuyToken: fees[i]?.amountInBuyToken || '0',
    });
  }
  return data;
};

// Parse data from api estimate swap fee
const parseExchangeDataModelResponse = (
  // Data response from api estimate swap fee
  data: any,
  // Swap network name
  networkName: string,
  // Swap networkID
  networkID: number,
  // Child buy tokenId
  incTokenID?: string
) => {
  const exchangeData: ISwapExchangeData = {
    amountIn: parseFloat(data?.AmountIn || 0),
    amountInRaw: parseFloat(data?.AmountInRaw || 0),
    amountOut: parseFloat(data?.AmountOut || 0),
    amountOutRaw: parseFloat(data?.AmountOutRaw || 0),
    appName: data?.AppName,
    exchangeName: `${getExchangeName(data?.AppName)} (${networkName})`,
    fees: parseFeeDataModelResponse(data?.Fee || []) || [],
    routes: data?.Paths || [],
    incTokenID: incTokenID || '',
    feeAddress: data?.FeeAddress || '',
    callContract: data?.CallContract,
    callData: data?.Calldata,
    feeAddressShardID: data.FeeAddressShardID,
    networkID,
    expectedAmount: data?.AmountOutPreSlippage || '0',
    rate: data?.Rate || '1',
  };
  return exchangeData;
};

const getBurningMetaDataTypeForUnshield = (sellToken: SelectedPrivacy) => {
  if (sellToken?.isUnified) return 345;
  if (sellToken?.isBep20Token) return BurningPBSCRequestMeta;
  if (sellToken?.isPolygonErc20Token) return BurningPLGRequestMeta;
  if (sellToken?.isFantomErc20Token) return BurningFantomRequestMeta;

  return BurningRequestMeta;
};

const getTokenPayments = async (data: any[], burnAmount: any, isEncryptMessageToken = true) => {
  const burningAddress = await getBurningAddress();

  let tokenPayments = data.map((payment) => ({
    PaymentAddress: payment?.paymentAddress,
    Amount: new bn(payment?.amount).toString(),
    Message: '',
  }));

  tokenPayments.push({
    PaymentAddress: burningAddress,
    Amount: new bn(burnAmount).toString(),
    Message: '',
  });

  const isEncodeOnly = !isEncryptMessageToken;
  tokenPayments = await encryptMessageOutCoin(tokenPayments, isEncodeOnly);
  return tokenPayments;
};

const getPrvPayments = async (data: any[], isEncryptMessage = true) => {
  let prvPayments = data.map((payment) => ({
    PaymentAddress: payment?.paymentAddress,
    Amount: new bn(payment?.amount || 0).toString(),
    Message: '',
  }));

  const isEncodeOnly = !isEncryptMessage;
  prvPayments = await encryptMessageOutCoin(prvPayments, isEncodeOnly);
  return prvPayments;
};

export {
  getBurningMetaDataTypeForUnshield,
  getExchangeName,
  getPrvPayments,
  getTokenPayments,
  getUnshieldData,
  parseExchangeDataModelResponse,
};
