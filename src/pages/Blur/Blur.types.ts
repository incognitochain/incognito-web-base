import { Action } from 'redux';

import { ICollection, IToken } from './Blur.interface';

export enum BlurActionType {
  SET_FETCHING_COLLECTION = 'BLUR/SET_FETCHING_COLLECTION',
  SET_COLLECTIONS = 'BLUR/SET_COLLECTIONS',

  SET_TOKENS = 'BLUR/SET_TOKENS',
  SET_MORE_TOKENS = 'BLUR/SET_MORE_TOKENS',
  SET_MORE_LOADING_TOKENS = 'BLUR/SET_MORE_LOADING_TOKENS',
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

export interface SetResTokenAction extends Action {
  type: BlurActionType.SET_TOKENS;
  payload: IToken[];
}

export interface SetMoreTokensAction extends Action {
  type: BlurActionType.SET_MORE_TOKENS;
  payload: IToken[];
}

export interface SetMoreLoadingTokensAction extends Action {
  type: BlurActionType.SET_MORE_LOADING_TOKENS;
  payload: IToken[];
}

export type BlurActions =
  | SetFetchingCollections
  | SetCollectionsAction
  | SetResTokenAction
  | SetMoreTokensAction
  | SetMoreLoadingTokensAction;
