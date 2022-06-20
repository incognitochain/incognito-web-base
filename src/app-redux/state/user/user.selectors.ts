import { IRootState } from '@src/app-redux/interface';
import { createSelector } from 'reselect';

const userSelectors = createSelector(
  (state: IRootState) => state.user,
  (user) => user,
);

const walletBackfilledSelector = createSelector(
  userSelectors,
  (user) => user.selectedWalletBackfilled,
);

const selectedWalletSelector = createSelector(
  userSelectors,
  (user) => user.selectedWallet,
);

export { selectedWalletSelector, userSelectors, walletBackfilledSelector };
