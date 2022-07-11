import { MAIN_NETWORK_NAME } from 'constants/token';
import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import { AppDispatch, AppState } from 'state';
import { getPrivacyByTokenIDSelectors } from 'state/token';

import { FormDepositActionType, UnshieldSetTokenAction, UnshieldSetTokenPayLoad } from './FormUnshield.types';

const actionSetToken = (payload: UnshieldSetTokenPayLoad): UnshieldSetTokenAction => ({
  type: FormDepositActionType.SET_TOKEN,
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
      const buyToken: ITokenNetwork = {
        identify: parentToken.identify,
        chainID: parentToken.chainID,
        currency: parentToken.currencyType,
        networkName: parentToken.networkName || MAIN_NETWORK_NAME.INCOGNITO,
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
