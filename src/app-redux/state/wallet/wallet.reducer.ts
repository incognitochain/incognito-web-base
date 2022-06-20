import { Wallet } from '@connections/connectors';
import {
  IWalletReducer,
  WalletActions,
  WalletActionType,
} from '@src/app-redux/state/wallet/index';
import { Reducer } from 'redux';

export const initialState: IWalletReducer = {
  errorByWallet: {
    [Wallet.INJECTED]: undefined,
    [Wallet.WALLET_CONNECT]: undefined,
    [Wallet.NETWORK]: undefined,
  },
};

export const reducer: Reducer<IWalletReducer, WalletActions> = (
  state = initialState,
  action: WalletActions,
) => {
  switch (action.type) {
    case WalletActionType.UPDATE_WALLET_ERROR: {
      // Update wallet error
      const { wallet, error } = action.payload;
      return {
        ...state,
        errorByWallet: {
          ...state.errorByWallet,
          [wallet]: error,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
