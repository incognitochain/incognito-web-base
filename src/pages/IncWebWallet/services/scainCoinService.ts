import { measure } from 'utils/func';

const { Validator } = require('incognito-chain-web-js/build/wallet');

export default class ScanCoinService {
  static async scan({ accountSender, tokenList }: { accountSender: any; tokenList: any }) {
    new Validator('[ScanCoinService][scan]-accountSender', accountSender).required().object();
    new Validator('[ScanCoinService][scan]-tokenList', tokenList).required().array();
    try {
      const { elapsed, result } = await measure(accountSender, 'scanCoins', {
        tokenList,
      });
      return { elapsed, result };
    } catch (e) {
      throw e;
    }
  }
}
