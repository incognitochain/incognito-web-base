import { Wallet } from '@connections/connectors';
import { UserActionType } from '@src/app-redux/state/user/index';
import { Action } from 'redux';

//----------------------------------------------
// Reducer Payload
//----------------------------------------------
export interface IUserReducer {
  // We want the user to be able to define which wallet they want to use, even if there are multiple connected wallets via web3-react.
  // If a user had previously connected a wallet but didn't have a wallet override set (because they connected prior to this field being added),
  // we want to handle that case by backfilling them manually. Once we backfill, we set the backfilled field to `true`.
  // After some period of time, our active users will have this property set so we can likely remove the backfilling logic.
  selectedWalletBackfilled: boolean;
  selectedWallet?: Wallet;
}

//----------------------------------------------
// Payload Definition here!
//----------------------------------------------
export interface UpdateSelectedWalletPayload {
  wallet: Wallet;
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------
export interface UpdateSelectedWalletAction extends Action {
  type: UserActionType.UPDATE_SELECTED_WALLET;
  payload: UpdateSelectedWalletPayload;
}

//-----------------------------------
export type UserActions = UpdateSelectedWalletAction;
