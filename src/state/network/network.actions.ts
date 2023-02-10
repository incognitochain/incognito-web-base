import { ServerModel } from 'pages/IncWebWallet/services/wallet/Server';

import { ChangeNetworkAction, NetworkActionType } from './network.types';

const changeNetwork = (network: ServerModel): ChangeNetworkAction => ({
  type: NetworkActionType.CHANGE,
  payload: {
    currentNetwork: network,
  },
});

export { changeNetwork };
