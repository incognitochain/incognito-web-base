import BigNumber from 'bignumber.js';
import { uniq, uniqBy } from 'lodash';
import store from 'state';
import { defaultAccountSelector, defaultAccountWalletSelector } from 'state/account/account.selectors';
import { webWalletStateSelector } from 'state/masterKey';
import {
  actionFetchingScanCoins,
  actionFistTimeScanCoins,
  isFetchingScanCoinsSelector,
  isShowConfirmScanCoins,
} from 'state/scanCoins';
import { followTokensFormatedSelector } from 'state/token/token.selectors';
import { measure } from 'utils/func';

import { IBalance } from '../core/types';
import { getTokensDefault } from './scancoin.actions';
const { PrivacyVersion } = require('incognito-chain-web-js/build/web/wallet');

let scanCoinInterval: any = undefined;
let counterFetchingCoins: any = 0;
const maxCounterFetchingCoins: any = 6;

export const getFollowTokensBalance = async () => {
  const state = store.getState();
  const accountData = defaultAccountSelector(state);
  // const isFetching = isFetchingAssetsSelector(state);
  const { accountSender, keyDefine } = await getAccountInstanceAndKeyDefine();
  const isScanningCoins = isFetchingScanCoinsSelector(state);
  // if (!accountSender || isFetching || isScanningCoins) return;
  if (!accountSender || isScanningCoins) return;
  if (!keyDefine) return;
  let isUpdate = false;
  try {
    const tokens = await getTokensDefault();
    // await store.dispatch(actionFetchingFollowBalance({ isFetching: true }));
    const oldTokens = followTokensFormatedSelector(state);
    const { balance: newTokens }: { balance: IBalance[] } = await accountSender.getFollowTokensBalance({
      defaultTokens: tokens,
      version: PrivacyVersion.ver3,
    });
    const _newTokens = uniqBy(newTokens, 'id');
    isUpdate = newTokens.some(({ amount: newAmount, id }) => {
      const token = oldTokens.find((token) => token.tokenID === id);
      if (!token) return true;
      const oldAmount = token.amount;
      return !new BigNumber(oldAmount || 0).eq(newAmount || 0); // is new amount
    });
    const coinsStore = await accountSender.getStorageCoinsScan();
    console.log('LOAD BALANCE: ', { newTokens, oldTokens, tokens, coinsStore }, isUpdate);
    if (isUpdate) {
      // await store.dispatch(actionFetchedFollowBalance({ balance: _newTokens, OTAKey: keyDefine }));
    }
    return {
      keyDefine,
      balances: _newTokens,
      paymentAddress: accountData.PaymentAddress,
    };
  } catch (error) {
    console.log('LOAD FOLLOW TOKENS BALANCE ERROR: ', error);
  } finally {
    // await store.dispatch(actionFetchingFollowBalance({ isFetching: false }));
  }
};

/**
 * @keyDefine [string] format =>  OTAKey-Network.address
 * @returns {Promise<boolean | { accountSender: any; keyDefine: string }>}
 */
export const getAccountInstanceAndKeyDefine = async (): Promise<{ accountSender?: any; keyDefine?: string }> => {
  const state = store.getState();
  const accountData = defaultAccountSelector(state);
  if (!accountData || !accountData.PrivateKey) return {};
  const accountSender = defaultAccountWalletSelector(state);
  let keyDefine = '';
  try {
    if (accountSender?.rpc?.rpcHttpService?.url) {
      keyDefine = `${accountSender.getOTAKey()}-${accountSender?.rpc?.rpcHttpService?.url}`;
    }
  } catch (e) {
    console.log('getAccountInstanceAndKeyDefine ERROR ', e);
    return {};
  }
  return { accountSender, keyDefine };
};

export const scanCoins = async () => {
  const { accountSender, keyDefine } = await getAccountInstanceAndKeyDefine();
  // console.log("SCAN COINS: 111 ", { accountSender, keyDefine, reduxSyncStorage });
  const state = store.getState();
  const isFetching = isFetchingScanCoinsSelector(state);
  let coinsStore;
  if (!accountSender) return;
  coinsStore = await accountSender.getStorageCoinsScan();
  const isFinishScan = coinsStore && coinsStore.finishScan;
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

    const tokens = await getTokensDefault();

    // console.log("SCAN COINS::: ");
    // start scan coins
    const { elapsed, result } = await measure(accountSender, 'scanCoins', {
      tokenList: uniq(tokens.concat(_followTokens)),
    });

    await store.dispatch(actionFistTimeScanCoins({ isScanning: false, otaKey: keyDefine }));
    counterFetchingCoins = 0;
    if (!isFinishScan) {
      await getFollowTokensBalance();
    }

    console.log('scanCoins: ', { elapsed, otaKey, coins: result });
  } catch (error) {
    console.log('SCAN COINS WITH ERROR: ', error);
  } finally {
    await store.dispatch(actionFetchingScanCoins({ isFetching: false }));
  }
};

const clearScanCoins = async () => {
  await store.dispatch(actionFetchingScanCoins({ isFetching: false }));
  scanCoinInterval && clearInterval(scanCoinInterval);
  scanCoinInterval = undefined;
};

const scanCoinHandler = async (params: any) => {
  if (params) {
    const { isClear } = params;
    if (isClear) {
      await store.dispatch(actionFetchingScanCoins({ isFetching: false }));
      return clearScanCoins();
    }
  }
  const state = store.getState();
  const showConfirmScanCoins = isShowConfirmScanCoins(state);
  const walletState = webWalletStateSelector(state);

  // console.log("SCAN COINS: scanCoinHandler ", { showConfirmScanCoins, popupStateData });
  if (walletState === 'unlocked') {
    if (!scanCoinInterval && !showConfirmScanCoins) {
      try {
        await store.dispatch(actionFetchingScanCoins({ isFetching: false }));
        scanCoins().finally(() => {
          scanCoinInterval = setInterval(async () => {
            try {
              const state = store.getState();
              if (state.account.list.length === 0) {
                scanCoinInterval && clearInterval(scanCoinInterval);
                scanCoinInterval = null;
                return;
              }
              scanCoins().then();
            } catch (e) {
              console.log(' 1 SCAN COINS ERROR: ', e);
              // Handle error
            }
          }, 15000);
        });
      } catch (e) {
        // Handle error
        console.log('2 SCAN COINS ERROR: ', e);
      }
    }
  } else {
    clearScanCoins();
  }
};

export { clearScanCoins, scanCoinHandler };
