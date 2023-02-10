import { WalletType } from './types';

class WalletController {
  private walletType: WalletType = 'WalletWebsite';
  private wallet: any; //Instance Wallet from SDK or anywhere

  //DJ
  constructor(wallet?: any, walletType?: WalletType) {
    this.wallet = wallet;
    this.walletType = walletType || 'WalletWebsite';
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

  isWalletExtension(): boolean {
    return !!(this.walletType === 'WalletExtension');
  }

  isWalletWebsite(): boolean {
    return !!(this.walletType === 'WalletWebsite');
  }
}

const walletExtensionInstalled: any = window.incognito;
const waleltTypeInit: WalletType = walletExtensionInstalled ? 'WalletExtension' : 'WalletWebsite';
const walletController = new WalletController(null, waleltTypeInit); //SP

console.log('WalletController ', walletController);

export default walletController;
