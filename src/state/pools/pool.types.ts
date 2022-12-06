export enum PoolActionType {
  FETCHING = 'POOL/FETCHING',
  SET_POOLS = 'POOL/SET_POOLS',
}

export interface PoolApiResponse {
  PoolID: string;
  Token1ID: string;
  Token2ID: string;
  Token1Value: number;
  Token2Value: number;
  Virtual1Value: number;
  Virtual2Value: number;
  TotalShare: number;
  AMP: number;
  Price: number;
  Volume: number;
  TotalValueLockUSD: number;
  PriceChange24h: number;
  APY: number;
  IsVerify: boolean;
  Token1CurrencyType: number;
  Token2CurrencyType: number;
  Token1Symbol: string;
  Token2Symbol: string;
}

export interface Pool {
  poolID: string;
  token1ID: string;
  token2ID: string;
  token1Value: number;
  token2Value: number;
  virtual1Value: number;
  virtual2Value: number;
  totalShare: number;
  amp: number;
  price: number;
  volume: number;
  totalValueLockUSD: number;
  priceChange24h: number;
  apy: number;
  isVerify: boolean;
  token1CurrencyType: number;
  token2CurrencyType: number;
  token1Symbol: string;
  token2Symbol: string;
}

export interface IPoolReducer {
  isFetching: boolean;
  pools: Pool[];
}
