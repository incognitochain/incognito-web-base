import { injected, Wallet, walletConnect } from '@connections/connectors';
import INJECTED_ICON_URL from '@images/arrow-right.svg';
import COINBASE_ICON_URL from '@images/coinbaseWalletIcon.svg';
import METAMASK_ICON_URL from '@images/metamask.png';
import { Connector } from '@web3-react/types';
import WALLET_CONNECT_ICON_URL from 'images/walletConnectIcon.svg';

interface WalletInfo {
  connector?: Connector;
  wallet?: Wallet;
  name: string;
  iconURL: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    wallet: Wallet.INJECTED,
    name: 'Injected',
    iconURL: INJECTED_ICON_URL,
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    wallet: Wallet.INJECTED,
    name: 'MetaMask',
    iconURL: METAMASK_ICON_URL,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  WALLET_CONNECT: {
    connector: walletConnect,
    wallet: Wallet.WALLET_CONNECT,
    name: 'WalletConnect',
    iconURL: WALLET_CONNECT_ICON_URL,
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconURL: COINBASE_ICON_URL,
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true,
  },
};
