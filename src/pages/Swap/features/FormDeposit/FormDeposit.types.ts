import { ITokenNetwork } from 'models/model/pTokenModel';
import { Action } from 'redux';

export enum FormDepositActionType {
  SET_TOKEN = 'FORM_DEPOSIT/SET_TOKEN',
}

export interface IFormDepositReducer {
  isFetching: boolean;
  sellToken: ITokenNetwork;
  buyToken: ITokenNetwork;
}

export interface DepositSetTokenPayLoad {
  sellToken?: ITokenNetwork;
  buyToken?: ITokenNetwork;
}

export interface DepositSetTokenAction extends Action {
  type: FormDepositActionType.SET_TOKEN;
  payload: DepositSetTokenPayLoad;
}

export type FormDepositActions = DepositSetTokenAction;
