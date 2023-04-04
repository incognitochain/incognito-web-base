import CONSTANT_COMMONS from 'pages/IncWebWallet/constants/common';
import { getAccountWallet } from 'pages/IncWebWallet/services/wallet/wallet.shared';
import { createSelector } from 'reselect';
import { defaultAccountName, defaultAccountSelector } from 'state/account/account.selectors';
import { RootState } from 'state/index';
import { walletSelector } from 'state/webWallet/webWallet.selectors';

export const isGettingBalance = createSelector(
  (state: RootState) => state?.webToken?.isGettingBalance,
  (state: RootState) => state?.account?.isGettingBalance,
  defaultAccountName,
  (tokens, accounts, defaultAccountName) => {
    const isLoadingAccountBalance = accounts?.includes(defaultAccountName);
    const result = [...tokens];
    return isLoadingAccountBalance ? [...result, CONSTANT_COMMONS.PRV.id] : result;
  }
);

export const getDefaultAccountWalletSelector = createSelector(
  defaultAccountSelector,
  walletSelector,
  (account, wallet) => getAccountWallet(account, wallet)
);

export default {
  isGettingBalance,
  getDefaultAccountWalletSelector,
};
