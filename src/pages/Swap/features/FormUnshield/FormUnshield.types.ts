import { ITokenNetwork } from 'models/model/pTokenModel';
import { Action } from 'redux';
import { IUserFee } from 'services/rpcClient';

export enum FormUnshieldActionType {
  SET_TOKEN = 'FORM_UNSHIELD/SET_TOKEN',
  FETCHING_FEE = 'FORM_UNSHIELD/FETCHING_FEE',
  SET_USER_FEE = 'FORM_UNSHIELD/SET_USER_FEE',
  RESET_FEE = 'FORM_UNSHIELD/RESET_FEE',
}

export interface IFormUnshieldState {
  isFetchingFee: boolean;
  sellToken: ITokenNetwork;
  buyToken: ITokenNetwork;

  // Native Token -> PRV
  networkFee: number;
  networkFeeToken: string;

  isUseBurnFeeLevel1: boolean;
  userFee: IUserFee | undefined;
}

export interface UnshieldSetTokenPayLoad {
  sellToken?: ITokenNetwork;
  buyToken?: ITokenNetwork;
}

export interface UnshieldSetTokenAction extends Action {
  type: FormUnshieldActionType.SET_TOKEN;
  payload: UnshieldSetTokenPayLoad;
}

export interface UnshieldSetUserFeePayLoad {
  fee: IUserFee | undefined;
}

export interface UnshieldSetUserFeeAction extends Action {
  type: FormUnshieldActionType.SET_USER_FEE;
  payload: UnshieldSetUserFeePayLoad;
}

export interface UnshieldFetchingUserFeePayLoad {
  isFetchingFee: boolean;
}

export interface UnshieldSetFetchingUserFeeAction extends Action {
  type: FormUnshieldActionType.FETCHING_FEE;
  payload: UnshieldFetchingUserFeePayLoad;
}

export interface UnshieldResetUserFeeAction extends Action {
  type: FormUnshieldActionType.RESET_FEE;
}

export type FormUnshieldActions =
  | UnshieldSetTokenAction
  | UnshieldSetUserFeeAction
  | UnshieldSetFetchingUserFeeAction
  | UnshieldResetUserFeeAction;
