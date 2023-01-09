import { Action } from 'redux';

import { ICollection } from './Blur.interface';

export enum BlurActionType {
  SET_COLLECTIONS = 'BLUR/SET_COLLECTIONS',
}

export interface IBlurReducer {
  isFetching: boolean;
  collections: ICollection[];
}

export interface SetCollectionsAction extends Action {
  type: BlurActionType.SET_COLLECTIONS;
  payload: ICollection[];
}

export type BlurActions = SetCollectionsAction;
