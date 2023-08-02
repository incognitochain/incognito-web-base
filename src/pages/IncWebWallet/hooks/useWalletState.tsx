import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { useMemo } from 'react';
import { useAppSelector } from 'state/hooks';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import { webWalletStateSelector } from 'state/masterKey';

import { WalletState } from '../core/types';
import useWalletController from './useWalletController';

type ReturnType = {
  text: string;
  walletState: WalletState;
};

export default function useWalletState(): ReturnType {
  const walletController = useWalletController();
  const { isIncognitoInstalled } = useIncognitoWallet();
  const incAccount = useAppSelector(incognitoWalletAccountSelector);
  const webWalletState = useAppSelector(webWalletStateSelector);

  return useMemo(() => {
    let text = '';
    let state = WalletState.uninitialized;
    if (walletController.isWalletExtension) {
      if (!isIncognitoInstalled()) {
        text = 'Install Wallet';
        state = WalletState.uninitialized;
      } else if (!incAccount) {
        text = 'Connect Wallet';
        state = WalletState.locked;
      } else {
        text = 'Connected';
        state = WalletState.unlocked;
      }
    } else if (walletController.isWalletWeb) {
      if (webWalletState === WalletState.uninitialized) {
        text = 'Install Wallet';
        state = WalletState.uninitialized;
      } else if (!incAccount || webWalletState === WalletState.locked) {
        text = 'Unlock Wallet';
        state = WalletState.locked;
      } else {
        text = 'Connected';
        state = WalletState.unlocked;
      }
    }
    return {
      text,
      walletState: state,
    };
  }, [walletController, webWalletState, incAccount, isIncognitoInstalled]);
}
