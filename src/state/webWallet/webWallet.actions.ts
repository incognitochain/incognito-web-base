import { isEqual } from 'lodash';
import AccountModel from 'pages/IncWebWallet/models/account';
import accountService from 'pages/IncWebWallet/services/wallet/accountService';
import WalletServices from 'pages/IncWebWallet/services/wallet/walletService';
import { batch } from 'react-redux';
import {
  actionSetSignPublicKeyEncode,
  setAccount,
  setDefaultAccount,
  setListAccount,
} from 'state/account/account.actions';
import { AppGetState, AppThunkDispatch } from 'state/index';
import { actionSyncAccountMasterKey, updateMasterKey } from 'state/masterKey/masterKey.actions';
import { currentMasterKeySelector } from 'state/masterKey/masterKey.selectors';
import { walletSelector } from 'state/webWallet/webWallet.selectors';

import { WalletActionType } from './webWallet.types';

const { Validator } = require('incognito-chain-web-js/build/web/wallet');

//--------------------------------------------------------------------
// Pure Functions (Pure Action)
//--------------------------------------------------------------------

export const setWallet = (wallet: any) => ({
  type: WalletActionType.SET,
  data: wallet,
});

export const removeWallet = () => ({
  type: WalletActionType.REMOVE,
});

//--------------------------------------------------------------------
// Async Functions (Async Action - Thunk )
//--------------------------------------------------------------------
export const reloadAccountList = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  const state = getState();
  const wallet = walletSelector(state);
  const masterKey = currentMasterKeySelector(state);
  if (!wallet) {
    return;
  }
  const accounts = wallet.listAccount && (await wallet.listAccount());
  await dispatch(updateMasterKey(masterKey));
  await dispatch(setListAccount(accounts));
  return accounts;
};

export const reloadWallet =
  (accountName = '') =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    let listAccount: AccountModel[] = [];
    new Validator('reloadWallet-accountName', accountName).string();
    const state = getState();
    const masterKey = currentMasterKeySelector(state);
    let wallet = masterKey.wallet;
    let defaultAccount: AccountModel;

    try {
      await WalletServices.configsWallet(wallet);
      if (wallet?.Name) {
        listAccount = (await wallet.listAccount()) || [];
        defaultAccount = listAccount.find((item) => isEqual(item?.accountName, accountName)) || listAccount[0];

        if (!defaultAccount?.accountName) {
          throw new Error(`Can not get default account ${accountName}`);
        }
        batch(() => {
          dispatch(setWallet(wallet));
          dispatch(setListAccount(listAccount));
          dispatch(setAccount(defaultAccount));
          dispatch(setDefaultAccount(defaultAccount));
        });
        setTimeout(() => {
          batch(() => {
            dispatch(actionSetSignPublicKeyEncode());
            dispatch(actionSyncAccountMasterKey());
          });
        }, 500);
      }
      return wallet;
    } catch (e) {
      // new ExHandler(e).showErrorToast();
    }
  };

export const actionRequestAirdropNFTForListAccount =
  (wallet: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      if (!wallet) {
        return;
      }
      const listAccount = await wallet.listAccount();
      if (!listAccount) {
        return;
      }
      const task = listAccount.map((account: any) => {
        const accountWallet = accountService.getAccount(account, wallet);
        if (!!accountWallet && accountWallet?.name) {
          return accountWallet.requestAirdropNFT();
        }
      });
      await Promise.all(task);
    } catch (error) {
      console.log('REQUEST AIRDROP NFT ERROR', error);
    }
  };
