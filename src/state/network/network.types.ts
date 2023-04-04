import { ServerModel } from 'pages/IncWebWallet/services/wallet/Server';
import { Action } from 'redux';

export type NetworkInfo = {
  currentNetwork: ServerModel;
};

export enum NetworkActionType {
  CHANGE = 'REDUX_SYNC_STORAGE/NETWORK/CHANGE',
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------

export interface ChangeNetworkAction extends Action {
  type: NetworkActionType.CHANGE;
  payload: {
    currentNetwork: ServerModel;
  };
}

//----------------------------------------------

export type NetworkActions = ChangeNetworkAction;

export default {};
