import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { useModal } from 'components/Modal';
import { WalletState } from 'pages/IncWebWallet/core/types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { webWalletStateSelector } from 'state/masterKey';

import UnlockWalletModal from '../components/UnlockWalletModal';
import useWalletController from './useWalletController';

interface UseUnlockWalletResult {
  // showUnlockModal: () => void;
  showUnlockModal: () => any;
}

export default function useUnlockWallet(): UseUnlockWalletResult {
  const { setModal } = useModal();
  const history = useHistory();
  const walletController = useWalletController();

  //Extention, using Provider
  const { isIncognitoInstalled, requestIncognitoAccount } = useIncognitoWallet();
  const { showPopup } = useIncognitoWallet();

  const webWalletState = useSelector(webWalletStateSelector);

  const showUnlockModalInit = useMemo(() => () => {}, []);

  const handleCaseWalletExtension = () => {
    if (!isIncognitoInstalled()) {
      return () => requestIncognitoAccount();
    } else {
      return () => showPopup();
    }
  };

  const handleCaseWalletWeb = () => {
    switch (webWalletState) {
      case WalletState.uninitialized:
        return () => history.push('/wallet/create');
      case WalletState.unlocked:
        return showUnlockModalInit;
      case WalletState.locked:
        return () =>
          setModal({
            closable: true,
            data: <UnlockWalletModal />,
            isTransparent: false,
            rightHeader: undefined,
            title: 'Unlock Wallet',
            isSearchTokenModal: true,
          });
      default:
        return showUnlockModalInit;
    }
  };

  const showUnlockModal = useMemo(() => {
    if (walletController.isWalletExtension) {
      return handleCaseWalletExtension();
    } else if (walletController.isWalletWeb) {
      return handleCaseWalletWeb();
    } else {
      return showUnlockModalInit;
    }
  }, [webWalletState]);

  return {
    showUnlockModal,
  };
}
