import { ReactComponent as IncognitoIcon } from 'assets/svg/incognito-icon.svg';
import Modal from 'components/Core/Modal';
import useTheme from 'hooks/useTheme';
import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { incognitoWalletSetAccount, incognitoWalletSetState } from 'state/incognitoWallet';
import { AccountInfo, WalletState } from 'state/incognitoWallet/incognitoWallet.reducer';
import { useDarkModeManager } from 'state/user/hooks';
import styled from 'styled-components/macro';
import { shortenIncognitoAddress } from 'utils';

import AccountInfoList from './AccountInfoList';

declare global {
  interface Window {
    incognito: any;
  }
}

const CONNECT_WALLET = 'Incognito Wallet';

const Text = styled.p`
  flex: 1;
  width: max-content;
  white-space: nowrap;
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;

  background-color: ${({ theme }) => theme.primary2};
  border-radius: 8px;
  max-height: 40px;
`;

function detectIncognitoProvider() {
  if (typeof window.incognito !== 'undefined') {
    return true;
  } else {
    return false;
  }
}

const IncognitoWallet = () => {
  const dispatch = useDispatch();
  const [darkMode] = useDarkModeManager();
  const { white, black } = useTheme();
  const [walletState, setWalletState] = useState('Loading...');
  const [showModal, setShowModal] = useState<any>(false);

  const listenerDataChange = () => {
    const incognito = window.incognito;
    // Listener Events
    if (incognito) {
      incognito.on('stateChanged', async (result: any) => {
        console.log('result: ', result);
        if (result) {
          if (result.state === 'unlocked') {
            dispatch(incognitoWalletSetAccount(result.accounts));
          }
          if (result.state === 'locked') {
            setWalletState(CONNECT_WALLET);
            dispatch(incognitoWalletSetAccount([]));
          }
          dispatch(incognitoWalletSetState(result.state));
        }
      });

      incognito.on('accountsChanged', (updatedAccounts: AccountInfo[]) => {
        console.log('updatedAccounts: ', updatedAccounts);
        const accountInfo: AccountInfo | undefined =
          updatedAccounts && updatedAccounts.length > 0 ? updatedAccounts[0] : undefined;
        if (accountInfo) {
          setWalletState(shortenIncognitoAddress(accountInfo.paymentAddress));
        }
        dispatch(incognitoWalletSetAccount(updatedAccounts));
      });
    }
  };

  const buttonClickAction = async () => {
    if (detectIncognitoProvider()) {
      const incognito = window.incognito;
      const { result } = await incognito.request({ method: 'wallet_requestAccounts', params: {} });
      console.log('wallet_requestAccounts result ', result);
      if (result && result.accounts) {
        dispatch(incognitoWalletSetAccount(result.accounts));
        setShowModal(true);
      }
    } else {
      alert('Please install Incognito Extension!');
    }
  };

  // const lisenerEvents = () => {};

  useEffect(() => {
    const getInfo = async () => {
      if (detectIncognitoProvider()) {
        listenerDataChange();
        const incognito = window.incognito;
        const { result }: { result: { state: WalletState } } = await incognito.request({
          method: 'wallet_getState',
          params: {},
        });
        if (result.state === 'unlocked') {
          const data = await incognito.request({ method: 'wallet_getPaymentAddress', params: {} });
          setWalletState(shortenIncognitoAddress(data.result));
          const { result } = await incognito.request({ method: 'wallet_requestAccounts', params: {} });
          console.log('wallet_requestAccounts result ', result);
          if (result && result.accounts) {
            dispatch(incognitoWalletSetAccount(result.accounts));
          }
        } else {
          setWalletState(CONNECT_WALLET);
        }
      } else {
        setWalletState(CONNECT_WALLET);
      }
    };
    setTimeout(() => getInfo(), 1000);
  }, []);

  const bgColor = walletState === CONNECT_WALLET ? `#1A73E8` : `#303030`;

  const accountListContent = () => {
    return <></>;
  };

  return (
    <>
      <Wrapper className="button-hover" onClick={buttonClickAction} style={{ backgroundColor: bgColor }}>
        {/* <p>0xd6...C963</p> */}
        <Text>{walletState}</Text>
        <IncognitoIcon fill={darkMode ? white : black} />
      </Wrapper>
      {/* <Text>{`Balance: ${balance}`}</Text> */}
      <Modal isOpen={showModal} onDismiss={() => setShowModal(false)}>
        <AccountInfoList />
      </Modal>
    </>
  );
};

export default memo(IncognitoWallet);
