import store from 'state';
import { defaultAccountWalletSelector } from 'state/account/account.selectors';

import { WalletType } from './types';

const { createNewCoins } = require('incognito-chain-web-js/build/web/wallet');

export class WalletController {
  static instance: WalletController = WalletController.getIntance();
  private walletType: WalletType = 'WalletWeb';
  private wallet: any; //Instance Wallet from SDK or anywhere

  //DJ
  private constructor() {
    this.wallet = undefined; // init default
    this.walletType = 'WalletWeb'; // init default
    return this;
  }

  static getIntance(): WalletController {
    if (!WalletController.instance) {
      WalletController.instance = new WalletController();
    }
    return WalletController.instance;
  }

  setWallet(wallet: any) {
    this.wallet = wallet;
  }

  getWallet(): any {
    return this.wallet;
  }

  setWalletType(walletType: WalletType) {
    this.walletType = walletType;
  }

  getWalletType(): WalletType {
    return this.walletType;
  }

  get isWalletExtension(): boolean {
    return !!(this.walletType === 'WalletExtension');
  }

  get isWalletWeb(): boolean {
    return !!(this.walletType === 'WalletWeb');
  }

  async requestAccount(req: any) {
    let resp: any = {};
    let result: any = {};
    try {
      const accountSender = defaultAccountWalletSelector(store.getState());
      const otaReceiver = await accountSender?.getOTAReceive();
      const burnerAddress = await accountSender?.getBurnerAddress2();
      let otaReceiverWithCfg;
      if (req.params && req.params?.senderShardID !== undefined) {
        otaReceiverWithCfg = await accountSender?.getOTAReceiveWithCfg({
          senderShardID: req.params?.senderShardID,
        });
      }
      result.otaReceiver = otaReceiver;
      result.burnerAddress = burnerAddress;
      result.otaReceiverWithCfg = otaReceiverWithCfg;
      const paymentAddress = accountSender.getPaymentAddress();
      result.newCoins = await createNewCoins(paymentAddress);
      resp.result = result;
      return resp;
    } catch (error) {
      console.log(error);
    }
  }

  async signTransaction(req: any) {
    const { isSignAndSendTransaction, fee, tokenID, txType, version, prvPayments, tokenPayments, metadata, info } = req;

    let tx: any;
    try {
      const accountSender = defaultAccountWalletSelector(store.getState());
      const params = {
        fee,
        tokenID,
        txType,
        version,
        prvPayments,
        tokenPayments,
        metadata,
        info,
      };
      let _tokenPayments = tokenPayments;
      if (!_tokenPayments || _tokenPayments.length === 0) {
        _tokenPayments = null;
      }
      if (isSignAndSendTransaction) {
        tx = await accountSender.createAndSignTransaction({ ...params, tokenPayments: _tokenPayments });
      } else {
        tx = await accountSender.createTransaction({ ...params, tokenPayments: _tokenPayments });
      }
    } catch (error) {
      console.log('CREATE TRANSACTION ERROR: ', error);
    }

    if (tx && (tx.hash || tx.txId)) {
      return { txHash: tx.hash || tx.txId, rawData: tx.rawTx || tx.rawData };
    } else {
      return new Error('Create Transaction failed');
    }
  }
}

export {};
