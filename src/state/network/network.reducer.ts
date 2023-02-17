import { Reducer } from 'redux';
import Server, { ServerModel } from 'services/wallet/Server';

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
