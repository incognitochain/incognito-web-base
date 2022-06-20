import { Wallet } from '@connections/connectors';
import { WalletActionType } from '@connections/state/wallet';
import { Action } from 'redux';

//----------------------------------------------
// Reducer Payload
//----------------------------------------------
export interface IWalletReducer {
  errorByWallet: Record<Wallet & any, string | undefined>;
}

//----------------------------------------------
// Payload Definition here!
//----------------------------------------------
export interface UpdateWalletErrorPayload {
  wallet: Wallet;
  error: string | undefined;
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------
export interface UpdateWalletErrorAction extends Action {
  type: WalletActionType.UPDATE_WALLET_ERROR;
  payload: UpdateWalletErrorPayload;
}

//-----------------------------------
export type WalletActions = UpdateWalletErrorAction;
