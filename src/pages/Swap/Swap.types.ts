import { Action } from 'redux';

export enum SwapActionType {
  FETCHING_UNSHIELD_FEE = 'SWAP/FETCHING_UNSHIELD_FEE',
  FETCHED_UNSHIELD_FEE = 'SWAP/FETCHED_UNSHIELD_FEE',
}

interface IUnshieldFee {
  tokenID: string;
  amount: number;
}

export interface ISwapReducer {
  isFetching: boolean;
  networkFee: number;
  unshieldFee: IUnshieldFee;
}

export interface SwapFetchingUnshieldFeeAction extends Action {
  type: SwapActionType.FETCHING_UNSHIELD_FEE;
}

export interface UnshieldFeePayload {
  unshieldFee: IUnshieldFee;
}
export interface SwapFetchedUnshieldFeeAction extends Action {
  type: SwapActionType.FETCHED_UNSHIELD_FEE;
  payload: UnshieldFeePayload;
}

export type SwapActions = SwapFetchingUnshieldFeeAction | SwapFetchedUnshieldFeeAction;
