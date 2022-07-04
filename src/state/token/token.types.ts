import PToken from 'models/model/pTokenModel';
import { Action } from 'redux';

export enum TokenActionType {
  FETCHING = 'TOKEN/FETCHING',
  SET_PTOKEN = 'TOKEN/SET_PTOKEN',
  SET_TOKEN_BY_NETWORK = 'TOKEN/SET_TOKEN_BY_NETWORK',
  SET_TOKEN_BY_SYMBOL = 'TOKEN/SET_TOKEN_BY_SYMBOL',
}

interface ITokenPayload {
  [key: string]: PToken;
}

export interface ITokenReducer {
  isFetching: boolean;
  pTokens: ITokenPayload;
  depositable: PToken[];
}

export interface TokenSetPayLoad {
  pTokens: ITokenPayload;
  depositable: PToken[];
}

export interface TokenFetchingPayLoad {
  isFetching: boolean;
}

export interface TokenSetAction extends Action {
  type: TokenActionType.SET_PTOKEN;
  payload: TokenSetPayLoad;
}

export interface TokenFetchingAction extends Action {
  type: TokenActionType.FETCHING;
  payload: TokenFetchingPayLoad;
}

export type TokenActions = TokenSetAction | TokenFetchingAction;
