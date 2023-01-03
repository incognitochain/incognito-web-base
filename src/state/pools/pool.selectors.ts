import { createSelector } from '@reduxjs/toolkit';
import { BigNumber } from 'bignumber.js';
import { AppState } from 'state';

import convert from '../../utils/convert';
import format from '../../utils/format';
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
export const explorerSelectors = createSelector(poolSelectors, (pool) => {
  const prvPrice = pool.explores.find((item: any) => item['metricType'] === 'PRV_PRICE')?.value || 0;
  const price = convert.toNumber({
    text: format.amountVer2({
      originalAmount: new BigNumber(prvPrice).toNumber(),
      decimals: 0,
    }),
    autoCorrect: true,
  });
  const totalSupply = pool.explores.find((item: any) => item['metricType'] === 'PRV_CIRCULATING_SUPPLY')?.value;
  return {
    prvPrice: price,
    totalSupply,
  };
});
