import { createSelector } from '@reduxjs/toolkit';
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

export const groupNetworkSelectors = createSelector(tokenSelectors, (token) => token.groupByNetwork);

export const getPrivacyByTokenIDSelectors = createSelector(
  tokenSelectors,
  (tokens) =>
    (tokenID: string): SelectedPrivacy => {
      const pTokens = tokens.pTokens;
      const token = pTokens[tokenID];
      return new SelectedPrivacyModel(token);
    }
);

export const getDepositTokenDataSelector = createSelector(
  depositableSelectors,
  (depositable) =>
    (tokenID: string): SelectedPrivacy => {
      const token: any = depositable.find((token) => token.tokenID === tokenID);
      return new SelectedPrivacyModel(token);
    }
);
