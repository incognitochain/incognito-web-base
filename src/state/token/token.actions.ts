import keyBy from 'lodash/keyBy';
import { getTokenListNoCache } from 'services/rpcClient';

import { AppDispatch, AppState } from '../index';
import { isFetchingSelectors } from './token.selectors';
import {
  TokenActionType,
  TokenFetchingAction,
  TokenFetchingPayLoad,
  TokenSetAction,
  TokenSetPayLoad,
} from './token.types';

const actionSetPTokens = (payload: TokenSetPayLoad): TokenSetAction => ({
  type: TokenActionType.SET_PTOKEN,
  payload,
});

const actionFetchingPTokens = (payload: TokenFetchingPayLoad): TokenFetchingAction => ({
  type: TokenActionType.FETCHING,
  payload,
});

export const actionGetPTokens = () => async (dispatch: AppDispatch, getState: AppState & any) => {
  const isFetching = isFetchingSelectors(getState());
  if (isFetching) return;
  try {
    dispatch(actionFetchingPTokens({ isFetching: true }));
    const list = (await getTokenListNoCache()) || [];
    const pTokens = keyBy(list, 'tokenId');
    const depositable = list.filter(({ movedUnifiedToken }) => !movedUnifiedToken);
    dispatch(actionSetPTokens({ pTokens, depositable }));
  } catch (e) {
    console.log('GET PTOKEN WITH ERROR: ', e);
  } finally {
    dispatch(actionFetchingPTokens({ isFetching: false }));
  }
};
