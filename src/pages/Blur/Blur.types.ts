import { Action } from 'redux';

import { ICollection, IToken } from './Blur.interface';
import { IResToken } from './Blur.interface';

export enum BlurActionType {
  SET_COLLECTIONS = 'BLUR/SET_COLLECTIONS',

  SET_RES_TOKEN = 'BLUR/SET_RES_TOKEN',
  SET_MORE_TOKENS = 'BLUR/SET_MORE_TOKENS',
  SET_MORE_LOADING_TOKENS = 'BLUR/SET_MORE_LOADING_TOKENS',
}

export interface IBlurReducer {
  isFetching: boolean;
  collections: ICollection[];
  resToken?: IResToken;
}

export interface SetCollectionsAction extends Action {
  type: BlurActionType.SET_COLLECTIONS;
  payload: ICollection[];
}

export interface SetResTokenAction extends Action {
  type: BlurActionType.SET_RES_TOKEN;
  payload: IResToken;
}

export interface SetMoreTokensAction extends Action {
  type: BlurActionType.SET_MORE_TOKENS;
  payload: IToken[];
}

export interface SetMoreLoadingTokensAction extends Action {
  type: BlurActionType.SET_MORE_LOADING_TOKENS;
  payload: IToken[];
}

export type BlurActions = SetCollectionsAction | SetResTokenAction | SetMoreTokensAction | SetMoreLoadingTokensAction;
