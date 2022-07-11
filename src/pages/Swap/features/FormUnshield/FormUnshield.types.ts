import { ITokenNetwork } from 'models/model/pTokenModel';
import { Action } from 'redux';

export enum FormDepositActionType {
  SET_TOKEN = 'FORM_DEPOSIT/SET_TOKEN',
}

export interface IFormUnshieldReducer {
  isFetching: boolean;
  sellToken: ITokenNetwork;
  buyToken: ITokenNetwork;
}

export interface UnshieldSetTokenPayLoad {
  sellToken?: ITokenNetwork;
  buyToken?: ITokenNetwork;
}

export interface UnshieldSetTokenAction extends Action {
  type: FormDepositActionType.SET_TOKEN;
  payload: UnshieldSetTokenPayLoad;
}

export type FormUnshieldActions = UnshieldSetTokenAction;
