import { uniq } from 'lodash';
import store from 'state';
import { defaultAccountWalletSelector } from 'state/account/account.selectors';
import { webWalletStateSelector } from 'state/masterKey';
import { actionFetchingScanCoins, actionFistTimeScanCoins, isFetchingScanCoinsSelector } from 'state/scanCoins';
import { StorageManager } from 'storage';

import { COINS_INDEX_STORAGE_KEY } from '../components/ScanCoinsProgressBar/ScanCoinsProgressBar';
import ScanCoinService from '../services/scainCoinService';
import BalanceHandler from './balanceHandler';

let scanCoinInterval: any = undefined;
let counterFetchingCoins: any = 0;
const maxCounterFetchingCoins: any = 6;

const scanCoins = async () => {
  const state = store.getState();
  const isFetching = isFetchingScanCoinsSelector(state);
  const currentAccount = defaultAccountWalletSelector(state);

  if (!currentAccount) return;

  const { keyDefine } = await BalanceHandler.getKeyDefine({ account: currentAccount });

  if (!keyDefine) return;

  const isFinishScan = await ScanCoinService.isFinishScan({ accountWallet: currentAccount });

  if (isFinishScan && isFetching && keyDefine) {
    if (counterFetchingCoins > maxCounterFetchingCoins) {
      await store.dispatch(actionFetchingScanCoins({ isFetching: false }));
      counterFetchingCoins = 0;
      return;
    }
    counterFetchingCoins++;
  }

  if (!currentAccount || isFetching || !keyDefine) return;

  try {
    const otaKey = currentAccount.getOTAKey();
    const _followTokens = (await currentAccount.getListFollowingTokens()) || [];

    // Get coins scanned from storage, existed ignore and continue scan
    if (!isFinishScan) {
      await store.dispatch(actionFistTimeScanCoins({ isScanning: true, otaKey: keyDefine }));
    }

    await store.dispatch(actionFetchingScanCoins({ isFetching: true }));

    const tokens = await BalanceHandler.getTokenIDsDefault();
    // console.log("SCAN COINS::: ");
    // start scan coins

    const tokenList = uniq(tokens.concat(_followTokens));

    // ------------------------------------------------------------
    // Waitting load scan coin from WebJS., Update Balance after this job has been finished!?
    // Humh.....
    // ------------------------------------------------------------

    const { elapsed, result } = await ScanCoinService.scan({ accountWallet: currentAccount, tokenList });

    await store.dispatch(actionFistTimeScanCoins({ isScanning: false, otaKey: keyDefine }));
    counterFetchingCoins = 0;

    console.log('[scanCoins] FINSIHED: ', { elapsed, otaKey, coins: result });
  } catch (error) {
    console.log('SCAN COINS WITH ERROR: ', error);
  } finally {
    await store.dispatch(actionFetchingScanCoins({ isFetching: false }));
    stopScan();
  }
};

const clearScan = async () => {
  const state = store.getState();
  const currentAccount = defaultAccountWalletSelector(state);

  if (!currentAccount) return;
  const { keyDefine } = await BalanceHandler.getKeyDefine({ account: currentAccount });
  if (!keyDefine) return;

  await StorageManager.removeItem(COINS_INDEX_STORAGE_KEY);
  await stopScan();
  await currentAccount.clearStorageCoinsScan();
};

const stopScan = async () => {
  await store.dispatch(actionFetchingScanCoins({ isFetching: false }));
  scanCoinInterval && clearInterval(scanCoinInterval);
  scanCoinInterval = undefined;
};

const startScan = async () => {
  const state = store.getState();
  const walletState = webWalletStateSelector(state);

  if (walletState !== 'unlocked') {
    stopScan();
  }

  if (!scanCoinInterval) {
    try {
      scanCoins().finally(() => {
        scanCoinInterval = setInterval(async () => {
          try {
            const state = store.getState();
            if (state.account.list.length === 0) {
              await stopScan();
              return;
            }
            scanCoins().then();
          } catch (e) {
            console.log(' 1 SCAN COINS ERROR: ', e);
            throw e;
          }
        }, 5000);
      });
    } catch (e) {
      console.log('2 SCAN COINS ERROR: ', e);
      throw e;
    }
  }
};

const reScan = async () => {};

const ScanCoinHanlder = {
  reScan,
  clearScan,
  stopScan,
  startScan,
};

export default ScanCoinHanlder;
