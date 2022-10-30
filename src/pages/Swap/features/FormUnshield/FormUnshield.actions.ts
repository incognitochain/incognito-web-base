import { BigNumber } from 'bignumber.js';
import { BIG_COINS, MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import PToken, { getTokenIdentify, ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { rpcClient } from 'services';
import { AppDispatch, AppState } from 'state';
import { getPrivacyByTokenIdentifySelectors } from 'state/token';
import convert from 'utils/convert';
import { getAcronymNetwork } from 'utils/token';

import { unshieldDataSelector } from './FormUnshield.selectors';
import {
  FormTypes,
  FormUnshieldActionType,
  ISwapExchangeData,
  NetworkTypePayload,
  UnshieldFetchingUserFeePayLoad,
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

export const actionResetFee = () => ({
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

export const actionSetErrorMsg = (payload: string) => ({
  type: FormUnshieldActionType.SET_ERROR_MSG,
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
      const { buyToken, formType, sellToken } = unshieldDataSelector(getState());
      const sellParentToken = getPrivacyByTokenIdentifySelectors(getState())(token.parentTokenID);
      if (!token.networkName || sellParentToken.currencyType === undefined) return;

      const _sellToken: ITokenNetwork = {
        parentIdentify: token.parentTokenID,
        identify: token.identify,
        chainID: token.chainID,
        currency: token.currencyType,
        networkName: token.networkName,
      };

      let _buyToken = sellParentToken;
      if (_buyToken.hasChild) {
        _buyToken = _buyToken.listUnifiedToken[0];
      }
      if (sellParentToken.parentTokenID === buyToken.parentTokenID) {
        const defaultBuyToken: ITokenNetwork = {
          parentIdentify: token.parentTokenID,
          identify: _buyToken.identify,
          chainID: _buyToken.chainID,
          currency: _buyToken.currencyType,
          networkName: _buyToken.networkName || MAIN_NETWORK_NAME.INCOGNITO,
        };
        dispatch(
          actionSetToken({
            sellToken: _sellToken,
            buyToken: defaultBuyToken,
          })
        );
        dispatch(actionSetSwapNetwork(_buyToken.networkName || MAIN_NETWORK_NAME.INCOGNITO));
      } else {
        dispatch(
          actionSetToken({
            sellToken: _sellToken,
          })
        );
      }
      if (formType === FormTypes.SWAP) {
        dispatch(actionSetExchangeSelected(null));
        dispatch(actionSetSwapExchangeSupports([]));
      }
    } catch (error) {
      console.log('ACTION FILTER TOKEN ERROR: ', error);
    }
  };

export const actionChangeBuyToken =
  ({ token }: { token: PToken }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      const parentToken = getPrivacyByTokenIdentifySelectors(getState())(token.parentTokenID);
      if (!token.networkName || parentToken.currencyType === undefined) return;

      let _buyToken = parentToken;
      const { sellToken } = unshieldDataSelector(getState());
      if (parentToken.hasChild && _buyToken.parentTokenID === sellToken.parentTokenID) {
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
    const { sellToken, buyToken, buyParentToken } = unshieldDataSelector(getState());

    const parentID = getTokenIdentify({
      tokenID: !sellToken.parentTokenID.toLowerCase().includes(BIG_COINS.USDC_UNIFIED.tokenID.toLowerCase())
        ? BIG_COINS.USDC_UNIFIED.tokenID
        : BIG_COINS.ETH_UNIFIED.tokenID,
      currencyType: PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN,
    });

    console.log('SANG TEST:: 555 111', sellToken.parentTokenID, BIG_COINS.USDC_UNIFIED.tokenID);

    const defBuyToken = {
      parentIdentify: parentID,
      identify: parentID,
      chainID: 0,
      currency: PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN,
      networkName: network.networkName,
    };

    try {
      // set network and token centralized + BTC
      if ((sellToken.isBTC || sellToken.isCentralized) && network.networkName === sellToken.networkName) {
        dispatch(actionSetToken({ buyToken: { ...network } }));
      } else {
        // unshield
        if (sellToken.parentTokenID === buyToken.parentTokenID) {
          // reset field
          if (network.networkName === MAIN_NETWORK_NAME.INCOGNITO) {
            dispatch(actionSetToken({ buyToken: { ...defBuyToken } }));
          } else {
            dispatch(actionSetToken({ buyToken: { ...network } }));
          }
        } else {
          // case swap
          if (network.networkName === MAIN_NETWORK_NAME.INCOGNITO) {
            // set unified token
            if (buyToken.tokenID !== buyToken.parentTokenID) {
              dispatch(
                actionSetToken({
                  buyToken: {
                    parentIdentify: buyParentToken.parentTokenID,
                    identify: buyParentToken.identify,
                    chainID: buyParentToken.chainID,
                    currency: buyParentToken.currencyType,
                    networkName: network.networkName,
                  },
                })
              );
            }
          } else {
            const childToken = buyParentToken.listUnifiedToken.find(
              (token: any) => token.networkName === network.networkName
            );
            if (!!childToken) {
              dispatch(
                actionSetToken({
                  buyToken: {
                    parentIdentify: buyParentToken.parentTokenID,
                    identify: childToken.identify,
                    chainID: childToken.chainID,
                    currency: childToken.currencyType,
                    networkName: network.networkName,
                  },
                })
              );
            }
          }
        }
      }
      dispatch(actionSetSwapNetwork(network?.networkName));
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
    dispatch(actionSetErrorMsg(''));
    dispatch(actionSetFetchingFee({ isFetchingFee: true }));
    const network: any = getAcronymNetwork(buyToken);

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
      currencyType: buyToken.currencyType,
    };
    const data = await rpcClient.estimateFee(payload);
    dispatch(actionSetUserFee({ fee: data }));
  } catch (error) {
    dispatch(actionSetErrorMsg(typeof error === 'string' ? error : error?.message || ''));
    console.log('ACTION ESTIMATE UNSHIELD FEE ERROR: ', error);
  } finally {
    setTimeout(() => {
      dispatch(actionSetFetchingFee({ isFetchingFee: false }));
    }, 200);
  }
};

export const actionEstimateSwapFee = () => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    const { inputAmount, buyParentToken, buyNetworkName, incAddress, sellToken, slippage } = unshieldDataSelector(
      getState()
    );
    if (
      !inputAmount ||
      !parseFloat(inputAmount) ||
      !sellToken?.tokenID ||
      !buyParentToken?.tokenID ||
      !incAddress ||
      !buyNetworkName
    ) {
      return;
    }
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
      slippage,
    };

    // Call api estimate swap fee
    const data = await rpcClient.estimateSwapFee(payload);
    if (!data) throw new Error('Can not estimate trade');

    let ethExchanges: ISwapExchangeData[] = [];
    let ftmExchanges: ISwapExchangeData[] = [];
    let plgExchanges: ISwapExchangeData[] = [];
    let bscExchanges: ISwapExchangeData[] = [];
    let pdexExchanges: ISwapExchangeData[] = [];

    if (data?.hasOwnProperty(NetworkTypePayload.INCOGNITO)) {
      const incTokenID = sellToken.tokenID;
      const exchanges = data[NetworkTypePayload.INCOGNITO];
      if (Array.isArray(exchanges)) {
        pdexExchanges = exchanges.map((exchange: any) =>
          parseExchangeDataModelResponse(exchange, 'PDex', 0, incTokenID)
        );
      }
    }

    if (data?.hasOwnProperty(NetworkTypePayload.BINANCE_SMART_CHAIN)) {
      let incTokenID = sellToken.tokenID;
      if (sellToken?.isUnified) {
        const childToken = sellToken?.listUnifiedToken?.find((token: any) => token?.networkID === 2);
        incTokenID = childToken?.tokenID || '';
      }
      const exchanges = data[NetworkTypePayload.BINANCE_SMART_CHAIN];
      if (Array.isArray(exchanges)) {
        bscExchanges = exchanges.map((exchange: any) =>
          parseExchangeDataModelResponse(exchange, 'BNB Chain', 2, incTokenID)
        );
      }
    }

    if (data?.hasOwnProperty(NetworkTypePayload.ETHEREUM)) {
      let incTokenID = sellToken.tokenID;
      if (sellToken?.isUnified) {
        const childToken = sellToken?.listUnifiedToken?.find((token: any) => token?.networkID === 1);
        incTokenID = childToken?.tokenID || '';
      }
      const exchanges = data[NetworkTypePayload.ETHEREUM];
      if (Array.isArray(exchanges)) {
        ethExchanges = exchanges.map((exchange: any) =>
          parseExchangeDataModelResponse(exchange, 'Ethereum', 1, incTokenID)
        );
      }
    }

    if (data?.hasOwnProperty(NetworkTypePayload.POLYGON)) {
      let incTokenID = sellToken.tokenID;
      if (sellToken?.isUnified) {
        const childToken = sellToken?.listUnifiedToken?.find((token: any) => token?.networkID === 3);
        incTokenID = childToken?.tokenID || '';
      }
      const exchanges = data[NetworkTypePayload.POLYGON];
      if (Array.isArray(exchanges)) {
        plgExchanges = exchanges.map((exchange: any) =>
          parseExchangeDataModelResponse(exchange, 'Polygon', 3, incTokenID)
        );
      }
    }

    if (data?.hasOwnProperty(NetworkTypePayload.FANTOM)) {
      let incTokenID = sellToken.tokenID;
      if (sellToken?.isUnified) {
        const childToken = sellToken?.listUnifiedToken?.find((token: any) => token?.networkID === 4);
        incTokenID = childToken?.tokenID || '';
      }
      const exchanges = data[NetworkTypePayload.FANTOM];
      if (Array.isArray(exchanges)) {
        ftmExchanges = exchanges.map((exchange: any) =>
          parseExchangeDataModelResponse(exchange, 'Fantom', 4, incTokenID)
        );
      }
    }

    const exchangeSupports = [...ethExchanges, ...ftmExchanges, ...plgExchanges, ...bscExchanges, ...pdexExchanges];

    if (!exchangeSupports?.length)
      throw new Error('Can not find any trading platform that supports for this pair token');

    // Find best rate by list exchange
    // const bestRate: ISwapExchangeData = exchangeSupports[0];
    const bestRate: ISwapExchangeData = exchangeSupports.reduce((prev, current) => {
      let prevFee = '0';
      let curFee = '0';
      if (prev.fees) {
        prevFee = prev.fees[0].amountInBuyToken;
      }
      if (current.fees) {
        curFee = current.fees[0].amountInBuyToken;
      }

      const prevValue = new BigNumber(prev.amountOut).minus(prevFee);
      const currValue = new BigNumber(current.amountOut).minus(curFee);

      return new BigNumber(prevValue).gt(currValue) ? prev : current;
    });

    // Set default exchange has best rate
    const defaultExchange: string = bestRate?.exchangeName;
    dispatch(actionSetExchangeSelected(defaultExchange));

    dispatch(actionSetSwapExchangeSupports(exchangeSupports));
  } catch (error) {
    dispatch(actionSetErrorMsg(typeof error === 'string' ? error : error?.message || ''));
  } finally {
    setTimeout(() => {
      dispatch(actionSetFetchingFee({ isFetchingFee: false }));
    }, 200);
  }
};

export const actionRotateSwapTokens = () => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    const { buyParentToken, sellParentToken } = unshieldDataSelector(getState());

    const getTokenObject = (token: SelectedPrivacy): ITokenNetwork => ({
      parentIdentify: token.parentTokenID,
      identify: token.identify,
      chainID: token.chainID,
      currency: token.currencyType,
      networkName: token.networkName || MAIN_NETWORK_NAME.INCOGNITO,
    });

    dispatch(
      actionSetToken({
        sellToken: getTokenObject(buyParentToken),
        buyToken: getTokenObject(sellParentToken),
      })
    );
    dispatch(actionSetSwapNetwork(MAIN_NETWORK_NAME.INCOGNITO));
  } catch (error) {
    console.log('ACTION FILTER TOKEN ERROR: ', error);
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
