/* eslint-disable import/no-anonymous-default-export */
import BigNumber from 'bignumber.js';
import { ACCOUNT_CONSTANT, PRVIDSTR } from 'incognito-chain-web-js';
import SelectedPrivacyModel from 'models/model/SelectedPrivacyModel';
import { getAccountWallet } from 'pages/IncWebWallet/services/wallet/wallet.shared';
import { createSelector } from 'reselect';
import { RootState } from 'state/index';
import { getCurrentNetworkSelector } from 'state/network/network.selectors';
import { getPrivacyDataByTokenIDSelector } from 'state/token';
import { walletSelector } from 'state/webWallet/webWallet.selectors';
import convert from 'utils/convert';
export const getAccountWithPaymentAddress = (paymentAddress: string) => (state: RootState) => {
  return state.account.list.find((acc) => acc.PaymentAddress === paymentAddress);
};

export const accountSelector = createSelector(
  (state: RootState) => state.account,
  (account) => account
);

export const isGettingBalance = createSelector(
  (state: RootState) => state.account,
  (account) => account.isGettingBalance || []
);

export const defaultAccountName = (state: RootState): string => state.account.defaultAccountName || '';

export const listAccountSelector = createSelector(
  (state: RootState) => state.account.list || [],
  (list) =>
    list.map((item) => ({
      ...item,
      accountName: item?.name || item?.accountName,
      privateKey: item?.PrivateKey,
      paymentAddress: item?.PaymentAddress,
      readonlyKey: item?.ReadonlyKey,
    }))
);

export const defaultAccountNameSelector = createSelector(
  (state: RootState) => state.account.defaultAccountName,
  (accountName) => accountName
);

export const listAccount = listAccountSelector;

export const defaultAccountSelector: any = createSelector(
  listAccountSelector,
  defaultAccountNameSelector,
  walletSelector,
  (list, defaultName, wallet) => {
    try {
      if (list.length === 0 || !wallet?.Name) {
        return {};
      }
      let account = list?.find((account) => account?.name === defaultName) || list[0];
      return {
        ...account,
        indexAccount: wallet.getAccountIndexByName && wallet.getAccountIndexByName(defaultAccount?.accountName || ''),
      };
    } catch (error) {
      console.log('ERROR WHEN GET DEFAULT ACCOUNT', error);
    }
  }
);

export const defaultAccount = defaultAccountSelector;

// export const getAccountByName = createSelector(listAccount, (accounts) =>
//   memoize((accountName) =>
//     accounts.find((account: any) => account?.name === accountName || account?.AccountName === accountName),
//   ),
// );

export const getAccountByName1 = (state: RootState) => (accountName: string) => {
  const accountList = listAccount(state);
  return accountList.find((account: any) => account?.name === accountName || account?.AccountName === accountName);
};

// export const getAccountByPublicKey = createSelector(listAccount, (accounts) =>
//   memoize((publicKey) => accounts.find((account) => account?.PublicKeyCheckEncode === publicKey)),
// );

export const getAccountByPublicKey1 = (state: RootState) => (publicKey: any) => {
  const accountList = listAccount(state);
  return accountList.find((account) => account?.PublicKeyCheckEncode === publicKey);
};

export const isGettingAccountBalanceSelector = createSelector(
  isGettingBalance,
  (isGettingBalance) => isGettingBalance.length !== 0
);

export const defaultAccountBalanceSelector = createSelector(
  defaultAccountSelector,
  (account: any) => account?.value || 0
);

export const defaultAccountPaymentAddressSelector = createSelector(
  defaultAccountSelector,
  (account: any) => account?.PaymentAddress || account?.paymentAddress
);

export const defaultAccountOTAKeySelector = createSelector(defaultAccountSelector, (account: any) => {
  return account?.OTAKey;
});

export const switchAccountSelector = createSelector(
  (state: RootState) => state?.account,
  (account) => !!account?.switch
);

export const createAccountSelector = createSelector(
  (state: RootState) => state?.account,
  (account) => !!account?.create
);

export const importAccountSelector = createSelector(
  (state: RootState) => state?.account,
  (account) => !!account?.import
);

// export const getAccountByNameSelector = createSelector(listAccountSelector, (accounts) =>
//   memoize((accountName) =>
//     accounts.find((account) => account?.accountName === accountName || account?.AccountName === accountName),
//   ),
// );

export const getAccountByNameSelector1 = (state: RootState) => (accountName: string) => {
  const accountList = listAccount(state);
  return accountList.find((account: any) => account?.name === accountName || account?.AccountName === accountName);
};

export const signPublicKeyEncodeSelector = createSelector(
  (state: RootState) => state?.account,
  (account) => account?.signPublicKeyEncode
);

export const burnerAddressSelector = createSelector(accountSelector, ({ burnerAddress }) => burnerAddress);

export const otaKeyOfDefaultAccountSelector = createSelector(defaultAccountSelector, (account: any) => account.OTAKey);

export const paymentAddressOfDefaultAccountSelector = createSelector(
  defaultAccountSelector,
  (account: any) => account.PaymentAddress
);

export const nftTokenDataSelector = createSelector(accountSelector, ({ nft }) => {
  const { initNFTToken, nftToken } = nft;
  let titleStr = '';
  if (!initNFTToken) {
    titleStr = 'Welcome! Tap here to mint your access ticket';
  }
  return {
    ...nft,
    invalidNFTToken: !initNFTToken || !nftToken,
    titleStr,
  };
});

export const defaultAccountWalletSelector = createSelector(
  defaultAccountSelector,
  walletSelector,
  (defaultAccount, wallet) => defaultAccount && wallet && getAccountWallet(defaultAccount, wallet)
);

export const getScanCoinKeySelector = createSelector(defaultAccountWalletSelector, (accountWallet) => {
  let scanCoinKey = undefined;
  try {
    scanCoinKey = `${accountWallet?.getOTAKey()}-${accountWallet?.rpc?.rpcHttpService?.url}`;
  } catch (e) {
    console.log('[getKeyScanCoinSelector] ERROR ', e);
    scanCoinKey = undefined;
  } finally {
    return scanCoinKey;
  }
});

export const isFetchingNFTSelector = createSelector(accountSelector, ({ isFetchingNFT }) => isFetchingNFT);
export const getCurrentPaymentAddress = createSelector(
  paymentAddressOfDefaultAccountSelector,
  (paymentAddress) => paymentAddress || 'Unknow'
);

export const getKeyDefineAccountSelector = createSelector(
  otaKeyOfDefaultAccountSelector,
  getCurrentNetworkSelector,
  (OTAKey, network) => {
    if (!OTAKey || !network) return undefined;
    return `${OTAKey}-${network.address}`;
  }
);

export const getPRVBalanceInfo = createSelector(getPrivacyDataByTokenIDSelector, defaultAccount, (getFn, account) => {
  let result = {};

  if (account) {
    try {
      const prvInfor = getFn(PRVIDSTR) as SelectedPrivacyModel;
      const { priceUSD, decimals, pDecimals, tokenID, symbol, amount = 0 } = prvInfor;

      const feePerTx = ACCOUNT_CONSTANT.MAX_FEE_PER_TX || 0;

      const feePerTxToHuman = convert.toHumanAmount({
        originalAmount: new BigNumber(feePerTx).toNumber(),
        decimals: pDecimals,
      });
      const feePerTxToHumanStr = feePerTxToHuman.toString();
      const feeAndSymbol = `${feePerTxToHumanStr} ${symbol} `;

      // const prvBalanceOriginal = convert.toNumber(account.value) || 0;
      const prvBalanceOriginal = amount;
      const prvbalanceToHuman = convert.toHumanAmount({
        originalAmount: new BigNumber(prvBalanceOriginal).toNumber(),
        decimals: pDecimals,
      });

      const prvbalanceToHumanStr = prvbalanceToHuman.toString();
      // console.log(' prvBalanceOriginal ', prvBalanceOriginal);
      // console.log(' feePerTx ', feePerTx);

      const isEnoughPRVNetworkFee = new BigNumber(prvBalanceOriginal).gt(new BigNumber(feePerTx));

      const isNeedFaucet = new BigNumber(prvBalanceOriginal).isLessThan(new BigNumber(feePerTx));
      const isCurrentBalanceGreaterPerTx = new BigNumber(prvBalanceOriginal).gt(feePerTx);

      result = {
        priceUSD,
        decimals,
        tokenID,
        pDecimals,
        symbol,
        prvID: PRVIDSTR,
        feePerTx,
        feePerTxToHuman,
        feePerTxToHumanStr,
        feeAndSymbol,

        prvBalanceOriginal,
        prvbalanceToHuman,
        prvbalanceToHumanStr,
        isEnoughPRVNetworkFee,

        isCurrentBalanceGreaterPerTx,
        isNeedFaucet,
      };
    } catch (error) {
      console.log('[getPRVBalanceInfo] ERROR ', error);
      result = {};
    } finally {
    }
  }
  return result;
});

export default {
  defaultAccountName,
  listAccount,
  defaultAccount,
  isGettingBalance,
  getAccountByName1,
  getAccountByPublicKey1,
  listAccountSelector,
  defaultAccountNameSelector,
  defaultAccountSelector,
  isGettingAccountBalanceSelector,
  defaultAccountBalanceSelector,
  switchAccountSelector,
  createAccountSelector,
  importAccountSelector,
  getAccountByNameSelector1,
  signPublicKeyEncodeSelector,
  burnerAddressSelector,
  otaKeyOfDefaultAccountSelector,
  nftTokenDataSelector,
  defaultAccountWalletSelector,
  isFetchingNFTSelector,
  getCurrentPaymentAddress,
  getKeyDefineAccountSelector,
};
