import { Action } from 'redux';

import { ICollection, IMapTokens, IToken, PnftBuyFee } from './Pnft.interface';

export enum PnftActionType {
  SET_FETCHING_COLLECTION = 'PNFT/SET_FETCHING_COLLECTION',
  SET_COLLECTIONS = 'PNFT/SET_COLLECTIONS',

  SET_TOKENS = 'PNFT/SET_TOKENS',
  APPEND_TOKENS = 'PNFT/APPEND_TOKENS',
  SET_LOADING_TOKENS = 'PNFT/SET_LOADING_TOKENS',
  APPEND_LOADING_TOKENS = 'PNFT/SET_MORE_LOADING_TOKENS',

  UPDATE_TOKEN = 'PNFT/UPDATE_TOKEN',
  SET_SELECTED_TOKEN_ID = 'PNFT/SET_SELECTED_TOKEN_ID',
  CLEAR_SELECTED_TOKEN_IDS = 'PNFT/CLEAR_SELECTED_TOKEN_IDS',
  SELECT_MAX_BUY_TOKENS = 'PNFT/SELECT_MAX_BUY_TOKENS',
  SET_ESTIMATED_FEE = 'PNFT/SET_ESTIMATED_FEE',
  SET_ESTIMATED_FEE_ERROR = 'PNFT/SET_ESTIMATED_FEE_ERROR',
  SET_SELECTED_PRIVACY_TOKEN_ID = 'PNFT/SET_SELECTED_PRIVACY_TOKEN_ID',
  CLEAR_TOKEN_STATE = 'PNFT/CLEAR_TOKEN_STATE',
}

export interface IPnftReducer {
  isFetching: boolean;
  collection: {
    list: ICollection[];
    isFetching: boolean;
    hasError: boolean;
  };
  token: {
    list: IToken[];
    isEstimating: boolean;
    fee?: PnftBuyFee;
    selectedTokenIds: string[];
    collection: ICollection | undefined;
    errorMsg: string;
    selectedPrivacyTokenID: string;
  };
}

export interface SetFetchingCollections extends Action {
  type: PnftActionType.SET_FETCHING_COLLECTION;
  payload: { isFetching: boolean };
}

export interface SetCollectionsAction extends Action {
  type: PnftActionType.SET_COLLECTIONS;
  payload: ICollection[];
}

export interface SetTokensAction extends Action {
  type: PnftActionType.SET_TOKENS;
  payload: IMapTokens;
}

export interface AppendTokensAction extends Action {
  type: PnftActionType.APPEND_TOKENS;
  payload: IToken[];
}

export interface SetLoadingTokensAction extends Action {
  type: PnftActionType.SET_LOADING_TOKENS;
  payload: IToken[];
}

export interface AppendLoadingTokensAction extends Action {
  type: PnftActionType.APPEND_LOADING_TOKENS;
  payload: IToken[];
}

export interface UpdateTokenAction extends Action {
  type: PnftActionType.UPDATE_TOKEN;
  payload: IToken;
}

export interface SetSelectedTokenIdAction extends Action {
  type: PnftActionType.SET_SELECTED_TOKEN_ID;
  payload: string;
}

export interface ClearSelectedTokenIdsAction extends Action {
  type: PnftActionType.CLEAR_SELECTED_TOKEN_IDS;
}

export interface SelectMaxBuyTokensAction extends Action {
  type: PnftActionType.SELECT_MAX_BUY_TOKENS;
}

export interface ISetEstimatedFeePayload {
  isEstimating: boolean;
  fee?: PnftBuyFee;
}

export interface SetEstimatedFeeAction extends Action {
  type: PnftActionType.SET_ESTIMATED_FEE;
  payload: ISetEstimatedFeePayload;
}

export interface SetEstimatedFeeErrorAction extends Action {
  type: PnftActionType.SET_ESTIMATED_FEE_ERROR;
  payload: string;
}

export interface SetSelectedPrivacyTokenIDAction extends Action {
  type: PnftActionType.SET_SELECTED_PRIVACY_TOKEN_ID;
  payload: string;
}

export interface ClearTokenStateAction extends Action {
  type: PnftActionType.CLEAR_TOKEN_STATE;
}

export type PnftActions =
  | SetFetchingCollections
  | SetCollectionsAction
  | SetTokensAction
  | AppendTokensAction
  | SetLoadingTokensAction
  | AppendLoadingTokensAction
  | SetSelectedTokenIdAction
  | ClearSelectedTokenIdsAction
  | SelectMaxBuyTokensAction
  | UpdateTokenAction
  | SetEstimatedFeeAction
  | SetEstimatedFeeErrorAction
  | SetSelectedPrivacyTokenIDAction
  | ClearTokenStateAction;
