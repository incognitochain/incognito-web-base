import { AccountInfo } from './incognitoWallet.reducer';
import { IncognitoWalletActionType, IncognitoWalletSetAccountAction } from './incognitoWallet.types';

const incognitoWalletSetAccount = (accounts: AccountInfo[]): IncognitoWalletSetAccountAction => ({
  type: IncognitoWalletActionType.SET_ACCOUNTS,
  payload: {
    accounts,
  },
});

export { incognitoWalletSetAccount };
