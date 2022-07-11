import { createSelector } from '@reduxjs/toolkit';
import { AppState } from 'state';

export const incognitoWalletSelector = createSelector(
  (state: AppState) => state.incognitoWallet,
  (incognitoWallet) => incognitoWallet
);

export const incognitoWalletAccountSelector = createSelector(
  (state: AppState) => state.incognitoWallet,
  (incognitoWallet) => incognitoWallet.accounts
);

export const incognitoWalletStateSelector = createSelector(
  (state: AppState) => state.incognitoWallet,
  (incognitoWallet) => incognitoWallet.walletState
);
