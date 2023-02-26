import { uniq } from 'lodash';
import store from 'state';
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
  const { accountSender, keyDefine } = await BalanceHandler.getAccountInstanceAndKeyDefine();
  const state = store.getState();
  const isFetching = isFetchingScanCoinsSelector(state);
  let coinsStore;
  if (!accountSender) return;
  coinsStore = await accountSender.getStorageCoinsScan();
  const isFinishScan = coinsStore && coinsStore.finishScan;

  console.log('ABCD ', {
    isFinishScan,
    isFetching,
    keyDefine,
  });
  if (isFinishScan && isFetching && keyDefine) {
    if (counterFetchingCoins > maxCounterFetchingCoins) {
      await store.dispatch(actionFetchingScanCoins({ isFetching: false }));
      counterFetchingCoins = 0;
      return;
    }
    counterFetchingCoins++;
  }

  // console.log("SCAN COINS: 222 ", { isFetching });
  // Validate data
  if (!accountSender || isFetching || !keyDefine) return;

  try {
    const otaKey = accountSender.getOTAKey();
    const _followTokens = (await accountSender.getListFollowingTokens()) || [];
    // Get coins scanned from storage, existed ignore and continue scan
    if (!isFinishScan) {
      await store.dispatch(actionFistTimeScanCoins({ isScanning: true, otaKey: keyDefine }));
    }

    await store.dispatch(actionFetchingScanCoins({ isFetching: true }));

    const tokens = await BalanceHandler.getTokensDefault();
    console.log('tokens: ', tokens);
    // console.log("SCAN COINS::: ");
    // start scan coins

    const tokenList = uniq(tokens.concat(_followTokens));
    const { elapsed, result } = await ScanCoinService.scan({ accountSender, tokenList });
    console.log('bbb: ', { elapsed, result });
    await store.dispatch(actionFistTimeScanCoins({ isScanning: false, otaKey: keyDefine }));
    counterFetchingCoins = 0;
    // if (!isFinishScan) {
    //   await BalanceHandler.getFollowTokensBalance();
    // }
    await BalanceHandler.getFollowTokensBalance();
    console.log('scanCoins: ', { elapsed, otaKey, coins: result });
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

const startScan = async (params?: any) => {
  if (params) {
    const { isClear } = params;
    if (isClear) {
      await clearScan();
    }
  }
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
          }, 15000);
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

const ScanCoinHanlder = {
  clearScan,
  startScan,
};

export { clearScan, startScan };
export default ScanCoinHanlder;
