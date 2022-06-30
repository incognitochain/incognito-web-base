import PToken from 'models/model/pTokenModel';
import { Action } from 'redux';

export enum TokenActionType {
  SET_PTOKEN = 'TOKEN/SET_PTOKEN',
  SET_TOKEN_BY_NETWORK = 'TOKEN/SET_TOKEN_BY_NETWORK',
  SET_TOKEN_BY_SYMBOL = 'TOKEN/SET_TOKEN_BY_SYMBOL',
}

interface ITokenPayload {
  [key: string]: PToken;
}

export interface ITokenReducer {
  pTokens: ITokenPayload;
}

export interface TokenSetPayLoad {
  pTokens: ITokenPayload;
}

export interface TokenSetAction extends Action {
  type: TokenActionType.SET_PTOKEN;
  payload: TokenSetPayLoad;
}

export type TokenActions = TokenSetAction;
