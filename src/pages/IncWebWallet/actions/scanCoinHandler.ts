import { uniq } from 'lodash';
import store from 'state';
import { defaultAccountWalletSelector, getScanCoinKeySelector } from 'state/account/account.selectors';
import { webWalletStateSelector } from 'state/masterKey';
import {
  actionFetchingScanCoins,
  actionFistTimeScanCoins,
  getScanningCoinStatusByCurrentAccount,
  isFetchingScanCoinsSelector,
} from 'state/scanCoins';
import { StorageManager } from 'storage';

import { COINS_INDEX_STORAGE_KEY } from '../components/ScanCoinsProgressBar/ScanCoinsProgressBar';
import ScanCoinService from '../services/scainCoinService';
import BalanceHandler from './balanceHandler';

let scanCoinInterval: any = undefined;
const INTERVAL_TIME_SCAN_COIN = 5000; //5s

const checkValidToScan = (): boolean => {
  const state = store.getState();

  const currentAccount = defaultAccountWalletSelector(state);
  const walletState = webWalletStateSelector(state);
  const scanCoinKey = getScanCoinKeySelector(state);

  if (!currentAccount) return false;
  if (!walletState || walletState !== 'unlocked') return false;
  if (!scanCoinKey) return false;

  return true;
};

const scanCoins = async () => {
  const state = store.getState();
  const isFetching = isFetchingScanCoinsSelector(state);
  const currentAccount = defaultAccountWalletSelector(state);
  const scanCoinKey = getScanCoinKeySelector(state);
  const isScanningCoin = getScanningCoinStatusByCurrentAccount(state);

  // const isFinishScan = await ScanCoinService.isFinishScan({ accountWallet: currentAccount });

  // console.log('[TAG][scanCoins] ', {
  //   scanCoinKey,
  //   isFetching,
  //   isFinishScan,
  //   isScanningCoin,
  // });

  if (!checkValidToScan()) return;
  if (!scanCoinKey) return;
  if (isFetching) return;

  await store.dispatch(actionFetchingScanCoins({ isFetching: true }));

  try {
    const _followTokens = (await currentAccount.getListFollowingTokens()) || [];
    const tokens = await BalanceHandler.getTokenIDsDefault();
    const tokenList = uniq(tokens.concat(_followTokens));

    //Scan Coin method from WebJS
    await ScanCoinService.scan({ accountWallet: currentAccount, tokenList });

    // isScanning = true => Progoresss Bar (UI)
    // SCAN DONE => update isScanning = FALSE
    if (isScanningCoin) {
      // isScanning is save localStorage with Redux,
      // set isScanning = FALSE => NOT SHOW Progoresss Bar (UI)
      await store.dispatch(actionFistTimeScanCoins({ isScanning: false, otaKey: scanCoinKey }));
    }
  } catch (error) {
    console.log('[scanCoins] ERROR: ', error);
  } finally {
    await store.dispatch(actionFetchingScanCoins({ isFetching: false }));
  }
};

const clearScan = async () => {
  const state = store.getState();
  const currentAccount = defaultAccountWalletSelector(state);

  if (!currentAccount) return;

  //Clear Account's index coin in Local Storage
  await StorageManager.removeItem(COINS_INDEX_STORAGE_KEY);

  //Clear coin have been scanned in Local Storage
  await currentAccount.clearStorageCoinsScan();
};

const stopScan = async () => {
  await store.dispatch(actionFetchingScanCoins({ isFetching: false }));
  scanCoinInterval && clearInterval(scanCoinInterval);
  scanCoinInterval = undefined;
};

const startScan = async () => {
  if (!scanCoinInterval) {
    try {
      scanCoins().finally(() => {
        scanCoinInterval = setInterval(async () => {
          try {
            if (!checkValidToScan()) {
              await stopScan();
              return;
            }
            scanCoins().then();
          } catch (e) {
            console.log('[startScan]1 ==> ERROR: ', e);
            throw e;
          }
        }, INTERVAL_TIME_SCAN_COIN);
      });
    } catch (e) {
      console.log('[startScan]2 ==> ERROR: ', e);
      throw e;
    }
  }
};

const reScan = async () => {};

const loadCoins = async () => {};

const ScanCoinHanlder = {
  reScan,
  clearScan,
  stopScan,
  startScan,
  loadCoins,
};

export default ScanCoinHanlder;
