import { measure } from 'utils/func';

const { Validator } = require('incognito-chain-web-js/build/wallet');

class ScanCoinService {
  static async scan({ accountWallet, tokenList }: { accountWallet: any; tokenList: any }) {
    new Validator('[ScanCoinService][scan]-accountWallet', accountWallet).required().object();
    new Validator('[ScanCoinService][scan]-tokenList', tokenList).required().array();
    try {
      const { elapsed, result } = await measure(accountWallet, 'scanCoins', {
        tokenList,
      });
      return { elapsed, result };
    } catch (e) {
      console.log('[ScanCoinService][scan] ERROR ', e);
      throw e;
    }
  }
  static async isFinishScan({ accountWallet }: { accountWallet: any }) {
    // new Validator('[ScanCoinService][isFinishScan]-accountWallet', accountWallet).required().object();
    let result = true;
    try {
      const coinsStore = await accountWallet.getStorageCoinsScan();
      if (!coinsStore || !coinsStore.finishScan) result = false;
    } catch (e) {
      console.log('[ScanCoinService][isFinishScan] ERROR ', e);
      result = false;
      throw e;
    } finally {
      return result;
    }
  }
}

export default ScanCoinService;
