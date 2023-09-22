import { createSelector } from '@reduxjs/toolkit';
import { BigNumber } from 'bignumber.js';
import { orderBy } from 'lodash';
import { AppState } from 'state';

import convert from '../../utils/convert';
import format from '../../utils/format';
import { getPrivacyDataByTokenIDSelector } from '../token';

const TVL_MIN = 10; //min 10$

export const poolSelectors = createSelector(
  (state: AppState) => state.pool,
  (pool) => pool
);

export const isFetchingPoolsSelectors = createSelector(poolSelectors, (pool) => pool.isFetching);

export const poolsSelectors = createSelector(
  poolSelectors,
  getPrivacyDataByTokenIDSelector,
  (pool, getPrivacyDataByTokenID) => {
    let results = [];
    results = (pool.pools || []).filter((pool) => {
      if (!pool) return false;
      const { token1ID, token2ID, totalValueLockUSD } = pool;
      const token1 = getPrivacyDataByTokenID(token1ID);
      const token2 = getPrivacyDataByTokenID(token2ID);

      if (new BigNumber(totalValueLockUSD || '0').lt(TVL_MIN)) return false;

      return !token1.movedUnifiedToken && !token2.movedUnifiedToken;
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    results = orderBy(results, ['totalValueLockUSD'], ['desc']);

    return results;
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
