import { useFuse } from 'hooks/useFuse';
import PToken from 'models/model/pTokenModel';
import SearchTokenBar from 'pages/Swap/features/Selection/SearchTokenBar';
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import Column from '../Core/Column';
import { Image } from '../Core/Image';
import Row from '../Core/Row';
import { useModal } from './Modal.provider';

interface IProps {
  tokens: PToken[];
  onSelect: ({ token }: { token: PToken }) => void;
  showNetwork: boolean;
}

const Styled = styled.div`
  margin-top: 12px;
`;

const Item = styled(Row)`
  padding: 12px 0 12px 12px;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.bg4};
    .network {
      background-color: ${({ theme }) => theme.bg1};
    }
  }

  .logo {
    width: 24px;
    height: 24px;
  }

  .network {
    color: ${({ theme }) => theme.bg4};
    padding-left: 4px;
    padding-right: 4px;
    margin-left: 6px;
    background-color: ${({ theme }) => theme.bg4};
    border-radius: 4px;
  }
  .extra-info {
    margin-top: 2px;
    display: flex;
    align-items: center;
  }
`;

interface IProps {
  tokens: PToken[];
  onSelect: ({ token }: { token: PToken }) => void;
  showNetwork: boolean;
  blacklist: string[];
}

const TokenModal = React.memo((props: IProps & any) => {
  const { tokens, onSelect, showNetwork, blacklist = [] } = props;
  const { closeModal } = useModal();
  const _tokens = React.useMemo(() => {
    return tokens.filter((token: PToken) => !blacklist.some((id: string) => id === token.identify));
  }, [tokens, blacklist]);
  const [tokensShow = [], onSearchTokens] = useFuse(_tokens, {
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

  const Row = (props: any) => {
    const { style, index } = props;
    if (typeof index !== 'number') return null;
    // @ts-ignore
    const token = tokensShow[index];
    if (!token) return null;
    return (
      <Item
        key={token.identify}
        style={style}
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
            <div className="extra-info">
              <ThemedText.SmallLabel color="primary8" style={{ marginLeft: 12 }}>
                {token.shortName}
              </ThemedText.SmallLabel>
              <div className="network">
                <ThemedText.SmallLabel color="primary8" style={{ padding: 2 }}>
                  {token.network}
                </ThemedText.SmallLabel>
              </div>
            </div>
          )}
        </Column>
      </Item>
    );
  };

  return (
    <>
      <SearchTokenBar keySearchChange={keySearchChange} />
      <Styled>
        <List
          overscanCount={6}
          height={500}
          itemCount={tokensShow.length}
          itemData={tokensShow}
          itemSize={69}
          width="100%"
        >
          {Row}
        </List>
      </Styled>
    </>
  );
});

TokenModal.displayName = 'TokenModal';

export default TokenModal;
