import { ITokenNetwork } from 'models/model/pTokenModel';
import { Action } from 'redux';

export enum FormUnshieldActionType {
  SET_TOKEN = 'FORM_UNSHIELD/SET_TOKEN',
}

export interface IFormUnshieldState {
  isFetching: boolean;
  sellToken: ITokenNetwork;
  buyToken: ITokenNetwork;

  // Native Token -> PRV
  networkFee: number;
  networkFeeToken: string;

  // Token | PRV
  burnFee: number;
  burnFeeToken: string;
  userFee: any;
}

export interface UnshieldSetTokenPayLoad {
  sellToken?: ITokenNetwork;
  buyToken?: ITokenNetwork;
}

export interface UnshieldSetTokenAction extends Action {
  type: FormUnshieldActionType.SET_TOKEN;
  payload: UnshieldSetTokenPayLoad;
}

export type FormUnshieldActions = UnshieldSetTokenAction;
