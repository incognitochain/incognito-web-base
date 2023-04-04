import { createSelector } from 'reselect';

export const webWalletSelector = createSelector(
  (state: any) => state.webWallet,
  (webWallet: any) => webWallet
);
