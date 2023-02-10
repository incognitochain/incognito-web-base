/* eslint-disable @typescript-eslint/ban-types */
export enum WalletState {
  locked = 'locked',
  unlocked = 'unlocked',
  uninitialized = 'uninitialized',
}

export type BalanceObject = {
  amount: string; //Balance, Nano
  id: string; //TokenID
  swipable: boolean; //Can Delete on UI
};

type WalletStructSDK = {
  PassPhrase: string;
  Mnemonic: string;
  MasterAccount: any;
  Name: string; //$[NetworkName]-master-[name], Ex.. ($mainnet-master-abc)
  Seed: any;
  Storage: any;
  Network: string;
  measureStorage: any;
  IsMasterless: boolean;
  RootName: string; //Shorten Name. Ex.. (abc)
  RpcClient: string;
  RpcCoinService: string;
  PrivacyVersion: number;
  UseLegaceEncoding: boolean;
  PubsubService: string;
  RpcRequestService: string;
  AuthToken: string;
  RpcApiService: string;
  PortalService: string;
  IsBIP44: boolean;
  deletedAccountIds: any[];
};

type WalletMethods = {
  save(aesKey?: string): void;
  import(mnemonic: string, aesKey: string, name: string, storage: any): void;
  listAccountNoCache(): Promise<any>;
};

export type WalletSDK = WalletStructSDK & WalletMethods;

export type AsyncFunction<Args = void, Output = void> = (...args: Args[]) => Promise<Output>;
