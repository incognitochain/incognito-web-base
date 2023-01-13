import { Action } from 'redux';

import { ICollection, IToken, PBlurBuyFee } from './Blur.interface';

export enum BlurActionType {
  SET_FETCHING_COLLECTION = 'BLUR/SET_FETCHING_COLLECTION',
  SET_COLLECTIONS = 'BLUR/SET_COLLECTIONS',

  SET_TOKENS = 'BLUR/SET_TOKENS',
  APPEND_TOKENS = 'BLUR/APPEND_TOKENS',
  APPEND_LOADING_TOKENS = 'BLUR/SET_MORE_LOADING_TOKENS',
  UPDATE_TOKEN = 'BLUR/UPDATE_TOKEN',
  SET_SELECTED_TOKEN_ID = 'BLUR/SET_SELECTED_TOKEN_ID',
  CLEAR_SELECTED_TOKEN_IDS = 'BLUR/CLEAR_SELECTED_TOKEN_IDS',
  SELECT_MAX_BUY_TOKENS = 'BLUR/SELECT_MAX_BUY_TOKENS',
  SET_ESTIMATED_FEE = 'BLUR/SET_ESTIMATED_FEE',
}

export interface IBlurReducer {
  isFetching: boolean;
  collection: {
    list: ICollection[];
    isFetching: boolean;
    hasError: boolean;
  };
  token: {
    list: IToken[];
    isEstimating: boolean;
    fee?: PBlurBuyFee;
    selectedTokenIds: string[];
  };
}

export interface SetFetchingCollections extends Action {
  type: BlurActionType.SET_FETCHING_COLLECTION;
  payload: { isFetching: boolean };
}

export interface SetCollectionsAction extends Action {
  type: BlurActionType.SET_COLLECTIONS;
  payload: ICollection[];
}

export interface SetTokensAction extends Action {
  type: BlurActionType.SET_TOKENS;
  payload: IToken[];
}

export interface AppendTokensAction extends Action {
  type: BlurActionType.APPEND_TOKENS;
  payload: IToken[];
}

export interface AppendLoadingTokensAction extends Action {
  type: BlurActionType.APPEND_LOADING_TOKENS;
  payload: IToken[];
}

export interface UpdateTokenAction extends Action {
  type: BlurActionType.UPDATE_TOKEN;
  payload: IToken;
}

export interface SetSelectedTokenIdAction extends Action {
  type: BlurActionType.SET_SELECTED_TOKEN_ID;
  payload: string;
}

export interface ClearSelectedTokenIdsAction extends Action {
  type: BlurActionType.CLEAR_SELECTED_TOKEN_IDS;
}

export interface SelectMaxBuyTokensAction extends Action {
  type: BlurActionType.SELECT_MAX_BUY_TOKENS;
}

export interface ISetEstimatedFeePayload {
  isEstimating: boolean;
  fee?: PBlurBuyFee;
}

export interface SetEstimatedFeeAction extends Action {
  type: BlurActionType.SET_ESTIMATED_FEE;
  payload: ISetEstimatedFeePayload;
}

export type BlurActions =
  | SetFetchingCollections
  | SetCollectionsAction
  | SetTokensAction
  | AppendTokensAction
  | AppendLoadingTokensAction
  | SetSelectedTokenIdAction
  | ClearSelectedTokenIdsAction
  | SelectMaxBuyTokensAction
  | UpdateTokenAction
  | SetEstimatedFeeAction;
