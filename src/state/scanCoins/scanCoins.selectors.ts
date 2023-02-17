import { WalletState } from 'core/types';
import { createSelector } from 'reselect';
import { defaultAccountOTAKeySelector } from 'state/account/account.selectors';
import { RootState } from 'state/index';
import { webWalletStateSelector } from 'state/masterKey';
import { getCurrentNetworkSelector } from 'state/network';

const scanCoinsReducerSelector = createSelector(
  (state: RootState) => state.scanCoinsReducer,
  (scanCoinsReducer) => scanCoinsReducer
);

const statusScanCoinsSelector = createSelector(scanCoinsReducerSelector, ({ scanStatus }) => scanStatus);

const isFetchingScanCoinsSelector = createSelector(scanCoinsReducerSelector, ({ isFetching }) => isFetching);

const isFirstTimeScanCoinsSelector = createSelector(
  webWalletStateSelector,
  statusScanCoinsSelector,
  defaultAccountOTAKeySelector,
  getCurrentNetworkSelector,
  (walletState, scanStatus, OTAkey, network) => {
    if (!network || !OTAkey) return false;
    const key = `${OTAkey}-${network.address}`;
    if (!key || !scanStatus[key] || walletState !== WalletState.unlocked) return false;
    return scanStatus[key].isScanning;
  }
);

const isShowConfirmScanCoins = createSelector(
  webWalletStateSelector,
  statusScanCoinsSelector,
  defaultAccountOTAKeySelector,
  getCurrentNetworkSelector,
  (walletState, scanStatus, OTAkey, network) => {
    if (!network || !OTAkey) return false;
    const key = `${OTAkey}-${network.address}`;
    if (walletState !== WalletState.unlocked) return false;
    return key && (!scanStatus || scanStatus[key] === undefined);
  }
);

export {
  isFetchingScanCoinsSelector,
  isFirstTimeScanCoinsSelector,
  isShowConfirmScanCoins,
  scanCoinsReducerSelector,
  statusScanCoinsSelector,
};
