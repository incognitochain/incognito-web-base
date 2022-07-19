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
  UnshieldFetchingUserFeePayLoad,
  UnshieldResetUserFeeAction,
  UnshieldSetFetchingUserFeeAction,
  UnshieldSetTokenAction,
  UnshieldSetTokenPayLoad,
  UnshieldSetUserFeeAction,
  UnshieldSetUserFeePayLoad,
} from './FormUnshield.types';

const actionSetToken = (payload: UnshieldSetTokenPayLoad): UnshieldSetTokenAction => ({
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

export const actionChangeSellToken =
  ({ token }: { token: PToken }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      const parentToken = getPrivacyByTokenIdentifySelectors(getState())(token.parentTokenID);
      if (!token.chainID || !token.networkName || !parentToken.currencyType) return;
      const sellToken: ITokenNetwork = {
        identify: token.identify,
        chainID: token.chainID,
        currency: token.currencyType,
        networkName: token.networkName,
      };
      let _buyToken = parentToken;
      if (parentToken.hasChild) {
        _buyToken = parentToken.listUnifiedToken[0];
      }
      const buyToken: ITokenNetwork = {
        identify: _buyToken.identify,
        chainID: _buyToken.chainID,
        currency: _buyToken.currencyType,
        networkName: _buyToken.networkName || MAIN_NETWORK_NAME.INCOGNITO,
      };

      dispatch(
        actionSetToken({
          sellToken,
          buyToken,
        })
      );
    } catch (error) {
      console.log('ACTION FILTER TOKEN ERROR: ', error);
    }
  };

export const actionChangeBuyNetwork =
  ({ network }: { network: ITokenNetwork }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      dispatch(
        actionSetToken({
          buyToken: { ...network },
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
      unifiedTokenID: sellToken.tokenID,
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
