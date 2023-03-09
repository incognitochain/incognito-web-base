import { WalletType } from './types';

class WalletController {
  private walletType: WalletType = 'WalletWeb';
  private wallet: any; //Instance Wallet from SDK or anywhere

  //DJ
  constructor(wallet?: any, walletType?: WalletType) {
    this.wallet = wallet;
    this.walletType = walletType || 'WalletWeb';
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
}

const walletExtensionInstalled: any = window.incognito;
const waleltTypeInit: WalletType = walletExtensionInstalled ? 'WalletExtension' : 'WalletWeb';
const walletController = new WalletController(null, waleltTypeInit); //SP

console.log('WalletController ', walletController);

export default walletController;
