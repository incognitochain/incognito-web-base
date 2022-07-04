export enum FormDepositActionType {
  FETCHING_ESTIMATE_FEE = 'FORM_DEPOSIT/FETCHING_ESTIMATE_FEE',
  SET_ESTIMATE_FEE = 'FORM_DEPOSIT/SET_ESTIMATE_FEE',
}

export interface IFormDepositReducer {
  isFetching: boolean;
}

export type FormDepositActions = any;
