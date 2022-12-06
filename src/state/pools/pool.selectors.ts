import { createSelector } from '@reduxjs/toolkit';
import { AppState } from 'state';

export const poolSelectors = createSelector(
  (state: AppState) => state.pool,
  (pool) => pool
);

export const isFetchingPoolsSelectors = createSelector(poolSelectors, (pool) => pool.isFetching);

export const poolsSelectors = createSelector(poolSelectors, (pool) => pool.pools);
