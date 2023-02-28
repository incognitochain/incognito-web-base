import { measure } from 'utils/func';

const { Validator } = require('incognito-chain-web-js/build/wallet');

class ScanCoinService {
  static async scan({ accountSender, tokenList }: { accountSender: any; tokenList: any }) {
    new Validator('[ScanCoinService][scan]-accountSender', accountSender).required().object();
    new Validator('[ScanCoinService][scan]-tokenList', tokenList).required().array();
    try {
      const { elapsed, result } = await measure(accountSender, 'scanCoins', {
        tokenList,
      });
      return { elapsed, result };
    } catch (e) {
      console.log('[ScanCoinService][scan] ERROR ', e);
      throw e;
    }
  }
  static async isFinishScan({ accountSender }: { accountSender: any }) {
    // new Validator('[ScanCoinService][isFinishScan]-accountSender', accountSender).required().object();
    let result = true;
    try {
      const coinsStore = await accountSender.getStorageCoinsScan();
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
