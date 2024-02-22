import useWalletController from 'pages/IncWebWallet/hooks/useWalletController';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';
import {
  AccountInfo,
  incognitoWalletSelector,
  incognitoWalletSetAccount,
  incognitoWalletSetState,
  WalletState,
} from 'state/incognitoWallet';
import { WalletType } from 'wallet/types';

interface IncognitoWalletContextType {
  isIncognitoInstalled: () => boolean;
  getWalletState: () => Promise<WalletState | undefined>;
  requestIncognitoAccount: () => Promise<AccountInfo[] | undefined>;
  requestSignTransaction: (payload: any) => any;
  showPopup: () => void;
}
export const getIncognitoInject = () => window.incognito;
export const IncognitoWalletContext = React.createContext<IncognitoWalletContextType>({
  isIncognitoInstalled: () => false,
  getWalletState: async () => undefined,
  requestIncognitoAccount: async () => undefined,
  requestSignTransaction: () => null,
  showPopup: () => null,
});

const IncognitoWalletProvider = (props: any) => {
  const dispatch = useAppDispatch();
  const children = React.useMemo(() => props.children, []);
  useSelector(incognitoWalletSelector);
  const walletController = useWalletController();

  const isIncognitoInstalled = (): boolean => {
    return typeof window.incognito !== 'undefined';
  };

  const getWalletState = async (): Promise<WalletState | undefined> => {
    let state = undefined;
    const incognito = getIncognitoInject();
    try {
      if (!incognito) return;
      const { result }: { result: { state: WalletState } } = await incognito.request({
        method: 'wallet_getState',
        params: {},
      });
      await dispatch(incognitoWalletSetState(result.state));
      state = result.state;
    } catch (e) {
      console.log('REQUEST GET WALLET STATE ERROR', e);
    }
    return state;
  };

  const requestIncognitoAccount = async (): Promise<AccountInfo[] | undefined> => {
    let incognitoAccounts = undefined;
    const incognito = getIncognitoInject();
    try {
      if (!incognito) return;
      const state = (await getWalletState()) || {};
      if (state === 'unlocked') {
        const { result }: { result: { accounts: AccountInfo[] | undefined } } = await incognito.request({
          method: 'wallet_requestAccounts',
          params: {},
        });
        if (result && result.accounts && result.accounts.length > 0) {
          incognitoAccounts = result.accounts;
          dispatch(incognitoWalletSetAccount(incognitoAccounts));
        }
      }
    } catch (e) {
      console.log('REQUEST INCOGNITO ACCOUNT', e);
    }
    return incognitoAccounts;
  };

  const requestSignTransaction = async (payload: any) => {
    const incognito = getIncognitoInject();
    const walletType: WalletType = walletController.getWalletType();

    try {
      let result;
      if (walletType === 'WalletExtension' && !incognito) return;
      if (walletType === 'WalletExtension') {
        const response = await incognito.request({
          method: 'wallet_signTransaction',
          params: {
            ...payload,
          },
        });
        result = response?.result;
      } else {
        result = await walletController.signTransaction(payload);
      }

      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const showPopup = () => {
    const incognito = getIncognitoInject();
    try {
      if (!!incognito) {
        incognito.request({
          method: 'wallet_showPopup',
          params: {},
        });
      } else {
        window.open('https://chrome.google.com/webstore/detail/incognito-wallet/chngojfpcfnjfnaeddcmngfbbdpcdjaj');
      }
    } catch (e) {
      console.log('SHOW POPUP WITH ERROR: ', e);
    }
  };

  return (
    <IncognitoWalletContext.Provider
      value={{
        isIncognitoInstalled,
        getWalletState,
        requestIncognitoAccount,
        requestSignTransaction,
        showPopup,
      }}
    >
      <>{children}</>
    </IncognitoWalletContext.Provider>
  );
};

export const useIncognitoWallet = (): IncognitoWalletContextType => {
  const context = useContext(IncognitoWalletContext);
  if (!context) {
    throw new Error(
      'Incognito wallet context not found, useModal must be used within the <IncognitoWalletProvider>..</IncognitoWalletProvider>'
    );
  }
  return context;
};

export default IncognitoWalletProvider;
