import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { WalletState } from 'pages/IncWebWallet/core/types';
import useUnlockWallet from 'pages/IncWebWallet/hooks/useUnlockWalelt';
import useWalletController from 'pages/IncWebWallet/hooks/useWalletController';
import React, { useMemo } from 'react';
import { useAppSelector } from 'state/hooks';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import { webWalletStateSelector } from 'state/masterKey';

import { Container } from './styles';

type Props = {
  title?: string;
  onClickCallback?: () => void;
};

const AppButton = (props: Props) => {
  const { title = '', onClickCallback = () => {} } = props;

  const { showUnlockModal } = useUnlockWallet();
  const incAccount = useAppSelector(incognitoWalletAccountSelector);
  const webWalletState = useAppSelector(webWalletStateSelector);
  const { isIncognitoInstalled } = useIncognitoWallet();

  const walletController = useWalletController();

  const _walletAction = () => showUnlockModal();

  const button = useMemo(() => {
    let text = '';
    if (walletController.isWalletExtension) {
      if (!isIncognitoInstalled()) {
        text = 'Create Wallet';
      } else if (!incAccount) {
        text = 'Connect Wallet';
      } else {
        text = title;
      }
    } else if (walletController.isWalletWeb) {
      if (webWalletState === WalletState.uninitialized) {
        text = 'Create Wallet';
      } else if (!incAccount || webWalletState === WalletState.locked) {
        text = 'Unlock Wallet';
      } else {
        text = title;
      }
    } else {
      text = 'Create Wallet';
    }

    return {
      text,
      isConnected: !!incAccount,
    };
  }, [incAccount, isIncognitoInstalled, webWalletState, title]);

  const onClick = () => {
    if (button.isConnected) {
      onClickCallback && onClickCallback();
    } else {
      _walletAction();
    }
  };

  return (
    <Container onClick={onClick}>
      <p className="text">{button.text}</p>
    </Container>
  );
};

export default React.memo(AppButton);
