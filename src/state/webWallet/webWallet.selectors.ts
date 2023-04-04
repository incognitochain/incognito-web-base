import { createSelector } from 'reselect';
import { RootState } from 'state/index';

export const walletSelector = createSelector(
  (state: RootState) => state.webWallet,
  (wallet) => wallet
);
