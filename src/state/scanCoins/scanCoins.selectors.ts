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

const isFetchingScanCoinsSelector = createSelector(scanCoinsReducerSelector, ({ isFetching }) => isFetching);

// Undefined => Unknow
// isScanning = true
// isScanning = false

const getScanningCoinStatusByCurrentAccount = createSelector(
  webWalletStateSelector,
  statusScanCoinsSelector,
  defaultAccountOTAKeySelector,
  getCurrentNetworkSelector,
  (walletState, scanStatus, OTAkey, network) => {
    if (!network || !OTAkey) return undefined;
    const key = `${OTAkey}-${network.address}`;
    if (!key || !scanStatus[key]) return undefined;
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

    //(network or OTAkey ) is undefinied | null => return FALSE ==> Not Show Popup Confirm Scan Scoin
    if (!network || !OTAkey) return false;

    //Not Unlock Wallet  ==> Not Show Popup Confirm Scan Scoin => return FALSE
    if (walletState !== WalletState.unlocked) return false;
    const key = `${OTAkey}-${network.address}`;

    //scanStatus[key] != undefinied, that mean is scanned exist => return FALSE ==> Not Show Popup Confirm Scan Scoin
    if (scanStatus && scanStatus[key]) return false;

    //Otherwise, return TRUE ==> Show Popup
    return true;
  }
);

export {
  getKeySelector,
  getScanningCoinStatusByCurrentAccount,
  isFetchingScanCoinsSelector,
  isShowConfirmScanCoins,
  scanCoinsReducerSelector,
  statusScanCoinsSelector,
};
