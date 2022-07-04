import { GROUP_NETWORK } from 'constants/token';
import keyBy from 'lodash/keyBy';
import PTokenModel from 'models/model/pTokenModel';
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

    // flatten tokens
    const flattenTokens = depositable.reduce((tokens: PTokenModel[], currToken) => {
      let _tokens: PTokenModel[] = [currToken];
      if (currToken.listChildToken && currToken.listChildToken.length > 0) {
        _tokens = currToken.listChildToken;
      }
      if (currToken.listUnifiedToken && currToken.listUnifiedToken.length > 0) {
        _tokens = currToken.listUnifiedToken;
      }
      return [...tokens, ..._tokens];
    }, []);

    // depositable tokens by metamask, extension wallet
    const groupByNetwork: any = {};
    flattenTokens.forEach((token) => {
      const currencyType = token.currencyType;
      const findCurrency = Object.keys(GROUP_NETWORK).find((key) => {
        return GROUP_NETWORK[key].includes(currencyType);
      });
      if (!findCurrency) return;
      if (groupByNetwork[findCurrency]) {
        groupByNetwork[findCurrency].push(token);
      } else {
        groupByNetwork[findCurrency] = [token];
      }
    });
    dispatch(actionSetPTokens({ pTokens, depositable, groupByNetwork }));
  } catch (e) {
    console.log('GET PTOKEN WITH ERROR: ', e);
  } finally {
    dispatch(actionFetchingPTokens({ isFetching: false }));
  }
};
