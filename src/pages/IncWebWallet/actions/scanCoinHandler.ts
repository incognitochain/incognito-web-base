import BigNumber from 'bignumber.js';
import { uniq, uniqBy } from 'lodash';
import Server, { TESTNET_FULLNODE } from 'pages/IncWebWallet/services/wallet/Server';
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

import { IBalance } from '../core/types';
import ScanCoinService from '../services/scainCoinService';

let scanCoinInterval: any = undefined;
let counterFetchingCoins: any = 0;
const maxCounterFetchingCoins: any = 6;

const { PrivacyVersion } = require('incognito-chain-web-js/build/web/wallet');

const MAINNET_TOKEN: any[] = [
  '3ee31eba6376fc16cadb52c8765f20b6ebff92c0b1c5ab5fc78c8c25703bb19e', //-> pETH
  '076a4423fa20922526bd50b0d7b0dc1c593ce16e15ba141ede5fb5a28aa3f229', //-> pUSDT
  '545ef6e26d4d428b16117523935b6be85ec0a63e8c2afeb0162315eb0ce3d151', //-> pUSDC
  '0d953a47a7a488cee562e64c80c25d3dbe29d3b477ccd2b54408c0553a93f126', //-> pDAI
  '26df4d1bca9fd1a8871a24b9b84fc97f3dd62ca8809975c6d971d1b79d1d9f31', //-> MATIC
  'b832e5d3b1f01a4f0623f7fe91d6673461e1f5d37d91fe78c5c2e6183ff39696',
  'e5032c083f0da67ca141331b6005e4a3740c50218f151a5e829e9d03227e33e2',
  'c01e7dc1d1aba995c19b257412340b057f8ad1482ccb6a9bb0adce61afbf05d4',
];

const TESTNET_TOKEN: any[] = [
  'ebc1c1b5819aa5647192aefd729ef18cd8894d22656e8add678c0aef93e404d4', // -> FTM
  'b366fa400c36e6bbcf24ac3e99c90406ddc64346ab0b7ba21e159b83d938812d', // -> ETH
  '6fa448f24835b0c72e62004edf391679fdbc391a82e4edb3726d16251509a2d0', // -> USDC
  '50092f46f3f9dcebd3176de97c936950977bcc52a22eebb2863b8e4d24261434', // -> DAI
  'b35756452dc1fa1260513fa121c20c2b516a8645f8d496fa4235274dac0b1b52', // -> LINK
  'c3af83ad2e7b9e040a73a2b9334f9a9664cd1266462f75b6ba84f36139cdf3c6', // -> BNB
  'f5d88e2e3c8f02d6dc1e01b54c90f673d730bef7d941aeec81ad1e1db690961f', // -> MATIC
  '3a526c0fa9abfc3e3e37becc52c5c10abbb7897b0534ad17018e766fc6133590', // -> USDT
  'ffd8d42dc40a8d166ea4848baf8b5f6e9fe0e9c30d60062eb7d44a8df9e00854',
  '4584d5e9b2fc0337dfb17f4b5bb025e5b82c38cfa4f54e8a3d4fcdd03954ff82',
  '9fca0a0947f4393994145ef50eecd2da2aa15da2483b310c2c0650301c59b17d',
  'c01e7dc1d1aba995c19b257412340b057f8ad1482ccb6a9bb0adce61afbf05d4',
];

// export const getDefaultFollowTokensBalance = async (): Promise<{
//   balance: IBalance[];
//   OTAKey: string;
// }> => {
//   const tokens = await getTokensDefault();
//   const { accountSender, keyDefine } = await getAccountInstanceAndKeyDefine();
//   if (!accountSender || !keyDefine) return { balance: [], OTAKey: '' };

//   // if scanning coin get default balances else get from FollowTokens
//   const coinsStore = await accountSender.getStorageCoinsScan();
//   const isFinishScan = coinsStore && coinsStore.finishScan;
//   if (!isFinishScan) {
//     return { balance: tokens.map((token) => ({ amount: '0', id: token, swipable: true })) as IBalance[], OTAKey: '' };
//   }

//   const { balance }: { balance: IBalance[] } = await accountSender.getFollowTokensBalance({
//     defaultTokens: tokens,
//     version: PrivacyVersion.ver3,
//   });
//   const _balance = uniqBy(balance, 'id');
//   return { balance: _balance, OTAKey: keyDefine };
// };

export const getTokensDefault = async () => {
  const server = await Server.getDefault();
  let isMainnet = true;
  if (server && server.address === TESTNET_FULLNODE) isMainnet = false;

  return isMainnet ? MAINNET_TOKEN : TESTNET_TOKEN;
};

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

    const tokenList = uniq(tokens.concat(_followTokens));
    const { elapsed, result } = await ScanCoinService.scan({ accountSender, tokenList });

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
