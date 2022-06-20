import { Wallet } from '@connections/connectors';
import {
  IWalletReducer,
  WalletActions,
  WalletActionType,
} from '@connections/state/wallet';
import { createSlice } from '@reduxjs/toolkit';
import { Reducer } from 'redux';

export const initialState: IWalletReducer = {
  errorByWallet: {
    [Wallet.INJECTED]: undefined,
    [Wallet.WALLET_CONNECT]: undefined,
    [Wallet.COINBASE_WALLET]: undefined,
    [Wallet.NETWORK]: undefined,
  },
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateWalletError(
      state,
      {
        payload: { wallet, error },
      }: { payload: { wallet: Wallet; error: string | undefined } },
    ) {
      state.errorByWallet[wallet] = error;
    },
  },
});

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
