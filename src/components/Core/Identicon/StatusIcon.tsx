import { Connector } from '@web3-react/types';
import CoinbaseWalletIcon from 'assets/images/coinbaseWalletIcon.svg';
import WalletConnectIcon from 'assets/images/walletConnectIcon.svg';
import Identicon from 'components/Core/Identicon';
import { coinbaseWallet, injected, walletConnect } from 'connectors';

export default function StatusIcon({ connector }: { connector: Connector }) {
  switch (connector) {
    case injected:
      return <Identicon />;
    case walletConnect:
      return <img src={WalletConnectIcon} alt="WalletConnect" />;
    case coinbaseWallet:
      return <img src={CoinbaseWalletIcon} alt="Coinbase Wallet" />;
    default:
      return null;
  }
}
