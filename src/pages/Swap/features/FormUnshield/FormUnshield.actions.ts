import { BigNumber } from 'bignumber.js';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import { rpcClient } from 'services';
import { AppDispatch, AppState } from 'state';
import { getPrivacyByTokenIdentifySelectors } from 'state/token';
import convert from 'utils/convert';

import { unshieldDataSelector } from './FormUnshield.selectors';
import {
  FormTypes,
  FormUnshieldActionType,
  ISwapExchangeData,
  NetworkTypePayload,
  UnshieldFetchingUserFeePayLoad,
  UnshieldResetUserFeeAction,
  UnshieldSetFetchingUserFeeAction,
  UnshieldSetTokenAction,
  UnshieldSetTokenPayLoad,
  UnshieldSetUserFeeAction,
  UnshieldSetUserFeePayLoad,
} from './FormUnshield.types';
import { parseExchangeDataModelResponse } from './FormUnshield.utils';

export const actionSetToken = (payload: UnshieldSetTokenPayLoad): UnshieldSetTokenAction => ({
  type: FormUnshieldActionType.SET_TOKEN,
  payload,
});

const actionSetUserFee = (payload: UnshieldSetUserFeePayLoad): UnshieldSetUserFeeAction => ({
  type: FormUnshieldActionType.SET_USER_FEE,
  payload,
});

const actionSetFetchingFee = (payload: UnshieldFetchingUserFeePayLoad): UnshieldSetFetchingUserFeeAction => ({
  type: FormUnshieldActionType.FETCHING_FEE,
  payload,
});

const actionResetFee = (): UnshieldResetUserFeeAction => ({
  type: FormUnshieldActionType.RESET_FEE,
});

export const actionSetSwapExchangeSupports = (payload: any) => ({
  type: FormUnshieldActionType.SET_SWAP_EXCHANGE_SUPPORT,
  payload,
});

export const actionSetVaults = (payload: any) => ({
  type: FormUnshieldActionType.SET_VAULTS,
  payload,
});

export const actionSetExchangeSelected = (payload: string | null) => ({
  type: FormUnshieldActionType.SET_SWAP_EXCHANGE_SELECTED,
  payload,
});

export const actionSetSwapEstimateTradeErrorMsg = (payload: string) => ({
  type: FormUnshieldActionType.SET_SWAP_ESTIMATE_TRADE_ERROR_MSG,
  payload,
});

export const actionSetSwapNetwork = (payload: MAIN_NETWORK_NAME) => ({
  type: FormUnshieldActionType.SET_SWAP_NETWORK,
  payload,
});

export const actionChangeSellToken =
  ({ token }: { token: PToken }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      const { buyToken } = unshieldDataSelector(getState());
      const parentToken = getPrivacyByTokenIdentifySelectors(getState())(token.parentTokenID);
      if (!token.chainID || !token.networkName || !parentToken.currencyType) return;
      const sellToken: ITokenNetwork = {
        parentIdentify: token.parentTokenID,
        identify: token.identify,
        chainID: token.chainID,
        currency: token.currencyType,
        networkName: token.networkName,
      };

      let _buyToken = parentToken;
      if (parentToken.hasChild) {
        _buyToken = parentToken.listUnifiedToken[0];
      }
      const buyTokenObj: ITokenNetwork = {
        parentIdentify: token.parentTokenID,
        identify: _buyToken.identify,
        chainID: _buyToken.chainID,
        currency: _buyToken.currencyType,
        networkName: _buyToken.networkName || MAIN_NETWORK_NAME.INCOGNITO,
      };

      if (parentToken.parentTokenID === buyToken.parentTokenID) {
        dispatch(
          actionSetToken({
            sellToken,
            buyToken: buyTokenObj,
          })
        );
      } else {
        dispatch(
          actionSetToken({
            sellToken,
          })
        );
      }
    } catch (error) {
      console.log('ACTION FILTER TOKEN ERROR: ', error);
    }
  };

export const actionChangeBuyToken =
  ({ token }: { token: PToken }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      const { sellToken } = unshieldDataSelector(getState());
      const parentToken = getPrivacyByTokenIdentifySelectors(getState())(token.parentTokenID);
      if (!token.chainID || !token.networkName || !parentToken.currencyType) return;

      let _buyToken = parentToken;
      if (parentToken.hasChild) {
        _buyToken = parentToken.listUnifiedToken[0];
      }
      const buyTokenObj: ITokenNetwork = {
        parentIdentify: _buyToken.parentTokenID,
        identify: _buyToken.identify,
        chainID: _buyToken.chainID,
        currency: _buyToken.currencyType,
        networkName: _buyToken.networkName || MAIN_NETWORK_NAME.INCOGNITO,
      };

      dispatch(
        actionSetToken({
          buyToken: buyTokenObj,
        })
      );
    } catch (error) {
      console.log('ACTION FILTER TOKEN ERROR: ', error);
    }
  };

export const actionChangeSellNetwork =
  ({ network }: { network: ITokenNetwork }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      dispatch(
        actionSetToken({
          sellToken: {
            ...network,
          },
        })
      );
    } catch (error) {
      console.log('ACTION CHANGE BUY NETWORK ERROR: ', error);
    }
  };

export const actionChangeBuyNetwork =
  ({ network }: { network: ITokenNetwork }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    const { formType } = unshieldDataSelector(getState());
    try {
      if (formType === FormTypes.UNSHIELD) {
        dispatch(
          actionSetToken({
            buyToken: {
              ...network,
            },
          })
        );
      } else {
        dispatch(actionSetSwapNetwork(network?.networkName));
      }
    } catch (error) {
      console.log('ACTION CHANGE BUY NETWORK ERROR: ', error);
    }
  };

export const actionEstimateFee = () => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    const { inputAmount, inputOriginalAmount, buyToken, incAddress, unshieldAddress, sellToken } = unshieldDataSelector(
      getState()
    );
    if (!incAddress || !unshieldAddress || !inputOriginalAmount) return;
    dispatch(actionSetFetchingFee({ isFetchingFee: true }));
    let network = '';
    if (buyToken.isErc20Token || buyToken.isMainETH) {
      network = 'eth';
    } else if (buyToken.isPolygonErc20Token || buyToken.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.MATIC) {
      network = 'plg';
    } else if (buyToken.isFantomErc20Token || buyToken.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.FTM) {
      network = 'ftm';
    } else if (buyToken.isBep20Token || buyToken.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB) {
      network = 'bsc';
    }

    const incognitoAmount = new BigNumber(
      inputOriginalAmount ||
        convert.toOriginalAmount({ humanAmount: '1', round: false, decimals: buyToken.pDecimals }).toString()
    ).toString();

    const payload = {
      network,
      incognitoAmount,
      paymentAddress: unshieldAddress,
      privacyTokenAddress: buyToken.tokenID,
      requestedAmount: inputAmount || '1',
      walletAddress: incAddress,
      unifiedTokenID: sellToken.isUnified ? sellToken.tokenID : '',
    };
    const data = await rpcClient.estimateFee(payload);
    dispatch(actionSetUserFee({ fee: data }));
  } catch (error) {
    console.log('ACTION FILTER TOKEN ERROR: ', error);
  } finally {
    setTimeout(() => {
      dispatch(actionSetFetchingFee({ isFetchingFee: false }));
    }, 200);
  }
};

export const actionEstimateSwapFee = () => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    const { inputAmount, buyParentToken, buyNetworkName, incAddress, unshieldAddress, sellToken } =
      unshieldDataSelector(getState());
    if (
      !inputAmount ||
      !parseFloat(inputAmount) ||
      !sellToken?.tokenID ||
      !buyParentToken?.tokenID ||
      !incAddress ||
      !unshieldAddress ||
      !buyNetworkName
    ) {
      return;
    }
    dispatch(actionSetSwapEstimateTradeErrorMsg(''));
    dispatch(actionSetFetchingFee({ isFetchingFee: true }));
    let network: NetworkTypePayload = NetworkTypePayload.INCOGNITO;
    if (buyNetworkName === MAIN_NETWORK_NAME.ETHEREUM) {
      network = NetworkTypePayload.ETHEREUM;
    } else if (buyNetworkName === MAIN_NETWORK_NAME.BSC) {
      network = NetworkTypePayload.BINANCE_SMART_CHAIN;
    } else if (buyNetworkName === MAIN_NETWORK_NAME.POLYGON) {
      network = NetworkTypePayload.POLYGON;
    } else if (buyNetworkName === MAIN_NETWORK_NAME.FANTOM) {
      network = NetworkTypePayload.FANTOM;
    }

    const payload = {
      network,
      amount: inputAmount,
      fromToken: sellToken.tokenID,
      toToken: buyParentToken.tokenID,
    };

    // Call api estimate swap fee
    const data = await rpcClient.estimateSwapFee(payload);
    if (!data) throw new Error('Can not estimate trade');

    let ethExchanges: ISwapExchangeData[] = [];
    let ftmExchanges: ISwapExchangeData[] = [];
    let plgExchanges: ISwapExchangeData[] = [];
    let bscExchanges: ISwapExchangeData[] = [];
    if (data?.hasOwnProperty(NetworkTypePayload.BINANCE_SMART_CHAIN)) {
      const childToken = sellToken?.listUnifiedToken?.find((token: any) => token?.networkID === 2);
      const exchanges = data[NetworkTypePayload.BINANCE_SMART_CHAIN];
      if (Array.isArray(exchanges)) {
        bscExchanges = exchanges.map((exchange: any) =>
          parseExchangeDataModelResponse(exchange, 'BSC', 2, childToken?.tokenID)
        );
      }
    }

    if (data?.hasOwnProperty(NetworkTypePayload.ETHEREUM)) {
      const childToken = sellToken?.listUnifiedToken?.find((token: any) => token?.networkID === 1);
      const exchanges = data[NetworkTypePayload.ETHEREUM];
      if (Array.isArray(exchanges)) {
        ethExchanges = exchanges.map((exchange: any) =>
          parseExchangeDataModelResponse(exchange, 'ETH', 1, childToken?.tokenID)
        );
      }
    }

    if (data?.hasOwnProperty(NetworkTypePayload.POLYGON)) {
      const childToken = sellToken?.listUnifiedToken?.find((token: any) => token?.networkID === 3);
      const exchanges = data[NetworkTypePayload.POLYGON];
      if (Array.isArray(exchanges)) {
        plgExchanges = exchanges.map((exchange: any) =>
          parseExchangeDataModelResponse(exchange, 'PLG', 3, childToken?.tokenID)
        );
      }
    }

    if (data?.hasOwnProperty(NetworkTypePayload.FANTOM)) {
      const childToken = sellToken?.listUnifiedToken?.find((token: any) => token?.networkID === 4);
      const exchanges = data[NetworkTypePayload.FANTOM];
      if (Array.isArray(exchanges)) {
        ftmExchanges = exchanges.map((exchange: any) =>
          parseExchangeDataModelResponse(exchange, 'FTM', 4, childToken?.tokenID)
        );
      }
    }

    const exchangeSupports = [...ethExchanges, ...ftmExchanges, ...plgExchanges, ...bscExchanges];

    if (!exchangeSupports?.length)
      throw new Error('Can not find any trading platform that supports for this pair token');

    // Find best rate by list exchange
    const bestRate: ISwapExchangeData = exchangeSupports.reduce((prev, current) =>
      prev.amountOut > current.amountOut ? prev : current
    );

    // Set default exchange has best rate
    const defaultExchange: string = bestRate?.exchangeName;
    dispatch(actionSetExchangeSelected(defaultExchange));

    dispatch(actionSetSwapExchangeSupports(exchangeSupports));
  } catch (error) {
    dispatch(actionSetSwapEstimateTradeErrorMsg(typeof error === 'string' ? error : ''));
  } finally {
    setTimeout(() => {
      dispatch(actionSetFetchingFee({ isFetchingFee: false }));
    }, 200);
  }
};

export const actionGetVaults = () => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    const data = await rpcClient.getVaults();
    dispatch(actionSetVaults(data));
  } catch (error) {
    console.log('ACTION CHANGE BUY NETWORK ERROR: ', error);
  }
};
