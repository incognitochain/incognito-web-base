import keyBy from 'lodash/keyBy';
import { getTokenListNoCache } from 'services/rpcClient';

import { AppDispatch, AppState } from '../index';
import { TokenActionType, TokenSetAction, TokenSetPayLoad } from './token.types';

const actionSetPTokens = (payload: TokenSetPayLoad): TokenSetAction => ({
  type: TokenActionType.SET_PTOKEN,
  payload,
});

export const actionGetPTokens = () => async (dispatch: AppDispatch, getState: AppState) => {
  try {
    const data = (await getTokenListNoCache()) || [];
    const pTokens = keyBy(data, 'tokenId');
    dispatch(actionSetPTokens({ pTokens }));
  } catch (e) {
    console.log('GET PTOKEN WITH ERROR: ', e);
  }
};
