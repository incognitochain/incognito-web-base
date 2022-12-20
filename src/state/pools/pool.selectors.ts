import { createSelector } from '@reduxjs/toolkit';
import { AppState } from 'state';

import { getPrivacyDataByTokenIDSelector } from '../token';

export const poolSelectors = createSelector(
  (state: AppState) => state.pool,
  (pool) => pool
);

export const isFetchingPoolsSelectors = createSelector(poolSelectors, (pool) => pool.isFetching);

export const poolsSelectors = createSelector(
  poolSelectors,
  getPrivacyDataByTokenIDSelector,
  (pool, getPrivacyDataByTokenID) => {
    return (pool.pools || []).filter((pool) => {
      if (!pool) return false;
      const { token1ID, token2ID } = pool;
      const token1 = getPrivacyDataByTokenID(token1ID);
      const token2 = getPrivacyDataByTokenID(token2ID);
      return !token1.movedUnifiedToken && !token2.movedUnifiedToken;
    });
  }
);
