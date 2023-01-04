import { SwapExchange } from './FormUnshield.types';

export interface IReqEstSwapFee {
  amount: number;
  amountInBuyToken: number;
  feeInUSD: number;
  privacyFee: number;
  tokenid: string;
}

export type IRespEstSwap = {
  [key in SwapExchange]: IRespEstSwap[];
};

export interface IRespEstSwapEachExchange {
  AppName: SwapExchange;

  AmountIn: string;

  AmountOut: string;
  AmountOutRaw: string; // decimal amount, maximum receive amount
  AmountOutPreSlippage: string; // expected receive amount ${expectedAmount}

  Calldata: string;
  CallContract: string;

  Fee: IReqEstSwapFee;
  FeeAddress: string; // non-PDex
  FeeAddressShardID: number; // non-PDex

  ImpactAmount: string; // Price impact;

  Paths: string | string[]; // case PDEX is Array, case pApps return string
  PathsContract: string[]; // case pApps

  PoolPairs: string[]; // trade path for PDEX;

  Rate: string;

  Details: IRespEstSwapEachExchange[];

  MidOTA: string;
  MidToken: string;

  PAppNetwork: SwapExchange;
}
