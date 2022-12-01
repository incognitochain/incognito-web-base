import { Pool, PoolApiResponse } from './Earnings.types';

export const parseListPoolApiResponse = (data: PoolApiResponse[]) => {
  const pools: Pool[] = [];
  if (!data?.length) return [];
  for (let i = 0; i < data?.length; i++) {
    pools.push({
      poolID: data[i]?.PoolID,
      token1ID: data[i]?.Token1ID,
      token2ID: data[i]?.Token2ID,
      token1Value: data[i]?.Token1Value,
      token2Value: data[i]?.Token2Value,
      virtual1Value: data[i]?.Virtual1Value,
      virtual2Value: data[i]?.Virtual2Value,
      totalShare: data[i]?.TotalShare,
      amp: data[i]?.AMP,
      price: data[i]?.Price,
      volume: data[i]?.Volume,
      totalValueLockUSD: data[i]?.TotalValueLockUSD,
      priceChange24h: data[i]?.PriceChange24h,
      apy: data[i]?.APY,
      isVerify: data[i]?.IsVerify,
      token1CurrencyType: data[i]?.Token1CurrencyType,
      token2CurrencyType: data[i]?.Token2CurrencyType,
      token1Symbol: data[i]?.Token1Symbol,
      token2Symbol: data[i]?.Token2Symbol,
    });
  }
  return pools;
};
