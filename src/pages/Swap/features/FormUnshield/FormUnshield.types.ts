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

export interface SwapSetTokenPayLoad {
  sellToken?: ITokenNetwork;
  buyToken?: ITokenNetwork;
}

export interface SwapSetTokenAction extends Action {
  type: FormDepositActionType.SET_TOKEN;
  payload: SwapSetTokenPayLoad;
}

export type FormUnshieldActions = SwapSetTokenAction;
