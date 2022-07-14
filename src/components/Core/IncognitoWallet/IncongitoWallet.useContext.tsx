import React, { useContext } from 'react';
import { useAppDispatch } from 'state/hooks';
import { AccountInfo, incognitoWalletSetAccount, WalletState } from 'state/incognitoWallet';

interface IncognitoWalletContextType {
  isIncognitoInstalled: () => boolean;
  getWalletState: () => Promise<WalletState | undefined>;
  requestIncognitoAccount: () => Promise<AccountInfo[] | undefined>;
  requestSignTransaction: ({
    networkFee,
    networkFeeToken,
    isUnshield,
    isUnified,
    burnFee,
    burnFeeToken,
    burnFeeID,
    burnAmount,
    burnAmountText,
    burnToken,
    receiverAddress,
    feeAddress,
    receiverTokenID,
    estimatedBurnAmount,
    estimatedExpectedAmount,
  }: {
    networkFee: number;
    networkFeeToken: string;
    burnFee: string;
    burnFeeToken: string;
    sendTokenID: string;
    feeAddress: string;
    isUnshield: boolean;
    isUnified: boolean;
    burnFeeID: number | undefined;
    burnAmount: string;
    burnAmountText: string;
    burnToken: string;
    receiverAddress: string;
    receiverTokenID: string;
    estimatedBurnAmount: number;
    estimatedExpectedAmount: number;
  }) => any;
}

export const IncognitoWalletContext = React.createContext<IncognitoWalletContextType>({
  isIncognitoInstalled: () => false,
  getWalletState: async () => undefined,
  requestIncognitoAccount: async () => undefined,
  requestSignTransaction: () => null,
});

const IncognitoWalletProvider = (props: any) => {
  const dispatch = useAppDispatch();
  const children = React.useMemo(() => props.children, []);

  const getIncognitoInject = () => window.incognito;

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
      } else {
        incognito.request({
          method: 'wallet_showPopup',
          params: {},
        });
      }
    } catch (e) {
      console.log('REQUEST INCOGNITO ACCOUNT', e);
    }
    return incognitoAccounts;
  };

  const requestSignTransaction = async (payload: any) => {
    const incognito = getIncognitoInject();
    try {
      if (!incognito) return;
      const { result }: { result: { state: WalletState } } = await incognito.request({
        method: 'wallet_signTransaction',
        params: {
          ...payload,
        },
      });
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return (
    <IncognitoWalletContext.Provider
      value={{
        isIncognitoInstalled,
        getWalletState,
        requestIncognitoAccount,
        requestSignTransaction,
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
