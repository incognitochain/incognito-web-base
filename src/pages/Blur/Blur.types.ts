import { Action } from 'redux';

import { ICollection, IToken } from './Blur.interface';

export enum BlurActionType {
  SET_FETCHING_COLLECTION = 'BLUR/SET_FETCHING_COLLECTION',
  SET_COLLECTIONS = 'BLUR/SET_COLLECTIONS',

  SET_TOKENS = 'BLUR/SET_TOKENS',
  APPEND_TOKENS = 'BLUR/APPEND_TOKENS',
  APPEND_LOADING_TOKENS = 'BLUR/SET_MORE_LOADING_TOKENS',
  UPDATE_TOKEN = 'BLUR/UPDATE_TOKEN',
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

export type BlurActions =
  | SetFetchingCollections
  | SetCollectionsAction
  | SetTokensAction
  | AppendTokensAction
  | AppendLoadingTokensAction
  | UpdateTokenAction;
