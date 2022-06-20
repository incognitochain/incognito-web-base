import {
  BACKFILLABLE_WALLETS,
  getConnectorForWallet,
  gnosisSafe,
  network,
  useConnectors,
} from '@connections/connectors';
import { useAppSelector } from '@connections/state/hooks';
import { Web3ReactProvider } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { ReactNode, useEffect } from 'react';

const connect = async (connector: Connector) => {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly();
    } else {
      await connector.activate();
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`);
  }
};

export default function Web3Provider({ children }: { children: ReactNode }) {
  const selectedWalletBackfilled = useAppSelector(
    (state) => state.user.selectedWalletBackfilled,
  );
  const selectedWallet = useAppSelector((state) => state.user.selectedWallet);

  const connectors = useConnectors(selectedWallet);

  useEffect(() => {
    connect(gnosisSafe);
    connect(network);

    if (selectedWallet) {
      connect(getConnectorForWallet(selectedWallet));
    } else if (!selectedWalletBackfilled) {
      BACKFILLABLE_WALLETS.map(getConnectorForWallet).forEach(connect);
    }
  }, []);

  return <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>;
}
