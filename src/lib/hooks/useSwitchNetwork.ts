import { getWalletForConnector } from 'connectors';
import { SupportedChainId } from 'constants/chains';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useModalOpen, useToggleModal } from 'state/application/hooks';
import { addPopup, ApplicationModal } from 'state/application/reducer';
import { useAppDispatch } from 'state/hooks';
import { updateWalletError } from 'state/wallet/reducer';

import { switchChain } from '../../utils/switchChain';

const useSwitchNetwork = ({ targetChain }: { targetChain: SupportedChainId | undefined }) => {
  const dispatch = useAppDispatch();
  const { chainId, connector } = useActiveWeb3React();
  const node = useRef<HTMLDivElement>();
  const open = useModalOpen(ApplicationModal.NETWORK_SELECTOR);
  const toggle = useToggleModal(ApplicationModal.NETWORK_SELECTOR);
  useOnClickOutside(node, open ? toggle : undefined);

  const history = useHistory();

  const onSwitchNetwork = useCallback(
    async (skipToggle?: boolean) => {
      if (!connector || !targetChain) return;

      const wallet = getWalletForConnector(connector);
      try {
        dispatch(updateWalletError({ wallet, error: undefined }));
        console.log('SANG TEST::: HAHA111 ', targetChain);
        await switchChain(connector, targetChain);
        console.log('SANG TEST::: HAHA222 ', targetChain);
        // if (!skipToggle) {
        //   toggle();
        // }
        // history.replace({
        //   search: replaceURLParam(history.location.search, 'chain', getChainNameFromId(targetChain)),
        // });
      } catch (error) {
        console.error('Failed to switch networks', error);

        // we want app network <-> chainId param to be in sync, so if user changes the network by changing the URL
        // but the request fails, revert the URL back to current chainId
        // if (chainId) {
        //   history.replace({ search: replaceURLParam(history.location.search, 'chain', getChainNameFromId(chainId)) });
        // }

        if (!skipToggle) {
          toggle();
        }

        dispatch(updateWalletError({ wallet, error: error.message }));
        dispatch(addPopup({ content: { failedSwitchNetwork: targetChain }, key: `failed-network-switch` }));
      }
    },
    [connector, toggle, dispatch, history, chainId, targetChain]
  );

  return [onSwitchNetwork];
};

export default useSwitchNetwork;
