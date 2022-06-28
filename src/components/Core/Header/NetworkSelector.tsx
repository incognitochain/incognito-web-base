import { getWalletForConnector } from 'connectors';
import { CHAIN_INFO } from 'constants/chainInfo';
import { CHAIN_IDS_TO_NAMES, SupportedChainId } from 'constants/chains';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import useParsedQueryString from 'hooks/useParsedQueryString';
import usePrevious from 'hooks/usePrevious';
import { ParsedQs } from 'qs';
import { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useModalOpen, useToggleModal } from 'state/application/hooks';
import { addPopup, ApplicationModal } from 'state/application/reducer';
import { useAppDispatch } from 'state/hooks';
import { updateWalletError } from 'state/wallet/reducer';
import { replaceURLParam } from 'utils/routes';
import { switchChain } from 'utils/switchChain';

const getParsedChainId = (parsedQs?: ParsedQs) => {
  const chain = parsedQs?.chain;
  if (!chain || typeof chain !== 'string') return { urlChain: undefined, urlChainId: undefined };

  return { urlChain: chain.toLowerCase(), urlChainId: getChainIdFromName(chain) };
};

const getChainIdFromName = (name: string) => {
  const entry = Object.entries(CHAIN_IDS_TO_NAMES).find(([_, n]) => n === name);
  const chainId = entry?.[0];
  return chainId ? parseInt(chainId) : undefined;
};

const getChainNameFromId = (id: string | number) => {
  // casting here may not be right but fine to return undefined if it's not a supported chain ID
  return CHAIN_IDS_TO_NAMES[id as SupportedChainId] || '';
};

export default function NetworkSelector() {
  const dispatch = useAppDispatch();
  const { chainId, provider, connector } = useActiveWeb3React();
  const parsedQs = useParsedQueryString();
  const { urlChain, urlChainId } = getParsedChainId(parsedQs);
  const prevChainId = usePrevious(chainId);
  const node = useRef<HTMLDivElement>();
  const open = useModalOpen(ApplicationModal.NETWORK_SELECTOR);
  const toggle = useToggleModal(ApplicationModal.NETWORK_SELECTOR);
  useOnClickOutside(node, open ? toggle : undefined);

  const history = useHistory();

  const info = chainId ? CHAIN_INFO[chainId] : undefined;

  const onSelectChain = useCallback(
    async (targetChain: number, skipToggle?: boolean) => {
      if (!connector) return;

      const wallet = getWalletForConnector(connector);
      try {
        dispatch(updateWalletError({ wallet, error: undefined }));
        await switchChain(connector, targetChain);
        if (!skipToggle) {
          toggle();
        }
        history.replace({
          search: replaceURLParam(history.location.search, 'chain', getChainNameFromId(targetChain)),
        });
      } catch (error) {
        console.error('Failed to switch networks', error);

        // we want app network <-> chainId param to be in sync, so if user changes the network by changing the URL
        // but the request fails, revert the URL back to current chainId
        if (chainId) {
          history.replace({ search: replaceURLParam(history.location.search, 'chain', getChainNameFromId(chainId)) });
        }

        if (!skipToggle) {
          toggle();
        }

        dispatch(updateWalletError({ wallet, error: error.message }));
        dispatch(addPopup({ content: { failedSwitchNetwork: targetChain }, key: `failed-network-switch` }));
      }
    },
    [connector, toggle, dispatch, history, chainId]
  );

  useEffect(() => {
    if (!chainId || !prevChainId) return;

    // when network change originates from wallet or dropdown selector, just update URL
    if (chainId !== prevChainId) {
      history.replace({ search: replaceURLParam(history.location.search, 'chain', getChainNameFromId(chainId)) });
      // otherwise assume network change originates from URL
    } else if (urlChainId && urlChainId !== chainId) {
      onSelectChain(urlChainId, true);
    }
  }, [chainId, urlChainId, prevChainId, onSelectChain, history]);

  // set chain parameter on initial load if not there
  useEffect(() => {
    if (chainId && !urlChainId) {
      history.replace({ search: replaceURLParam(history.location.search, 'chain', getChainNameFromId(chainId)) });
    }
  }, [chainId, history, urlChainId, urlChain]);

  if (!chainId || !info || !provider) {
    return null;
  }

  return null;

  // return (
  //   <SelectorWrapper ref={node as any} onMouseEnter={toggle} onMouseLeave={toggle}>
  //     <SelectorControls interactive>
  //       <SelectorLogo interactive src={info.logoUrl} />
  //       <SelectorLabel>{info.label}</SelectorLabel>
  //       <StyledChevronDown />
  //     </SelectorControls>
  //     {open && (
  //       <FlyoutMenu>
  //         <FlyoutMenuContents>
  //           <FlyoutHeader>Select a network</FlyoutHeader>
  //           {NETWORK_SELECTOR_CHAINS.map((chainId: SupportedChainId) =>
  //             isChainAllowed(connector, chainId) ? (
  //               <Row onSelectChain={onSelectChain} targetChain={chainId} key={chainId} />
  //             ) : null
  //           )}
  //         </FlyoutMenuContents>
  //       </FlyoutMenu>
  //     )}
  //   </SelectorWrapper>
  // );
}
