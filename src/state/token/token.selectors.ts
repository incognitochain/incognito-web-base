import { createSelector } from '@reduxjs/toolkit';
import { GROUP_NETWORK, PRV } from 'constants/token';
import SelectedPrivacyModel from 'models/model/SelectedPrivacyModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { AppState } from 'state';

export const tokenSelectors = createSelector(
  (state: AppState) => state.token,
  (token) => token
);

export const isFetchingSelectors = createSelector(tokenSelectors, (token) => token.isFetching);

export const pTokensSelector = createSelector(tokenSelectors, ({ pTokens }) => pTokens || {});

export const depositableSelectors = createSelector(tokenSelectors, (token) => token.depositable);

export const unshieldableTokens = createSelector(pTokensSelector, (pTokens) => {
  const pTokensArr = Object.values(pTokens || {});
  const unshieldable = pTokensArr.filter(({ tokenID, currencyType }) => {
    return (
      Boolean(
        Object.keys(GROUP_NETWORK).find((key) => {
          return GROUP_NETWORK[key].includes(currencyType);
        })
      ) && tokenID !== PRV.id
    );
  });
  return unshieldable || [];
});

export const groupNetworkSelectors = createSelector(tokenSelectors, (token) => token.groupByNetwork);

export const getPrivacyByTokenIDSelectors = createSelector(
  tokenSelectors,
  (tokens) =>
    (id: string): SelectedPrivacy => {
      const pTokens = tokens.pTokens;
      const token = pTokens[id];
      return new SelectedPrivacyModel(token);
    }
);

export const getDepositTokenDataSelector = createSelector(
  depositableSelectors,
  (depositable) =>
    (id: string): SelectedPrivacy => {
      const token = depositable[id];
      return new SelectedPrivacyModel(token);
    }
);
