import { createSelector } from '@reduxjs/toolkit';
import { AppState } from 'state';

export const tokenSelectors = createSelector(
  (state: AppState) => state.token,
  (token) => token
);

export const pTokensSelector = createSelector(tokenSelectors, ({ pTokens }) => pTokens || {});
