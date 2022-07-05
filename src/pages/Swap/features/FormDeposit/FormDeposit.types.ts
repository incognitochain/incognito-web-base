import { MAIN_NETWORK_NAME } from '../../../../constants';

export enum FormDepositActionType {
  FETCHING_ESTIMATE_FEE = 'FORM_DEPOSIT/FETCHING_ESTIMATE_FEE',
  SET_ESTIMATE_FEE = 'FORM_DEPOSIT/SET_ESTIMATE_FEE',
}

export interface IFormDepositReducer {
  isFetching: boolean;
  sellToken: {
    tokenID: string;
    currencyType: number;
    chainID: number;
    networkName: MAIN_NETWORK_NAME;
  };
  buyToken: {
    tokenID: string;
    currencyType: number;
    networkName: MAIN_NETWORK_NAME;
  };
}

export type FormDepositActions = any;
