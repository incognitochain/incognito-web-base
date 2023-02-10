import { uniq } from 'lodash';
import store from 'state';
import { defaultAccountWalletSelector } from 'state/account/account.selectors';
import { webWalletStateSelector } from 'state/masterKey';
import {
  actionFetchingScanCoins,
  actionFistTimeScanCoins,
  isFetchingScanCoinsSelector,
  isShowConfirmScanCoins,
} from 'state/scanCoins';

import ScanCoinService from '../services/scainCoinService';
import BalanceHandler from './balanceHandler';

let scanCoinInterval: any = undefined;
let counterFetchingCoins: any = 0;
const maxCounterFetchingCoins: any = 6;

export const scanCoins = async () => {
  const state = store.getState();
  const isFetching = isFetchingScanCoinsSelector(state);
  const currentAccount = defaultAccountWalletSelector(state);

  if (!currentAccount) return;

  const { keyDefine } = await BalanceHandler.getKeyDefine({ account: currentAccount });

  if (!keyDefine) return;

  const isFinishScan = await ScanCoinService.isFinishScan({ accountWallet: currentAccount });

  // console.log('[scanCoins] ===== ', {
  //   isFinishScan,
  //   isFetching,
  //   keyDefine,
  //   counterFetchingCoins,
  // });
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
    // if (!isFinishScan) {
    //   await BalanceHandler.getFollowTokensBalance();
    // }
    await BalanceHandler.getFollowTokensBalance();

    console.log('[scanCoins] FINSIHED: ', { elapsed, otaKey, coins: result });
  } catch (error) {
    console.log('SCAN COINS WITH ERROR: ', error);
  } finally {
    await store.dispatch(actionFetchingScanCoins({ isFetching: false }));
  }
};

const clearScan = async () => {
  await store.dispatch(actionFetchingScanCoins({ isFetching: false }));
  scanCoinInterval && clearInterval(scanCoinInterval);
  scanCoinInterval = undefined;
};

const startScan = async () => {
  const state = store.getState();
  const showConfirmScanCoins = isShowConfirmScanCoins(state);
  const walletState = webWalletStateSelector(state);
  if (walletState === 'unlocked') {
    if (!scanCoinInterval && !showConfirmScanCoins) {
      try {
        // await store.dispatch(actionFetchingScanCoins({ isFetching: false }));
        scanCoins().finally(() => {
          scanCoinInterval = setInterval(async () => {
            try {
              const state = store.getState();
              if (state.account.list.length === 0) {
                await clearScan();
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
        // Handle error
        console.log('2 SCAN COINS ERROR: ', e);
        throw e;
      }
    }
  } else {
    clearScan();
  }
};

const reScan = async () => {};

const ScanCoinHanlder = {
  reScan,
  clearScan,
  startScan,
};

export default ScanCoinHanlder;
