import { BigNumber } from 'bignumber.js';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import { rpcClient } from 'services';
import { AppDispatch, AppState } from 'state';
import { getPrivacyByTokenIdentifySelectors } from 'state/token';
import convert from 'utils/convert';

import { unshieldDataSelector } from './FormUnshield.selectors';
import {
  FormUnshieldActionType,
  SwapExchange,
  UnshieldFetchingUserFeePayLoad,
  UnshieldResetUserFeeAction,
  UnshieldSetFetchingUserFeeAction,
  UnshieldSetTokenAction,
  UnshieldSetTokenPayLoad,
  UnshieldSetUserFeeAction,
  UnshieldSetUserFeePayLoad,
} from './FormUnshield.types';

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

export const actionSetExchangeSelected = (payload: SwapExchange | null) => ({
  type: FormUnshieldActionType.SET_SWAP_EXCHANGE_SELECTED,
  payload,
});

export const actionSetSwapEstimateTradeErrorMsg = (payload: string) => ({
  type: FormUnshieldActionType.SET_SWAP_ESTIMATE_TRADE_ERROR_MSG,
  payload,
});

export const actionChangeSellToken =
  ({ token }: { token: PToken }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      const parentToken = getPrivacyByTokenIdentifySelectors(getState())(token.parentTokenID);
      if (!token.chainID || !token.networkName || !parentToken.currencyType) return;
      const sellToken: ITokenNetwork = {
        parentIdentify: token.parentTokenID,
        identify: token.identify,
        chainID: token.chainID,
        currency: token.currencyType,
        networkName: token.networkName,
      };

      dispatch(
        actionSetToken({
          sellToken,
        })
      );
    } catch (error) {
      console.log('ACTION FILTER TOKEN ERROR: ', error);
    }
  };

export const actionChangeBuyToken =
  ({ token }: { token: PToken }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      const parentToken = getPrivacyByTokenIdentifySelectors(getState())(token.parentTokenID);
      if (!token.chainID || !token.networkName || !parentToken.currencyType) return;
      const buyToken: any = {
        parentIdentify: parentToken.identify,
        identify: parentToken?.isUnified ? null : parentToken.identify,
        chainID: parentToken.chainID,
        currency: parentToken.hasChild ? null : parentToken.currencyType,
        networkName: parentToken.hasChild ? null : MAIN_NETWORK_NAME.INCOGNITO,
      };

      dispatch(
        actionSetToken({
          buyToken,
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
    try {
      dispatch(
        actionSetToken({
          buyToken: {
            ...network,
          },
        })
      );
    } catch (error) {
      console.log('ACTION CHANGE BUY NETWORK ERROR: ', error);
    }
  };

export const actionEstimateFee = () => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    const { inputAmount, inputOriginalAmount, buyToken, incAddress, unshieldAddress, sellToken } = unshieldDataSelector(
      getState()
    );
    if (!incAddress || !unshieldAddress) return;
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
      !sellToken?.tokenID ||
      !buyParentToken?.tokenID ||
      !incAddress ||
      !unshieldAddress ||
      !buyNetworkName
    )
      return;
    dispatch(actionSetSwapEstimateTradeErrorMsg(''));
    dispatch(actionSetFetchingFee({ isFetchingFee: true }));
    let network = 'inc';
    if (buyNetworkName === MAIN_NETWORK_NAME.ETHEREUM) {
      network = 'eth';
    } else if (buyNetworkName === MAIN_NETWORK_NAME.BSC) {
      network = 'bsc';
    } else if (buyNetworkName === MAIN_NETWORK_NAME.POLYGON) {
      network = 'plg';
    } else if (buyNetworkName === MAIN_NETWORK_NAME.FANTOM) {
      network = 'ftm';
    }

    const payload = {
      network,
      amount: inputAmount,
      fromToken: sellToken.tokenID,
      toToken: buyParentToken.tokenID,
    };
    const data = await rpcClient.estimateSwapFee(payload);

    if (data) {
      const defaultExchange: SwapExchange = data[0]?.AppName;
      dispatch(actionSetExchangeSelected(defaultExchange));
      dispatch(actionSetSwapExchangeSupports(data));
    }
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
