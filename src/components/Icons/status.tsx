import { Identicon } from '@components/Icons';
import { injected, walletConnect } from '@connections/connectors';
import WalletConnectIcon from '@images/walletConnectIcon.svg';
import { Connector } from '@web3-react/types';

export default function StatusIcon({ connector }: { connector: Connector }) {
  switch (connector) {
    case injected:
      return <Identicon />;
    case walletConnect:
      return <img src={WalletConnectIcon} alt="WalletConnect" />;
    default:
      return null;
  }
}
