import Server, { ServerModel } from 'pages/IncWebWallet/services/wallet/Server';
import { Reducer } from 'redux';

import { NetworkActions, NetworkActionType } from './network.types';

export interface NetworkReducerState {
  currentNetwork: ServerModel;
}

const initialState: NetworkReducerState = {
  currentNetwork: Server.getDefault(),
};

export const reducer: Reducer<NetworkReducerState, NetworkActions> = (
  state = initialState,
  action: NetworkActions
): NetworkReducerState => {
  switch (action.type) {
    case NetworkActionType.CHANGE: {
      return { ...state, currentNetwork: action.payload.currentNetwork };
    }
    default:
      return state;
  }
};
