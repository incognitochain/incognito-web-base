import React from 'react';

import { ButtonConfirmed } from '../../../../components/Core/Button';
import useActiveWeb3React from '../../../../hooks/useActiveWeb3React';
import useSwitchNetwork from '../../../../lib/hooks/useSwitchNetwork';
import { useWalletModalToggle } from '../../../../state/application/hooks';
import { CHAIN_ID } from './Profile.constant';

interface IButton {
  text: string;
  disabled: boolean;
  switchNetwork: boolean;
}

const useButtonMetamask = () => {
  const [onSwitchNetwork] = useSwitchNetwork({ targetChain: CHAIN_ID });
  const { account, chainId } = useActiveWeb3React();
  const toggleWalletModal = useWalletModalToggle();

  const metamaskActions = () => {
    if (!account) return toggleWalletModal();

    if (chainId !== CHAIN_ID) {
      return onSwitchNetwork(false);
    }
    return onSwitchNetwork(false);
  };

  const button: IButton = React.useMemo(() => {
    let text = '';
    let disabled = false;
    let switchNetwork = false;
    if (!account) {
      text = 'Connect Wallet';
      disabled = true;
    } else if (chainId !== CHAIN_ID) {
      text = 'Switch network';
      disabled = true;
      switchNetwork = true;
    }
    return {
      text,
      disabled,
      switchNetwork,
    };
  }, [chainId, account]);

  return {
    button,
    component: (
      <ButtonConfirmed type="button" onClick={metamaskActions} style={{ width: 250 }}>
        {button.text || 'Connect Wallet'}
      </ButtonConfirmed>
    ),
    address: account,
  };
};

export default useButtonMetamask;
