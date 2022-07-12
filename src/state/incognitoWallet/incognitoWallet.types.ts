import { Action } from 'redux';

import { AccountInfo, WalletState } from './incognitoWallet.reducer';

export enum IncognitoWalletActionType {
  GET_STATE = 'INCOGNITO_WALLET/GET_STATE',
  SET_STATE = 'INCOGNITO_WALLET/SET_STATE',

  SET_ACCOUNTS = 'INCOGNITO_WALLET/SET_ACCOUNTS',
  REQUEST_ACCOUNTS = 'INCOGNITO_WALLET/REQUEST_ACCOUNTS',
}

export interface IncognitoWalletGetStateAction extends Action {
  type: IncognitoWalletActionType.GET_STATE;
  payload: any;
}

export interface IncognitoWalletSetStateAction extends Action {
  type: IncognitoWalletActionType.SET_STATE;
  payload: {
    walletState: WalletState;
  };
}

export interface IncognitoWalletSetAccountAction extends Action {
  type: IncognitoWalletActionType.SET_ACCOUNTS;
  payload: {
    accounts: AccountInfo[];
  };
}

export interface IncognitoRequestAccountsAction extends Action {
  type: IncognitoWalletActionType.REQUEST_ACCOUNTS;
  payload: any;
}

export type IncognitoWalletActions =
  | IncognitoWalletGetStateAction
  | IncognitoWalletSetStateAction
  | IncognitoWalletSetAccountAction
  | IncognitoRequestAccountsAction;
