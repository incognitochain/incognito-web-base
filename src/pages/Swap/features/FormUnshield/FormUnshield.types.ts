import { ITokenNetwork } from 'models/model/pTokenModel';
import { Action } from 'redux';
import { IEstimateFee } from 'services/rpcClient';

export enum FormUnshieldActionType {
  SET_TOKEN = 'FORM_UNSHIELD/SET_TOKEN',
  FETCHING_FEE = 'FORM_UNSHIELD/FETCHING_FEE',
  SET_USER_FEE = 'FORM_UNSHIELD/SET_USER_FEE',
}

export interface IFormUnshieldState {
  isFetchingFee: boolean;
  sellToken: ITokenNetwork;
  buyToken: ITokenNetwork;

  // Native Token -> PRV
  networkFee: number;
  networkFeeToken: string;

  isUseBurnFeeLevel1: boolean;
  userFee: IEstimateFee | undefined;
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
  fee: IEstimateFee | undefined;
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

export type FormUnshieldActions = UnshieldSetTokenAction | UnshieldSetUserFeeAction | UnshieldSetFetchingUserFeeAction;
