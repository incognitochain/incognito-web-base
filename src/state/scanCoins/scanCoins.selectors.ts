import { WalletState } from 'pages/IncWebWallet/core/types';
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

//Format: [OTAKey]-[CurrentNetworkURL]
const getKeySelector = createSelector(defaultAccountOTAKeySelector, getCurrentNetworkSelector, (OTAkey, network) => {
  if (!OTAkey || !network) return undefined;
  return `${OTAkey}-${network.address}`;
});

const isExistScanSelector = createSelector(statusScanCoinsSelector, getKeySelector, (scanStatus, key) => {
  if (!scanStatus || !key) return false;
  if (!scanStatus[key]) return false;
  return true;
});
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
    // console.log('[isShowConfirmScanCoins] ', {
    //   network,
    //   OTAkey,
    //   walletState,
    //   scanStatus,
    // });
    if (!network || !OTAkey) return false;
    if (!walletState && walletState !== WalletState.unlocked) return false;
    const key = `${OTAkey}-${network.address}`;
    if (!scanStatus || !scanStatus[key]) return true;
    return false;
  }
);

export {
  getKeySelector,
  isFetchingScanCoinsSelector,
  isFirstTimeScanCoinsSelector,
  isShowConfirmScanCoins,
  scanCoinsReducerSelector,
  statusScanCoinsSelector,
};
