import {
  BACKFILLABLE_WALLETS,
  getConnectorForWallet,
  gnosisSafe,
  network,
  useConnectors,
} from '@connections/connectors';
import { useAppSelector } from '@src/app-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import React from 'react';

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

const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const selectedWalletBackfilled = useAppSelector(
    (state) => state.user.selectedWalletBackfilled,
  );
  const selectedWallet = useAppSelector((state) => state.user.selectedWallet);

  const connectors = useConnectors(selectedWallet);

  React.useEffect(() => {
    connect(gnosisSafe);
    connect(network);
    if (selectedWallet) {
      connect(getConnectorForWallet(selectedWallet));
    } else if (!selectedWalletBackfilled) {
      BACKFILLABLE_WALLETS.map(getConnectorForWallet).forEach(connect);
    }
  }, []);

  return <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>;
};

export default Web3Provider;
