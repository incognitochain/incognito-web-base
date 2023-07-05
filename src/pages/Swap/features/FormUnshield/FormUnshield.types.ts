import { MAIN_NETWORK_NAME } from 'constants/token';
import { ITokenNetwork } from 'models/model/pTokenModel';
import { Action } from 'redux';
import { IUserFee } from 'services/rpcClient';

export enum FormUnshieldActionType {
  SET_TOKEN = 'FORM_UNSHIELD/SET_TOKEN',
  FETCHING_FEE = 'FORM_UNSHIELD/FETCHING_FEE',
  FREE_SWAP_FORM = 'FORM_UNSHIELD/FREE_SWAP_FORM',
  SET_USER_FEE = 'FORM_UNSHIELD/SET_USER_FEE',
  RESET_FEE = 'FORM_UNSHIELD/RESET_FEE',
  SET_VAULTS = 'FORM_UNSHIELD/SET_VAULTS',
  SET_SWAP_EXCHANGE_SUPPORT = 'FORM_UNSHIELD/SET_SWAP_EXCHANGE_SUPPORT',
  SET_SWAP_EXCHANGE_SELECTED = 'FORM_UNSHIELD/SET_SWAP_EXCHANGE_SELECTED',
  SET_ERROR_MSG = 'FORM_UNSHIELD/SET_ERROR_MSG',
  SET_SWAP_NETWORK = 'FORM_UNSHIELD/SET_SWAP_NETWORK',
  SET_IS_MAX = 'FORM_UNSHIELD/SET_IS_MAX',
}

export enum FormTypes {
  UNSHIELD = 'UNSHIELD',
  SWAP = 'SWAP',
}

export enum SwapExchange {
  PANCAKE_SWAP = 'pancake',
  UNISWAP = 'uniswap',
  CURVE = 'curve',
  PDEX = 'pdex',
  SPOOKY = 'spooky',
  JOE = 'joe',
  TRISOLARIS = 'trisolaris',
  INTER_SWAP = 'interswap',
}

export enum NetworkTypePayload {
  INCOGNITO = 'inc',
  ETHEREUM = 'eth',
  POLYGON = 'plg',
  FANTOM = 'ftm',
  BINANCE_SMART_CHAIN = 'bsc',
  AVALANCHE = 'avax',
  AURORA = 'aurora',
  NEAR = 'near',
  CENTRALIZED = 'centralized',
  INTER_SWAP = 'interswap',
}

export interface ISwapExchange {
  exchangeId: SwapExchange;
  exchangeName: string;
}
export interface IFormUnshieldState {
  isFetchingFee: boolean;
  sellToken: ITokenNetwork;
  buyToken: ITokenNetwork;

  // Native Token -> PRV
  networkFee: number;
  networkFeeToken: string;
  isUseBurnFeeLevel1: boolean;
  userFee: IUserFee | undefined;

  // Swap data
  vaults: any;
  exchangeSupports: ISwapExchangeData[];
  exchangeSelected: string | null;
  errorMsg: string | null;
  swapNetwork: MAIN_NETWORK_NAME;

  isMax: boolean;
}

export interface ISwapFee {
  amount: number;
  tokenId: string;
  amountInBuyToken: string;
}

export interface ISwapExchangeData {
  amountIn: number;
  amountOut: number;
  amountOutRaw: number;
  appName: SwapExchange;
  exchangeName: string;
  fees: ISwapFee[];
  routes: string | string[];
  incTokenID: string;
  feeAddress: string;
  callContract: string;
  callData: string;
  networkID: number;
  feeAddressShardID: number;
  poolPairs: string[];
  expectedAmount: string;
  rate: string;
  impactAmount: number | null;
  tradePathStr: string;
  groupPaths?: ISwapExchangeData[];
  isInterSwap: boolean;
  interSwapData?: {
    midOTA: string;
    midToken: string;
    isInterFistBatchPDex: boolean;
    pdexMinAcceptableAmount: string;
    pAppName: string;
    pAppNetwork: string;
    path: {
      logoIcon: string;
      tradePath: string | string[];
      exchangeName: string;
    }[];
  };
}

export interface UnshieldSetTokenPayLoad {
  sellToken?: ITokenNetwork;
  buyToken?: ITokenNetwork;
}

export interface UnshieldSetTokenAction extends Action {
  type: FormUnshieldActionType.SET_TOKEN;
  payload: UnshieldSetTokenPayLoad;
}

export interface UnshieldSetUserFeePayLoad {
  fee: IUserFee | undefined;
}

export interface UnshieldSetUserFeeAction extends Action {
  type: FormUnshieldActionType.SET_USER_FEE;
  payload: UnshieldSetUserFeePayLoad;
}

export interface UnshieldFetchingUserFeePayLoad {
  isFetchingFee: boolean;
  isResetForm?: boolean;
}

export interface UnshieldSetFetchingUserFeeAction extends Action {
  type: FormUnshieldActionType.FETCHING_FEE;
  payload: UnshieldFetchingUserFeePayLoad;
}

export interface UnshieldResetUserFeeAction extends Action {
  type: FormUnshieldActionType.RESET_FEE;
}

/*
  Swap actions
*/
export interface SwapSetVaultsAction extends Action {
  type: FormUnshieldActionType.SET_VAULTS;
  payload: any;
}

export interface SwapSetExchangeSupportsAction extends Action {
  type: FormUnshieldActionType.SET_SWAP_EXCHANGE_SUPPORT;
  payload: any;
}

export interface SwapSetExchangeSelectedAction extends Action {
  type: FormUnshieldActionType.SET_SWAP_EXCHANGE_SELECTED;
  payload: any;
}

export interface SwapSetEstimateTradeErrorMsg extends Action {
  type: FormUnshieldActionType.SET_ERROR_MSG;
  payload: any;
}

export interface SwapSetNetwork extends Action {
  type: FormUnshieldActionType.SET_SWAP_NETWORK;
  payload: any;
}

export interface FreeSwapFormAction extends Action {
  type: FormUnshieldActionType.FREE_SWAP_FORM;
}

export interface SetIsMaxAction extends Action {
  type: FormUnshieldActionType.SET_IS_MAX;
  payload: boolean;
}

export type FormUnshieldActions =
  // Unshield action
  | UnshieldSetTokenAction
  | UnshieldSetUserFeeAction
  | UnshieldSetFetchingUserFeeAction
  | UnshieldResetUserFeeAction
  // Swap action
  | SwapSetVaultsAction
  | SwapSetExchangeSupportsAction
  | SwapSetExchangeSelectedAction
  | SwapSetEstimateTradeErrorMsg
  | SwapSetNetwork
  | FreeSwapFormAction
  | SetIsMaxAction;
