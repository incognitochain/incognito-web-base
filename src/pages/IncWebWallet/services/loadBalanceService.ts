import { Account } from '../core';
import { TokenID } from '../core/token';
import { BalanceObject } from '../core/types';

const { PrivacyVersion } = require('incognito-chain-web-js/build/web/wallet');
const { Validator } = require('incognito-chain-web-js/build/web/wallet');

class LoadBalanceService {
  static async getBalance({
    accountWallet,
    defaultTokens,
    version = PrivacyVersion.ver3,
  }: {
    accountWallet: Account;
    defaultTokens: TokenID[];
    version?: number;
  }): Promise<BalanceObject[]> {
    new Validator('[LoadBalanceService][getBalance]-accountWallet', accountWallet).required().object();
    new Validator('[LoadBalanceService][getBalance]-defaultTokens', defaultTokens).required().array();
    try {
      const { balance } = await accountWallet.getFollowTokensBalance({
        defaultTokens,
        version,
      });
      return balance;
    } catch (error) {
      console.log('[LoadBalanceService][getBalance] ERROR ', error);
      return [];
    }
  }

  static async getListFollowingTokens({ accountWallet }: { accountWallet: Account }): Promise<TokenID[]> {
    new Validator('[LoadBalanceService][getBalance]-accountWallet', accountWallet).required().object();
    let tokenIDList: TokenID[];
    try {
      tokenIDList = await accountWallet.getListFollowingTokens();
    } catch (error) {
      console.log('[LoadBalanceService][getBalance] ERROR ', error);
      tokenIDList = [];
    }
    return tokenIDList;
  }
}

export default LoadBalanceService;
