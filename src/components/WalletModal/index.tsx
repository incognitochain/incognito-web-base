import { getWalletForConnector, injected } from '@connections/connectors';
import { SUPPORTED_WALLETS } from '@constants/wallet';
import { isMobile } from '@hooks/userAgent';
import MetamaskIcon from '@images/metamask.png';
import TallyIcon from '@images/tally.png';
import Close from '@images/x.svg';
import { useAppDispatch, useAppSelector } from '@src/app-redux';
import {
  ApplicationModal,
  useModalOpen,
  useWalletModalToggle,
} from '@src/app-redux/state/application';
import { actionUpdateSelectedWallet } from '@src/app-redux/state/user';
import { actionUpdateWalletError } from '@src/app-redux/state/wallet';
import {
  AccountDetails,
  AutoColumn,
  AutoRow,
  ExternalLink,
  ThemedText,
} from '@src/components';
import { useWeb3React } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft } from 'react-feather';
import styled from 'styled-components/macro';

import { LightCard } from '../Card';
import Modal from '../Modal';
import Option from './Option';
import PendingView from './PendingView';

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.content4};
  }
`;

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`;

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) =>
    props.color === 'blue' ? ({ theme }) => theme.content4 : 'inherit'};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`;

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.content4};
  padding: 0 1rem 1rem 1rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0 1rem 1rem 1rem`};
`;

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `};
`;

const HoverText = styled.div`
  text-decoration: none;
  color: ${({ theme }) => theme.content4};
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

const WALLET_VIEWS = {
  OPTIONS: 'options',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

export default function WalletModal({
  pendingTransactions,
  confirmedTransactions,
  ENSName,
}: {
  pendingTransactions: string[]; // hashes of pending
  confirmedTransactions: string[]; // hashes of confirmed
  ENSName?: string;
}) {
  const dispatch = useAppDispatch();
  const { connector, account } = useWeb3React();

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

  const [pendingConnector, setPendingConnector] = useState<Connector | undefined>();
  const pendingError = useAppSelector((state) =>
    pendingConnector
      ? state.wallet.errorByWallet[getWalletForConnector(pendingConnector)]
      : undefined,
  );

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);
  const toggleWalletModal = useWalletModalToggle();

  const openOptions = useCallback(() => {
    setWalletView(WALLET_VIEWS.OPTIONS);
  }, [setWalletView]);

  useEffect(() => {
    if (walletModalOpen) {
      setWalletView(account ? WALLET_VIEWS.ACCOUNT : WALLET_VIEWS.OPTIONS);
    }
  }, [walletModalOpen, setWalletView, account]);

  useEffect(() => {
    if (pendingConnector && walletView !== WALLET_VIEWS.PENDING) {
      // TODO
      dispatch(
        actionUpdateWalletError({
          wallet: getWalletForConnector(pendingConnector),
          error: undefined,
        }),
      );
      setPendingConnector(undefined);
    }
  }, [pendingConnector, walletView]);

  const tryActivation = useCallback(
    async (connector: Connector) => {
      const wallet = getWalletForConnector(connector);

      // log selected wallet
      // sendEvent({
      //   category: 'Wallet',
      //   action: 'Change Wallet',
      //   label: wallet,
      // });

      try {
        // Fortmatic opens it's own modal on activation to log in. This modal has a tabIndex
        // collision into the WalletModal, so we special case by closing the modal.
        // if (connector === fortmatic) {
        //   toggleWalletModal();
        // }

        setPendingConnector(connector);
        setWalletView(WALLET_VIEWS.PENDING);
        dispatch(actionUpdateWalletError({ wallet, error: undefined }));

        await connector.activate();

        dispatch(actionUpdateSelectedWallet({ wallet }));
      } catch (error: any) {
        console.debug(`web3-react connection error: ${error}`);
        dispatch(actionUpdateWalletError({ wallet, error: error.message }));
      }
    },
    [dispatch, toggleWalletModal],
  );

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask = !!window.ethereum?.isMetaMask;
    const isTally = !!window.ethereum?.isTally;
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];
      const isActive = option.connector === connector;

      const optionProps = {
        active: isActive,
        id: `connect-${key}`,
        link: option.href,
        header: option.name,
        color: option.color,
        key,
        icon: option.iconURL,
      };

      // check for mobile options
      if (isMobile) {
        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              {...optionProps}
              onClick={() => {
                if (!isActive && !option.href && !!option.connector) {
                  tryActivation(option.connector);
                }
              }}
              subheader={null}
            />
          );
        }
        return null;
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                color={'#E8831D'}
                header="Install Metamask"
                subheader={null}
                link={'https://metamask.io/'}
                icon={MetamaskIcon}
              />
            );
          } else {
            return null; //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null;
        } else if (option.name === 'Injected' && isTally) {
          return (
            <Option
              id={`connect-${key}`}
              key={key}
              onClick={() => {
                option.connector === connector
                  ? setWalletView(WALLET_VIEWS.ACCOUNT)
                  : !option.href && option.connector && tryActivation(option.connector);
              }}
              color={'#E8831D'}
              header="Tally"
              active={option.connector === connector}
              subheader={null}
              link={null}
              icon={TallyIcon}
            />
          );
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            {...optionProps}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && option.connector && tryActivation(option.connector);
            }}
            subheader={null} //use option.descriptio to bring back multi-line
          />
        )
      );
    });
  }

  function getModalContent() {
    if (walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails
          toggleWalletModal={toggleWalletModal}
          pendingTransactions={pendingTransactions}
          confirmedTransactions={confirmedTransactions}
          ENSName={ENSName}
          openOptions={openOptions}
        />
      );
    }

    let headerRow;
    if (walletView === WALLET_VIEWS.PENDING) {
      headerRow = null;
    } else if (walletView === WALLET_VIEWS.ACCOUNT || !!account) {
      headerRow = (
        <HeaderRow color="blue">
          <HoverText
            onClick={() =>
              setWalletView(account ? WALLET_VIEWS.ACCOUNT : WALLET_VIEWS.OPTIONS)
            }
          >
            <ArrowLeft />
          </HoverText>
        </HeaderRow>
      );
    } else {
      headerRow = (
        <HeaderRow>
          <HoverText>Connect a wallet </HoverText>
        </HeaderRow>
      );
    }

    return (
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
        {headerRow}
        <ContentWrapper>
          <AutoColumn gap="16px">
            {walletView === WALLET_VIEWS.PENDING && pendingConnector && (
              <PendingView
                openOptions={openOptions}
                connector={pendingConnector}
                error={!!pendingError}
                tryActivation={tryActivation}
              />
            )}
            {walletView !== WALLET_VIEWS.PENDING && (
              <OptionGrid data-cy="option-grid">{getOptions()}</OptionGrid>
            )}
            {!pendingError && (
              <LightCard>
                <AutoRow style={{ flexWrap: 'nowrap' }}>
                  <ThemedText.Body fontSize={12}>
                    By connecting a wallet, you agree to Uniswap Labs’{' '}
                    <ExternalLink
                      style={{ textDecoration: 'underline' }}
                      href="https://uniswap.org/terms-of-service/"
                    >
                      Terms of Service
                    </ExternalLink>{' '}
                    and acknowledge that you have read and understand the Uniswap{' '}
                    <ExternalLink
                      style={{ textDecoration: 'underline' }}
                      href="https://uniswap.org/disclaimer/"
                    >
                      Protocol Disclaimer
                    </ExternalLink>
                    .
                  </ThemedText.Body>
                </AutoRow>
              </LightCard>
            )}
          </AutoColumn>
        </ContentWrapper>
      </UpperSection>
    );
  }

  return (
    <Modal
      isOpen={walletModalOpen}
      onDismiss={toggleWalletModal}
      minHeight={false}
      maxHeight={90}
    >
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  );
}
