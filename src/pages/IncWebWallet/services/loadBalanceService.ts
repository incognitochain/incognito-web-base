import { IBalance } from '../core/types';
const { PrivacyVersion } = require('incognito-chain-web-js/build/web/wallet');
const { Validator } = require('incognito-chain-web-js/build/wallet');

class LoadBalanceService {
  static async getBalance({
    accountWallet,
    defaultTokens,
    version = PrivacyVersion.ver3,
  }: {
    accountWallet: any;
    defaultTokens: any[];
    version?: number;
  }) {
    new Validator('[LoadBalanceService][getBalance]-accountWallet', accountWallet).required().object();
    new Validator('[LoadBalanceService][getBalance]-defaultTokens', defaultTokens).required().array();
    try {
      const { balance }: { balance: IBalance[] } = await accountWallet.getFollowTokensBalance({
        defaultTokens,
        version,
      });
      return balance;
    } catch (e) {
      console.log('[LoadBalanceService][getBalance] ERROR ', e);
      throw e;
    }
  }
}

export default LoadBalanceService;
