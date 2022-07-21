import Modal from 'components/Core/Modal';
import { useModal } from 'components/Modal';
import BalanceModal from 'components/Modal/Modal.balance';
import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { incognitoWalletSetAccount, incognitoWalletSetState } from 'state/incognitoWallet';
import { AccountInfo } from 'state/incognitoWallet/incognitoWallet.reducer';
import styled from 'styled-components/macro';
import { shortenIncognitoAddress } from 'utils';

import { PRIVATE_TOKEN_CURRENCY_TYPE, ROOT_NETWORK_IMG } from '../../../constants';
import { Image } from '../Image';
import AccountInfoList from './AccountInfoList';
import { useIncognitoWallet } from './IncongitoWallet.useContext';

declare global {
  interface Window {
    incognito: any;
  }
}

const CONNECT_WALLET = 'Connect Incognito';

const Text = styled.p`
  flex: 1;
  font-size: 14px;
  width: max-content;
  white-space: nowrap;
  font-weight: 500;
  line-height: 140%;
`;

const Wrapper = styled.div<{ isConnected: boolean }>`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  padding: 8px 8px;
  gap: 8px;

  /* background-color: ${({ theme }) => theme.primary2}; */
  background-color: ${({ theme, isConnected }) => (isConnected ? theme.bg1 : theme.primary2)};
  color: ${({ theme, isConnected }) => (isConnected ? theme.primary5 : theme.primary5)};
  border-radius: 8px;
  max-height: 40px;

  :hover {
    cursor: pointer;
    opacity: 0.8;
    background-color: ${({ theme, isConnected }) => (isConnected ? theme.bg1 : theme.primary1)};
  }
`;

const IncognitoWallet = () => {
  const dispatch = useDispatch();
  const [walletState, setWalletState] = useState('Loading...');
  const [showModal, setShowModal] = useState<any>(false);
  const { setModal } = useModal();
  const { isIncognitoInstalled, requestIncognitoAccount, getWalletState } = useIncognitoWallet();

  const listenerDataChange = () => {
    const incognito = window.incognito;
    // Listener Events
    if (incognito) {
      incognito.on('stateChanged', async (result: any) => {
        if (result) {
          if (result.state === 'unlocked') {
            requestIncognitoAccount().then();
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
    if (isIncognitoInstalled()) {
      requestIncognitoAccount().then((accounts) => {
        if (!accounts) return;
        setModal({
          closable: true,
          data: <BalanceModal />,
          isTransparent: false,
          rightHeader: undefined,
          title: 'Account',
          isSearchTokenModal: true,
        });
      });
    } else {
      alert('Please install Incognito Extension!');
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      if (isIncognitoInstalled()) {
        listenerDataChange();
        const incognito = window.incognito;
        const state = await getWalletState();
        if (state === 'unlocked') {
          const data = await incognito.request({ method: 'wallet_getPaymentAddress', params: {} });
          setWalletState(shortenIncognitoAddress(data.result));
          requestIncognitoAccount().then();
        } else {
          setWalletState(CONNECT_WALLET);
        }
      } else {
        setWalletState(CONNECT_WALLET);
      }
    };
    setTimeout(() => getInfo(), 1000);
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (isIncognitoInstalled()) {
        requestIncognitoAccount().then();
      }
    }, 5000);
  }, []);

  const isConnected = walletState !== CONNECT_WALLET;

  return (
    <>
      <Wrapper isConnected={isConnected} onClick={buttonClickAction}>
        <Image iconUrl={ROOT_NETWORK_IMG[PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO]} />
        <Text>{walletState}</Text>
      </Wrapper>
      <Modal isOpen={showModal} onDismiss={() => setShowModal(false)}>
        <AccountInfoList />
      </Modal>
    </>
  );
};

export default memo(IncognitoWallet);
