import { createSelector } from '@reduxjs/toolkit';
import { AppState } from 'state';

export const incognitoWalletSelector = createSelector(
  (state: AppState) => state.incognitoWallet,
  (incognitoWallet) => incognitoWallet
);

export const incognitoWalletAccountsSelector = createSelector(
  (state: AppState) => state.incognitoWallet,
  (incognitoWallet) => incognitoWallet.accounts
);

export const incognitoWalletAccountSelector = createSelector(incognitoWalletAccountsSelector, (incAccounts) => {
  if (!incAccounts || incAccounts.length === 0) return undefined;
  return incAccounts[0];
});

export const incognitoAccountFollowTokenIDs = createSelector(incognitoWalletAccountSelector, (incAccount) => {
  if (!incAccount) return [];
  return incAccount.balances.map(({ id }) => id);
});

export const incognitoWalletStateSelector = createSelector(
  (state: AppState) => state.incognitoWallet,
  (incognitoWallet) => incognitoWallet.walletState
);
