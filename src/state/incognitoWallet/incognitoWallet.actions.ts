import { AccountInfo, WalletState } from './incognitoWallet.reducer';
import {
  IncognitoWalletActionType,
  IncognitoWalletSetAccountAction,
  IncognitoWalletSetStateAction,
} from './incognitoWallet.types';

const incognitoWalletSetAccount = (accounts: AccountInfo[]): IncognitoWalletSetAccountAction => ({
  type: IncognitoWalletActionType.SET_ACCOUNTS,
  payload: {
    accounts,
  },
});

const incognitoWalletSetState = (state: WalletState): IncognitoWalletSetStateAction => ({
  type: IncognitoWalletActionType.SET_STATE,
  payload: {
    walletState: state,
  },
});

export { incognitoWalletSetAccount, incognitoWalletSetState };
