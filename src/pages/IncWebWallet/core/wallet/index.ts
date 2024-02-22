import { Method, Object } from '../object';

abstract class WalletSDK extends Object {}

type WalletProperty = {
  PassPhrase: string;
  Mnemonic: string;
  MasterAccount: any;
  Name: string;
  Seed: string;
  Network: string;
  Storage: any;
  measureStorage: any;
  IsMasterless: boolean;
  RootName: string;
};

interface WalletMethod extends Method {
  configWallet(passPhrase: string, storage: any, name: string, mnemonic: string, network: string): void | Error;
  init(passPhrase: string, storage: any, walletName: string, accountName: string): Promise<void | Error>;
  import(mnemonic: string, passPhrase: string, name: string, storage: any): Promise<void | Error>;
  loadWallet(passPhrase: { password: string; aesKey: string }): Promise<void | Error>;
}

type Wallet = WalletSDK & WalletProperty & WalletMethod;

export type { Wallet, WalletMethod, WalletProperty, WalletSDK };
