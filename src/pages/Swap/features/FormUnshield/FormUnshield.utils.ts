import { BigNumber } from 'bignumber.js';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE, PRV } from 'constants/token';
import { isAddress as isEtherAddress } from 'ethers/lib/utils';
import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import { formValueSelector, isSubmitting, isValid } from 'redux-form';
import { AppState } from 'state';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import { unshieldableTokens } from 'state/token';
import convert from 'utils/convert';
import format from 'utils/format';

import { FormTypes, IFormUnshieldState, ISwapExchangeData, ISwapFee, SwapExchange } from './FormUnshield.types';

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
}

export interface IUnshieldData {
  formType: FormTypes;
  unshieldAddress: string;
  incAddress: string;

  sellToken: SelectedPrivacy;
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

  minAmountText: string;
  maxAmountText: string;

  inputAmount: string;
  inputOriginalAmount: number;
  burnOriginalAmount: string;
  inputAddress: string;
  estReceiveAmount: string | number;

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
  tradePaths: string[];
  estimateTradeErrorMsg: string | null;
  swapNetwork: MAIN_NETWORK_NAME;
}

const getTradePaths = (exchange?: SwapExchange, routes?: any[], tokenList?: any): string[] => {
  if (!exchange || !routes) return [];
  let tradePathArrStr: any = [];
  if (exchange === SwapExchange.UNISWAP) {
    tradePathArrStr = routes?.map((childRoutes: any[]) => {
      return childRoutes
        ?.map((tokenRoute: any, index: number, arr) => {
          if (index === arr.length - 1) {
            return `${tokenRoute?.tokenIn?.symbol} > ${tokenRoute?.tokenOut?.symbol}`;
          } else {
            return `${tokenRoute?.tokenIn?.symbol} >`;
          }
        })
        .filter((symbol) => !!symbol)
        .join('');
    });
  }

  if (exchange === SwapExchange.PANCAKE_SWAP) {
    routes?.map((contractID: string) =>
      tokenList?.map((token: PToken) => {
        if (token?.contractID === contractID) {
          tradePathArrStr.push(token?.symbol);
        }
      })
    );
    tradePathArrStr = [tradePathArrStr?.join(' > ')];
  }
  return tradePathArrStr;
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
    estimateTradeErrorMsg,
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

  // sell token
  const _sellToken = getDataByTokenID(sellIdentify);
  const _sellTokenList = unshieldableTokens(state);

  // buy token
  const _buyToken = getDataByTokenID(buyIdentify);
  let _buyTokenList = unshieldableTokens(state);

  if (formType === FormTypes.SWAP && swapNetwork !== MAIN_NETWORK_NAME.INCOGNITO) {
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
  }

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
  }

  // case swap
  if (formType === FormTypes.SWAP) {
    _buyNetworkName = swapNetwork;
    _buyNetworkList = _sellParentToken?.supportedNetwork;
    if (_sellParentToken?.isUnified && vaults) {
      const tokenVault = vaults?.UnifiedTokenVaults[_sellParentToken?.tokenID] || {};
      // Filter network enough vault
      _buyNetworkList = _buyNetworkList?.filter(
        (_item: any) =>
          tokenVault[_item?.identify?.split('-')[0]]['Amount'] -
            tokenVault[_item?.identify?.split('-')[0]]['LockedAmount'] >
          0
      );
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
  }

  const isExternalAddress = isEtherAddress(inputAddress);

  // amount validator
  const inputOriginalAmount =
    convert.toOriginalAmount({
      decimals: _sellToken.pDecimals,
      humanAmount: inputAmount || '0',
      round: true,
    }) || 0;

  const burnOriginalAmount =
    userFee && userFee.estimatedBurnAmount
      ? userFee.estimatedBurnAmount
      : new BigNumber(inputOriginalAmount || 0).toString();

  const userBalanceNoClip = _sellToken.formatAmountNoClip;
  const userBalance = _sellToken.formatAmount;
  const userBalanceFormatedText = `${_sellToken.formatAmount || 0} ${_sellToken.symbol}`;

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

  let maxAmountText = '';
  let minAmountText = '';
  let combineFee: IFee = {
    networkFee,
    networkFeeToken: PRV.id,
    estimatedBurnAmount: 0,
    estimatedExpectedAmount: 0,
    extraFee: 0,
  };

  let burnFeeTokenIdentify = '';
  if (userFee) {
    const { fee, isUseTokenFee, id, feeAddress, estimatedBurnAmount, estimatedExpectedAmount, estimateFee } = userFee;
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
    };

    const minAmount: number = new BigNumber(_sellToken.identify === networkFeeToken ? 1 + networkFee : 1)
      .plus(_sellToken.identify === burnFeeTokenIdentify ? burnFee : 0)
      .toNumber();

    let maxAmount: number = new BigNumber(_sellToken.amount || 0)
      .minus(isUseTokenFee ? 0 : networkFee)
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
  }

  let enoughPRVFee = true;
  if (!userFee?.isUseTokenFee) {
    enoughPRVFee = new BigNumber(nativeToken.amount || 0).isGreaterThanOrEqualTo(
      new BigNumber(combineFee.burnFee || 0).plus(networkFee)
    );
  }

  const disabledForm =
    !valid ||
    submitting ||
    !isExternalAddress ||
    new BigNumber(inputOriginalAmount).lte(0) ||
    !incAccount ||
    !buyToken?.parentIdentify ||
    !buyToken?.identify ||
    !networkFee ||
    isFetchingFee ||
    !enoughNetworkFee ||
    !enoughPRVFee;

  const burnFeeToken = getDataByTokenID(burnFeeTokenIdentify);
  let burnFeeText = '';
  if (burnFeeToken.symbol) {
    burnFeeText = `${convert.toHumanAmountString({
      originalAmount: new BigNumber(combineFee.burnFee || 0).plus(combineFee.extraFee).toNumber(),
      decimals: burnFeeToken.pDecimals,
    })} ${burnFeeToken.symbol}`;
  }

  const exchangeSelectedData = exchangeSupports?.find(
    (exchange: ISwapExchangeData) => exchange?.exchangeName === exchangeSelected
  );
  const swapFeeObj: ISwapFee | null = exchangeSelectedData?.fees[0] || null;

  let tradeFeeText: string;
  if (swapFeeObj?.feeAddress !== PRV.id) {
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
    } ${_sellToken.symbol}`;
  }

  const swapFee = {
    ...swapFeeObj,
    tradeFeeText,
  };

  const tradePaths: string[] = getTradePaths(
    exchangeSelectedData?.appName,
    exchangeSelectedData?.routes,
    _sellTokenList
  );

  let estReceiveAmount;
  if (formType === FormTypes.UNSHIELD) {
    estReceiveAmount = userFee?.estimatedExpectedAmount ? userFee.estimatedExpectedAmount : inputAmount;
  } else {
    estReceiveAmount = exchangeSelectedData?.amountOut || 0;
  }

  return {
    sellToken: _sellToken,
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

    minAmountText,
    maxAmountText,

    isExternalAddress,
    unshieldAddress: inputAddress,
    incAddress,

    disabledForm,

    inputAmount,
    inputOriginalAmount,
    burnOriginalAmount: burnOriginalAmount.toString(),
    estReceiveAmount,

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
    tradePaths,
    estimateTradeErrorMsg,
    swapNetwork,
  };
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
};

const parseExchangeDataModelResponse = (data: any, networkName: string) => {
  const exchangeData: ISwapExchangeData = {
    amountIn: parseFloat(data?.AmountIn || 0),
    amountInRaw: parseFloat(data?.AmountInRaw || 0),
    amountOut: parseFloat(data?.AmountOut || 0),
    amountOutRaw: parseFloat(data?.AmountOutRaw || 0),
    appName: data?.AppName,
    exchangeName: `${getExchangeName(data?.AppName)}(${networkName})`,
    fees: data?.Fee || [],
    routes: data?.Route || [],
  };
  return exchangeData;
};

export { getExchangeName, getUnshieldData, parseExchangeDataModelResponse };
