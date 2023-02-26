import { defaultAccountWalletSelector } from 'state/account/account.selectors';
import { AppGetState, AppThunkDispatch } from 'state/index';

import { getBalanceFromDApp } from './scancoin.actions';

const { createNewCoins } = require('incognito-chain-web-js/build/web/wallet');

export const walletRequestAccounts =
  (senderShardID?: string) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      const reduxStore = getState();

      const accountDefault = await dispatch(getBalanceFromDApp());
      const accountSender = defaultAccountWalletSelector(reduxStore);

      const otaReceiver = await accountSender?.getOTAReceive();
      const burnerAddress = await accountSender?.getBurnerAddress2();
      let otaReceiverWithCfg;
      if (senderShardID !== undefined) {
        otaReceiverWithCfg = await accountSender?.getOTAReceiveWithCfg({
          senderShardID,
        });
      }
      const paymentAddress = accountSender.getPaymentAddress();
      const newCoins = await createNewCoins(paymentAddress);

      const resp = {
        result: {
          accounts: [accountDefault],
          // accounts: [],
          otaReceiver,
          burnerAddress,
          otaReceiverWithCfg,
          newCoins,
        },
      };
      return resp;
    } catch (error) {
      return {
        error,
      };
    }
  };
