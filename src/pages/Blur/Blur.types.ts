import { Action } from 'redux';

export enum BlurActionType {
  SET_COLLECTIONS = 'BLUR/SET_COLLECTIONS',
}

export interface IBlurReducer {
  isFetching: boolean;
}

export interface SetCollectionsAction extends Action {
  type: BlurActionType.SET_COLLECTIONS;
}

export type BlurActions = SetCollectionsAction;
