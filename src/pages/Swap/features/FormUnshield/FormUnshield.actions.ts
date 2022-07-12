import { MAIN_NETWORK_NAME } from 'constants/token';
import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import { AppDispatch, AppState } from 'state';
import { getPrivacyByTokenIDSelectors } from 'state/token';

import { rpcClient } from '../../../../services';
import { unshieldDataSelector } from './FormUnshield.selectors';
import { FormUnshieldActionType, UnshieldSetTokenAction, UnshieldSetTokenPayLoad } from './FormUnshield.types';

const actionSetToken = (payload: UnshieldSetTokenPayLoad): UnshieldSetTokenAction => ({
  type: FormUnshieldActionType.SET_TOKEN,
  payload,
});

export const actionChangeSellToken =
  ({ token }: { token: PToken }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      const parentToken = getPrivacyByTokenIDSelectors(getState())(token.parentTokenID);
      if (!token.chainID || !token.networkName || !parentToken.currencyType) return;
      const sellToken: ITokenNetwork = {
        identify: token.identify,
        chainID: token.chainID,
        currency: token.currencyType,
        networkName: token.networkName,
      };

      let _buyToken = parentToken;
      if (parentToken.hasChild) {
        _buyToken = parentToken.listChildToken[0];
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
      console.log('HIHI');
    } catch (error) {
      console.log('ACTION FILTER TOKEN ERROR: ', error);
    }
  };

export const actionEstimateFee = () => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    const { inputAmount, inputOriginalAmount, sellToken, incAddress, unshieldAddress } = unshieldDataSelector(
      getState()
    );
    if (!inputAmount) return;
    const payload = {
      network: 'eth',
      incognitoAmount: inputOriginalAmount,
      paymentAddress: unshieldAddress,
      privacyTokenAddress: sellToken.tokenID,
      requestedAmount: inputAmount,
      walletAddress: incAddress,
    };
    const data = await rpcClient.estimateFee(payload);
    console.log('SANG TEST: ', data);
  } catch (error) {
    console.log('ACTION FILTER TOKEN ERROR: ', error);
  }
};
