import { createSelector } from '@reduxjs/toolkit';
import { AppState } from 'state';

export const tokenSelectors = createSelector(
  (state: AppState) => state.token,
  (token) => token
);

export const isFetchingSelectors = createSelector(tokenSelectors, (token) => token.isFetching);

export const pTokensSelector = createSelector(tokenSelectors, ({ pTokens }) => pTokens || {});

export const depositableSelectors = createSelector(tokenSelectors, (token) => token.depositable);
