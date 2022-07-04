import keyBy from 'lodash/keyBy';
import { getTokenListNoCache } from 'services/rpcClient';

import PTokenModel from '../../models/model/pTokenModel';
import { AppDispatch, AppState } from '../index';
import { TokenActionType, TokenSetAction, TokenSetPayLoad } from './token.types';

const actionSetPTokens = (payload: TokenSetPayLoad): TokenSetAction => ({
  type: TokenActionType.SET_PTOKEN,
  payload,
});

export const actionGetPTokens = () => async (dispatch: AppDispatch, getState: AppState) => {
  try {
    const list = (await getTokenListNoCache()) || [];
    const pTokens = keyBy(list, 'tokenId');
    const compactTokens = list.reduce((tokens: PTokenModel[], currToken) => {
      let _tokens: PTokenModel[] = [currToken];
      if (currToken.listChildToken && currToken.listChildToken.length > 0) {
        _tokens = currToken.listChildToken;
      }
      // if (currToken.listUnifiedToken && currToken.listUnifiedToken.length > 0) {
      //   _tokens = currToken.listUnifiedToken;
      // }
      return [...tokens, ..._tokens];
    }, []);

    dispatch(actionSetPTokens({ pTokens }));
  } catch (e) {
    console.log('GET PTOKEN WITH ERROR: ', e);
  }
};
