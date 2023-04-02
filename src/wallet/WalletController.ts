import store from 'state';
import { defaultAccountWalletSelector } from 'state/account/account.selectors';
import { genETHAccFromOTAKey, makeSignature } from 'utils/pDao';

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
    const {
      isSignAndSendTransaction,
      fee,
      tokenID,
      txType,
      version,
      prvPayments,
      tokenPayments,
      metadata,
      info,
      pDaoData,
    } = req;

    let tx: any;
    let pDaoSignature: any = {};
    let ethWalletInfo: any = {};
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

      if (pDaoData && metadata && metadata?.Type === 338 && !metadata?.RemoteAddress) {
        const otaKey = await accountSender?.getOTAKey();
        const genETHAccFromOTAKeyPayload =
          pDaoData?.transactionType === 'CREATE_PROPOSAL'
            ? pDaoData?.createProposalInfo
            : pDaoData?.voteProposalInfo?.proposal;
        ethWalletInfo = await genETHAccFromOTAKey(otaKey, genETHAccFromOTAKeyPayload);
        req.params.metadata.RemoteAddress = ethWalletInfo.address;
        req.params.receiverAddress = ethWalletInfo.address;
      }

      if (isSignAndSendTransaction) {
        tx = await accountSender.createAndSignTransaction({ ...params, tokenPayments: _tokenPayments });
      } else {
        tx = await accountSender.createTransaction({ ...params, tokenPayments: _tokenPayments });
      }

      if (pDaoData) {
        // Make pDao Signature
        const privateKey = Buffer.from(ethWalletInfo.privateKey, 'hex');
        const pDaoTransactionType: 'CREATE_PROPOSAL' | 'VOTE' = pDaoData.transactionType;

        pDaoSignature = {
          createPropSignature:
            pDaoTransactionType === 'CREATE_PROPOSAL'
              ? await makeSignature(1, pDaoData.createProposalInfo, privateKey)
              : '',
          propVoteSignature: await makeSignature(2, pDaoData.voteProposalInfo, privateKey),
          reShieldSignature: await makeSignature(
            3,
            {
              burnTX: tx?.txHash.startsWith('0x') ? tx?.txHash?.slice(2) : tx.txHash,
            },
            privateKey
          ),
        };
      }
    } catch (error) {
      console.log('CREATE TRANSACTION ERROR: ', error);
    }

    if (tx && (tx.hash || tx.txId)) {
      return { txHash: tx.hash || tx.txId, rawData: tx.rawTx || tx.rawData, pDaoSignature };
    } else {
      return new Error('Create Transaction failed');
    }
  }
}

export {};
