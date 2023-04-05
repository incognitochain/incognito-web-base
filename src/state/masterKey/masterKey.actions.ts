/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import { WalletSDK } from 'pages/IncWebWallet/core/types';
import MasterKeyModel, { DEFAULT_MASTER_KEY, MASTERLESS } from 'pages/IncWebWallet/models/MasterKeyModel';
import { getWalletAccounts } from 'pages/IncWebWallet/services/api/masterKey';
import { clearAllCaches, clearWalletCaches } from 'pages/IncWebWallet/services/cache/cache';
import { ExHandler } from 'pages/IncWebWallet/services/exception';
import accountServices from 'pages/IncWebWallet/services/wallet/accountService';
import {
  cachePassword,
  getPassphrase,
  getPassphraseNoCache,
  savePasspharseToStorage,
} from 'pages/IncWebWallet/services/wallet/passwordService';
import serverService from 'pages/IncWebWallet/services/wallet/Server';
import WalletServices from 'pages/IncWebWallet/services/wallet/walletService';
import { batch } from 'react-redux';
import { AppGetState, AppThunk, AppThunkDispatch, clearReduxStore } from 'state/index';
import {
  currentMasterKeySelector,
  getMasterkeySelector,
  getMasterlessSelector,
  isExistMasterlessWallet,
  masterlessKeyChainSelector,
  noMasterLessSelector,
} from 'state/masterKey/masterKey.selectors';
import {
  ImportMasterKeyPayload,
  InitMasterKeyPayload,
  KeychainType,
  MasterKeySwitchAction,
  SetKeychainType,
} from 'state/masterKey/masterKey.types';
import { reloadWallet, setWallet } from 'state/webWallet/webWallet.actions';
import { walletSelector } from 'state/webWallet/webWallet.selectors';
import { StorageManager } from 'storage';

import { MasterKeyImportAction, MasterKeyRemoveAction } from '.';
import { loadMasterKeysRawData } from './masterKey.reducer';
import {
  CreateMasterKeySuccessAction,
  InitMasterKeySuccessAction,
  MasterKeyActionType,
  MasterKeyLoadAllAccoutsAction,
  MasterKeyLoadAllAction,
  MasterKeyLoadingAllAccountAction,
  MasterKeyLoadingInitAction,
  MasterKeySwitchingAction,
  MasterKeyUpdateAction,
} from './masterKey.types';

const { Validator } = require('incognito-chain-web-js/build/web/wallet');
//--------------------------------------------------------------------
// Pure Functions (Pure Action)
//--------------------------------------------------------------------

export const initMasterKeySuccess = (payload: MasterKeyModel[]): InitMasterKeySuccessAction => ({
  type: MasterKeyActionType.INIT,
  payload,
});

export const createMasterKeySuccess = (newMasterKey: any): CreateMasterKeySuccessAction => ({
  type: MasterKeyActionType.CREATE,
  payload: newMasterKey,
});

export const loadAllMasterKeysSuccess = (payload: MasterKeyModel[]): MasterKeyLoadAllAction => ({
  type: MasterKeyActionType.LOAD_ALL,
  payload,
});

export const loadingInitMasterKey = (newMasterKey: any): MasterKeyLoadingInitAction => ({
  type: MasterKeyActionType.LOADING_INITIAL,
  payload: newMasterKey,
});

export const switchMasterKeySuccess = (masterKeyName: string): MasterKeySwitchAction => ({
  type: MasterKeyActionType.SWITCH,
  payload: masterKeyName,
});

export const removeMasterKeySuccess = (payload: any): MasterKeyRemoveAction => ({
  type: MasterKeyActionType.REMOVE,
  payload,
});

export const switchingMasterKey = (payload: any): MasterKeySwitchingAction => ({
  type: MasterKeyActionType.SWITCHING,
  payload,
});

export const updateMasterKeySuccess = (masterKey: string): MasterKeyUpdateAction => ({
  type: MasterKeyActionType.UPDATE,
  payload: masterKey,
});

export const importMasterKeySuccess = (payload: MasterKeyModel): MasterKeyImportAction => ({
  type: MasterKeyActionType.IMPORT,
  payload,
});

export const actionLoadingAllMasterKeyAccount = (payload: any): MasterKeyLoadingAllAccountAction => ({
  type: MasterKeyActionType.LOADING_ALL_ACCOUNTS,
  payload,
});

export const loadAllMasterKeyAccountsSuccess = (accounts: any): MasterKeyLoadAllAccoutsAction => ({
  type: MasterKeyActionType.LOAD_ALL_ACCOUNTS,
  payload: accounts,
});

export const actionSetKeychainType = (keychainType: any): SetKeychainType => ({
  type: MasterKeyActionType.SET_KEYCHAIN_TYPE,
  payload: keychainType,
});

//--------------------------------------------------------------------
// Async Functions (Async Action - Thunk )
//--------------------------------------------------------------------

const updateNetwork = async () => {
  const currentServer = await serverService.getDefault();
  const isMainnet = currentServer.id === 'mainnet';
  MasterKeyModel.network = isMainnet ? 'mainnet' : 'testnet';
};

export const updateMasterKey = (masterKey: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  dispatch(updateMasterKeySuccess(masterKey));
};

export const masterKeySwitchNetwork = (): AppThunk => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  await updateNetwork();
  // await login();
  const masterKey = currentMasterKeySelector(getState());
  const wallet = masterKey.wallet || {};
  // TO DO (after)

  // await dispatch(loadAllMasterKeys());
  // const masterKey = currentMasterKeySelector(getState());
  // const wallet: any = masterKey.wallet || {};
  // const listAccounts: any = await wallet.listAccountNoCache();

  // let masterAccountInfo = await wallet.MasterAccount.getDeserializeInformationNoCache();

  // const serverAccounts = await getWalletAccounts(masterAccountInfo.PublicKeyCheckEncode);
  // console.log(" masterAccountInfo ", masterAccountInfo);
  // console.log(" serverAccounts ", serverAccounts);
  // for (const account of wallet.MasterAccount.child) {
  //   const accountInfo = await account.getDeserializeInformationNoCache();
  //   console.log("accountInfo ", accountInfo);
  // }
  // const listAccount = (await wallet.listAccount()) || [];

  // batch(() => {
  //   dispatch(setWallet(wallet));
  //   dispatch(setListAccount(listAccounts));
  //   dispatch(setAccount(listAccounts[0]));
  //   dispatch(setDefaultAccount(listAccounts[0]));
  // });
  // batch(async () => {
  //   await dispatch(importMasterKeySuccess(masterKey));
  // });
  return wallet;
};

export const unlockMasterKey =
  (password: string): AppThunk =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    await cachePassword(password);
    await getPassphrase();
    await updateNetwork();

    const servers = await serverService.getServerList();
    if (!servers || servers?.length === 0) {
      await serverService.setDefaultList();
    }
    await dispatch(actionLoadDefaultWallet());
    await dispatch(loadAllMasterKeyAccounts());
    const wallet = walletSelector(getState());
    return wallet;
  };

// Action Init first time for wallet (Only one!)

export const initMasterKey =
  (payload: InitMasterKeyPayload): AppThunk =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    // Clear All Local Data
    StorageManager.clear();
    clearAllCaches();
    dispatch(clearReduxStore());

    const { masterKeyName, mnemonic, password } = payload;
    await cachePassword(password);
    await getPassphrase();
    await updateNetwork();
    // await login();
    const defaultMasterKey = new MasterKeyModel(DEFAULT_MASTER_KEY);
    defaultMasterKey.name = masterKeyName;
    defaultMasterKey.mnemonic = mnemonic;
    const masterKeyWallet: WalletSDK = await WalletServices.importWallet(mnemonic, defaultMasterKey.getStorageName());
    masterKeyWallet.RootName = masterKeyName;

    const masterlessMasterKey = new MasterKeyModel(MASTERLESS);
    const masterlessWallet: WalletSDK = await masterlessMasterKey.loadWallet();
    masterlessWallet.MasterAccount.child = [];

    defaultMasterKey.wallet = masterKeyWallet;

    // console.log("defaultMasterKey : ", defaultMasterKey)
    // console.log("masterlessMasterKey : ", masterlessMasterKey)

    const masterKeysList = [defaultMasterKey, masterlessMasterKey];

    await WalletServices.saveWallet(masterKeyWallet);
    await WalletServices.saveWallet(masterlessWallet);
    // await WalletServices.loadListAccount(masterKeyWallet);
    const { aesKey } = await getPassphraseNoCache();
    await savePasspharseToStorage(aesKey, mnemonic, password);
    dispatch(setWallet(masterKeyWallet));
    batch(async () => {
      await dispatch(initMasterKeySuccess(masterKeysList));
      await dispatch(switchMasterKeySuccess(defaultMasterKey.name));
      await dispatch(reloadWallet());
    });
    return masterKeyWallet;
  };

export const importMasterKey =
  (data: ImportMasterKeyPayload) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    // Clear All Local Data
    StorageManager.clear();
    clearAllCaches();
    dispatch(clearReduxStore());

    const { masterKeyName, mnemonic, password } = data;

    let wallet: WalletSDK;
    await updateNetwork();
    await cachePassword(password);
    await getPassphrase();

    const { aesKey } = await getPassphraseNoCache();

    try {
      const newMasterKey = new MasterKeyModel({
        name: masterKeyName,
        mnemonic,
      });
      wallet = await WalletServices.importWallet(mnemonic, newMasterKey.getStorageName());
      // await WalletServices.loadListAccount(wallet);

      newMasterKey.wallet = wallet;
      newMasterKey.mnemonic = wallet.Mnemonic;
      wallet.RootName = newMasterKey.name;

      const masterlessMasterKey = new MasterKeyModel(MASTERLESS);
      const masterlessWallet: WalletSDK = await masterlessMasterKey.loadWallet();
      masterlessWallet.MasterAccount.child = [];

      await savePasspharseToStorage(aesKey, mnemonic, password);

      const masterKeysList = [newMasterKey, masterlessMasterKey];

      await WalletServices.saveWallet(wallet);
      await WalletServices.saveWallet(masterlessWallet);

      await dispatch(setWallet(wallet));
      batch(async () => {
        await dispatch(initMasterKeySuccess(masterKeysList));
        await dispatch(importMasterKeySuccess(newMasterKey));
        await dispatch(switchMasterKeySuccess(data.masterKeyName));
        await dispatch(loadAllMasterKeyAccounts());
        await dispatch(reloadWallet());
      });
    } catch (error) {
      throw error;
    }
    console.timeEnd('TOTAL_TIME_IMPORT_MASTER_KEY');
    return wallet;
  };

export const loadWallet = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    // await login();
    const servers = await serverService.getServerList();
    if (!servers || servers?.length === 0) {
      await serverService.setDefaultList();
    }
    await dispatch(actionLoadDefaultWallet());
  } catch (error) {
    console.log('[loadWallet]', error);
  }
};

export const actionLoadDefaultWallet = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    await dispatch(loadAllMasterKeys());
    const defaultAccountName = await accountServices.getDefaultAccountName();
    await dispatch(reloadWallet(defaultAccountName));
  } catch (error) {
    throw error;
  }
};

export const loadAllMasterKeys = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    await updateNetwork();
    const masterKeyRawDataList = await loadMasterKeysRawData();
    let masterKeyInstanceList: MasterKeyModel[] = masterKeyRawDataList.map((item) => new MasterKeyModel(item));
    for (let masterKeyInstance of masterKeyInstanceList) {
      try {
        await masterKeyInstance.loadWallet();
      } catch (error) {
        console.log('LOAD WALLET ERROR', error, masterKeyInstance.name);
      }
    }
    await dispatch(loadAllMasterKeysSuccess(masterKeyInstanceList));
  } catch (error) {
    console.log('loadAllMasterKeys error', error);
    throw error;
  }
};
export const switchhingMasterKey = (payload: any) => ({
  type: MasterKeyActionType.SWITCHING,
  payload,
});

export const switchMasterKey =
  (masterKeyName: string, accountName?: string, ignoreReloadWallet = false) =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      new Validator('switchMasterKey-masterKeyName', masterKeyName).required().string();
      new Validator('switchMasterKey-accountName', accountName).string();
      clearWalletCaches();
      dispatch(switchhingMasterKey(true));
      dispatch(switchMasterKeySuccess(masterKeyName));
      if (ignoreReloadWallet) return;
      await dispatch(reloadWallet(accountName));
    } catch (error) {
      throw error;
    } finally {
      dispatch(switchhingMasterKey(false));
    }
  };

export const createMasterKey = (data: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  let newMasterKey: any;
  let wallet: any;

  try {
    newMasterKey = new MasterKeyModel({
      ...data,
    });
    wallet = await WalletServices.importWallet(data.mnemonic, newMasterKey.getStorageName());
    newMasterKey.wallet = wallet;
    newMasterKey.mnemonic = wallet.Mnemonic;
    wallet.RootName = newMasterKey.name;
    await WalletServices.saveWallet(wallet);
    batch(async () => {
      await dispatch(createMasterKeySuccess(newMasterKey));
      await dispatch(switchMasterKeySuccess(data.name));
      dispatch(reloadWallet());
      dispatch(loadAllMasterKeyAccounts());
    });
  } catch (error) {
    throw error;
  }
};

export const createNewMasterlessWallet = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  // console.log('[createNewMasterlessWallet]');
  try {
    const masterlessMasterKey = new MasterKeyModel(MASTERLESS);
    const masterlessWallet: WalletSDK = await masterlessMasterKey.loadWallet();
    masterlessWallet.MasterAccount.child = [];
    masterlessMasterKey.wallet = masterlessWallet;
    await WalletServices.saveWallet(masterlessWallet);
    return masterlessMasterKey;
  } catch (error) {
    throw error;
  }
};

export const loadAllMasterKeyAccounts = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  // console.log('loadAllMasterKeyAccounts.... ');
  await dispatch(actionLoadingAllMasterKeyAccount(true));
  try {
    const state = getState();
    const masterkeyList = noMasterLessSelector(state);

    // Check MesterkeyMasterless is exist?
    const isExistMasterkeyMasterless = isExistMasterlessWallet(state);

    if (!isExistMasterkeyMasterless) {
      // Create New Masterless Wallet!
      const masterlesMasterKey = await dispatch(createNewMasterlessWallet());
      await dispatch(createMasterKeySuccess(masterlesMasterKey));
    }
    const masterlessModel = masterlessKeyChainSelector(state);
    const masterKeysList = [...masterkeyList, masterlessModel];
    let accounts: any = [];
    const tasks: any = [];
    for (const masterKey of masterKeysList) {
      try {
        // await dispatch(actionSyncAccountMasterKey(masterKey));
        const masterKeyAccounts = (await masterKey?.getAccounts(true)) || [];
        accounts = [...accounts, ...masterKeyAccounts];
        const wallet = masterKey?.wallet;
        if (wallet) {
          // dispatch(actionRequestAirdropNFTForListAccount(wallet));
        }
      } catch (error) {
        console.log('ERROR LOAD ACCOUNTS OF MASTER KEYS', error);
      }
    }
    await dispatch(loadAllMasterKeyAccountsSuccess(accounts));
    await Promise.all(tasks);
  } catch (error) {
    new ExHandler(error).showErrorToast();
  } finally {
    // dispatch(actionInitNotification());
  }
  await dispatch(actionLoadingAllMasterKeyAccount(false));
};

export const actionSyncAccountMasterKey =
  (defaultMasterKey?: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      const state = getState();
      let masterKey: MasterKeyModel = defaultMasterKey || currentMasterKeySelector(state);
      if (masterKey.isMasterless) {
        return;
      }
      let wallet = masterKey.wallet;
      await WalletServices.configsWallet(wallet);
      let masterAccountInfo = await wallet.MasterAccount.getDeserializeInformation();
      const serverAccounts = await getWalletAccounts(masterAccountInfo.PublicKeyCheckEncode);
      const accountIds: any = [];
      for (const account of wallet.MasterAccount.child) {
        const accountInfo = await account.getDeserializeInformation();
        accountIds.push(accountInfo.ID);
      }

      const newAccounts = serverAccounts.filter(
        (item: any) => !accountIds.includes(item.id) && !(masterKey.deletedAccountIds || []).includes(item.id)
      );
      if (newAccounts.length > 0) {
        let accounts = [];
        for (const account of newAccounts) {
          try {
            const newAccount = await wallet.importAccountWithId(account.id, account.name);
            if (account?.name) {
              accounts.push(newAccount);
            }
          } catch (error) {
            console.log('IMPORT ACCOUNT WITH ID FAILED', error);
          }
        }
        await wallet.save();
      }
    } catch (error) {
      throw error;
    }
  };

export const setKeychainType =
  (keychainType: KeychainType) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    // console.log('[createNewMasterlessWallet]');
    try {
      await dispatch(actionSetKeychainType(keychainType));
    } catch (error) {
      throw error;
    }
  };

export const switchKeychainType =
  (keychainType: KeychainType) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    // console.log('[createNewMasterlessWallet]');
    try {
      let masterKey;
      if (keychainType === 'Masterless') {
        masterKey = getMasterlessSelector(getState());
      } else {
        masterKey = getMasterkeySelector(getState());
      }
      await dispatch(switchMasterKey(masterKey.name));

      //Save LocalStorage Redux => Update UI
      await dispatch(setKeychainType(keychainType));
    } catch (error) {
      console.log('[switchMasterKeyHandler] ERROR ', error);
    }
  };
