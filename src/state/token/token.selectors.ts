import { createSelector } from '@reduxjs/toolkit';
import { GROUP_NETWORK, PRIORITY_TOKEN_ID } from 'constants/token';
import orderBy from 'lodash/orderBy';
import SelectedPrivacyModel from 'models/model/SelectedPrivacyModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { AppState } from 'state';
import { incognitoAccountFollowTokenIDs } from 'state/incognitoWallet';

import { incognitoWalletAccountSelector } from '../incognitoWallet';
const { PRVIDSTR } = require('incognito-chain-web-js/build/web/wallet');

export const tokenSelectors = createSelector(
  (state: AppState) => state.token,
  (token) => token
);

export const isFetchingSelectors = createSelector(tokenSelectors, (token) => token.isFetching);

export const pTokensSelector = createSelector(tokenSelectors, ({ pTokens }) => pTokens || {});

export const depositableSelectors = createSelector(tokenSelectors, (token) => token.depositable);

export const unshieldableTokens = createSelector(pTokensSelector, (pTokens) => {
  const pTokensArr = Object.values(pTokens || {});
  const unshieldable = pTokensArr.filter(({ tokenID, currencyType, hasChild, isUnified, isVerified }) => {
    if (isUnified && !hasChild) return false;
    return (
      Boolean(
        Object.keys(GROUP_NETWORK).find((key) => {
          return GROUP_NETWORK[key].includes(currencyType);
        })
      ) && isVerified
    );
  });
  return unshieldable || [];
});

export const groupNetworkSelectors = createSelector(tokenSelectors, (token) => token.groupByNetwork);

export const getPrivacyByTokenIdentifySelectors = createSelector(
  tokenSelectors,
  incognitoWalletAccountSelector,
  (tokens, incAccount) =>
    (id: string): SelectedPrivacy => {
      const pTokens = tokens.pTokens;
      const token = pTokens[id];
      let followTokens = [];
      if (incAccount) {
        followTokens = incAccount.balances || [];
      }
      return new SelectedPrivacyModel(token, followTokens);
    }
);

export const getPrivacyDataByTokenIDSelector = createSelector(
  tokenSelectors,
  incognitoWalletAccountSelector,
  (tokens, incAccount) =>
    (tokenID: string): SelectedPrivacy => {
      const pTokens = Object.values(tokens.pTokens) || [];
      const token = pTokens.find(({ tokenID: _tokenID }) => _tokenID === tokenID);
      let followTokens = [];
      if (incAccount) {
        followTokens = incAccount.balances || [];
      }
      return new SelectedPrivacyModel(token, followTokens);
    }
);

export const mainPTokenSelector = createSelector(unshieldableTokens, (pTokens: any) => {
  // prv, btc, eth, bnb, dai, ltc, xmr, zec, usdc, dash, usdt, doge, busd, bat, link, neo, zil
  if (!pTokens?.length) return [];
  const PRIORITY_LIST: string[] = PRIORITY_TOKEN_ID;
  const sortPriority = pTokens
    ?.filter((token: any) => PRIORITY_LIST.includes(token?.tokenID))
    .map((token: any) => {
      let priority = PRIORITY_LIST.indexOf(token?.tokenID);
      priority = priority > -1 ? priority : PRIORITY_LIST.length;
      return {
        ...token,
        priority,
        verified: token.verified,
      };
    });
  const res = orderBy(sortPriority, ['priority'], ['asc']);
  return res;
});

export const getDepositTokenDataSelector = createSelector(
  depositableSelectors,
  incognitoWalletAccountSelector,
  (depositable, incAccount) =>
    (id: string): SelectedPrivacy => {
      const token = depositable[id];
      let followTokens = [];
      if (incAccount) {
        followTokens = incAccount.balances || [];
      }
      return new SelectedPrivacyModel(token, followTokens);
    }
);

export const followTokensFormatedSelector = createSelector(
  getPrivacyDataByTokenIDSelector,
  incognitoAccountFollowTokenIDs,
  (getPrivacyDataByToken, tokens) => {
    const _tokensConvert = tokens.map((tokenId: string) => getPrivacyDataByToken(tokenId));
    const result = orderBy(
      _tokensConvert,
      [(c: SelectedPrivacyModel) => c.tokenID === PRVIDSTR, (c) => c.formatBalanceByUsd, (c) => c.amount || 0],
      ['desc', 'desc', 'desc']
    ).filter(({ symbol }) => !!symbol);
    return result;
  }
);
