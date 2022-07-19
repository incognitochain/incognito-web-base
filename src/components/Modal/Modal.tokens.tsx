import { useFuse } from 'hooks/useFuse';
import PToken from 'models/model/pTokenModel';
import SearchTokenBar from 'pages/Swap/features/Selection/SearchTokenBar';
import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import Column from '../Core/Column';
import { Image } from '../Core/Image';
import Row from '../Core/Row';
import { useModal } from './Modal.provider';

const Styled = styled(Column)`
  padding-top: 10px;
  width: 100%;
  overflow-y: auto;
  max-height: 70vh;
`;

const Item = styled(Row)`
  padding: 12px 0 12px 12px;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.bg4};
    /* padding: 12px 0 12px 16px;
    transform: scale(1);
    transition: 0.1s all ease; */
  }
  .logo {
    width: 24px;
    height: 24px;
  }
`;

interface IProps {
  tokens: PToken[];
  onSelect: ({ token }: { token: PToken }) => void;
  showNetwork: boolean;
}

const TokenModal = (props: IProps & any) => {
  const { tokens, onSelect, showNetwork } = props;
  const { closeModal } = useModal();
  const [tokensShow = [], onSearchTokens] = useFuse(tokens, {
    keys: ['displayName', 'name', 'symbol', 'pSymbol'],
    matchAllOnEmptyQuery: true,
    isCaseSensitive: false,
    findAllMatches: true,
    includeMatches: false,
    includeScore: true,
    useExtendedSearch: false,
    threshold: 0,
    location: 0,
    distance: 2,
    maxPatternLength: 32,
  });

  const keySearchChange = (key: string) => {
    if (typeof onSearchTokens === 'function') {
      onSearchTokens(key);
    }
  };

  const renderItem = useCallback((token: PToken) => {
    return (
      <Item
        key={token.tokenID}
        onClick={() => {
          closeModal();
          onSelect({ token });
        }}
      >
        <Image iconUrl={token.iconUrl} size={showNetwork ? 40 : 32} />
        <Column>
          <ThemedText.RegularLabel color="primary5" style={{ marginLeft: 12 }}>
            {token.symbol}
          </ThemedText.RegularLabel>
          {showNetwork && (
            <ThemedText.SmallLabel color="primary8" style={{ marginLeft: 12 }}>
              {token.networkName}
            </ThemedText.SmallLabel>
          )}
        </Column>
      </Item>
    );
  }, []);

  return (
    <>
      <SearchTokenBar keySearchChange={keySearchChange} />
      {Array.isArray(tokensShow) && <Styled>{tokensShow.map(renderItem)}</Styled>}
    </>
  );
};

TokenModal.displayName = 'TokenModal';

export default TokenModal;
