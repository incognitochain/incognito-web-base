import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import { AppDispatch, AppState } from 'state';

import { MAIN_NETWORK_NAME } from '../../../../constants';
import { getPrivacyByTokenIDSelectors } from '../../../../state/token';
import { DepositSetTokenAction, DepositSetTokenPayLoad, FormDepositActionType } from './FormDeposit.types';

const actionSetToken = (payload: DepositSetTokenPayLoad): DepositSetTokenAction => ({
  type: FormDepositActionType.SET_TOKEN,
  payload,
});

export const actionFilterSetToken =
  ({ token }: { token: PToken }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      const parentToken = getPrivacyByTokenIDSelectors(getState())(token.parentTokenID);
      if (!token.chainID || !token.networkName) return;
      const sellToken: ITokenNetwork = {
        identify: token.identify,
        chainID: token.chainID,
        currency: token.currencyType,
        networkName: token.networkName,
      };
      const buyToken: ITokenNetwork = {
        identify: token.identify,
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
