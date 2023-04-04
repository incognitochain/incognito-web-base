import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { Action } from 'redux';

export enum FollowTokenSelectedType {
  SET_TOKEN_ID = 'FollowTokenSelected/SET_TOKENID',
  SET_TOKEN = 'FollowTokenSelected/SET_TOKEN',
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------

export interface SetFollowTokenSelectedByTokenIDAction extends Action {
  type: FollowTokenSelectedType.SET_TOKEN_ID;
  payload: {
    tokenID: string;
  };
}

export interface SetFollowTokenSelectedByTokenAction extends Action {
  type: FollowTokenSelectedType.SET_TOKEN;
  payload: {
    token: SelectedPrivacy;
  };
}

//----------------------------------------------

export type FollowTokenSelectedAction = SetFollowTokenSelectedByTokenIDAction | SetFollowTokenSelectedByTokenAction;
