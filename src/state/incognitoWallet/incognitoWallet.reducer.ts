import { Reducer } from 'redux';
import { IncognitoWalletActions, IncognitoWalletActionType } from 'state/incognitoWallet/incognitoWallet.types';

export type WalletState = 'uninitialized' | 'locked' | 'unlocked';
export type AccountInfo = {
  paymentAddress: string;
  keyDefine: string;
  balances: any[];
};

interface IncognitoWalletReducer {
  walletState: WalletState;
  accounts: AccountInfo[];
}

const initialState: IncognitoWalletReducer = {
  walletState: 'uninitialized',
  accounts: [],
};

export const reducer: Reducer<IncognitoWalletReducer, IncognitoWalletActions & any> = (
  state = initialState,
  action: IncognitoWalletActions
): IncognitoWalletReducer => {
  switch (action.type) {
    case IncognitoWalletActionType.GET_STATE: {
      return state;
    }

    case IncognitoWalletActionType.SET_STATE: {
      const { walletState = 'locked' } = action.payload;
      return {
        ...state,
        walletState,
      };
    }

    case IncognitoWalletActionType.SET_ACCOUNTS: {
      const { accounts = [] } = action.payload;
      return {
        ...state,
        accounts: [...accounts],
      };
    }

    case IncognitoWalletActionType.REQUEST_ACCOUNTS: {
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
