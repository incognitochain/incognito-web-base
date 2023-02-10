import { Reducer } from 'redux';

import { WalletAction, WalletActionType } from './webWallet.types';

export interface WebWalletStateAction {
  listAccount?: () => any;
  getAccountIndexByName?: (accountName?: string) => any;
}
export interface WebWalletState extends WebWalletStateAction {
  AuthToken: any;
  IsBIP44: boolean;
  IsMasterless: boolean;
  MasterAccount: any;
  Mnemonic: string;
  Name: string;
  Network: string;
  PassPhrase: string;
  PortalService: string;
  PrivacyVersion: number;
  PubsubService: string;
  RootName: string;
  RpcApiService: string;
  RpcClient: string;
  RpcCoinService: string;
  RpcRequestService: string;
  Seed: any;
  Storage: any;
  UseLegacyEncoding: boolean;
  deletedAccountIds: any[];
  measureStorage: any;
}

const initialState: WebWalletState = {
  AuthToken: '',
  IsBIP44: false,
  IsMasterless: false,
  MasterAccount: undefined,
  Mnemonic: '',
  Name: '',
  Network: '',
  PassPhrase: '',
  PortalService: '',
  PrivacyVersion: 0,
  PubsubService: '',
  RootName: '',
  RpcApiService: '',
  RpcClient: '',
  RpcCoinService: '',
  RpcRequestService: '',
  Seed: undefined,
  Storage: '',
  UseLegacyEncoding: false,
  deletedAccountIds: [],
  measureStorage: undefined,
};

export const reducer: Reducer<WebWalletState, WalletAction> = (
  state = initialState,
  action: WalletAction
): WebWalletState => {
  switch (action.type) {
    case WalletActionType.SET:
      return action.data;
    case WalletActionType.REMOVE:
      return initialState;
    default:
      return state;
  }
};
