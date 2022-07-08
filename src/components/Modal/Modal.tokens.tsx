import PToken from 'models/model/pTokenModel';
import React from 'react';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import Column from '../Core/Column';
import { Image } from '../Core/Image';
import Row from '../Core/Row';
import { useModal } from './Modal.provider';

const Styled = styled(Column)`
  margin-top: 24px;
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
    padding: 12px 0 12px 16px;
    transform: scale(1); /* you need a scale here to allow it to transition in both directions */
    transition: 0.1s all ease;
  }
  .logo {
    width: 24px;
    height: 24px;
  }
`;

interface IProps {
  tokens: PToken[];
  onSelect: ({ token }: { token: PToken }) => void;
}

const TokenModal = (props: IProps & any) => {
  const { tokens, onSelect } = props;
  const { closeModal } = useModal();
  const renderItem = (token: PToken) => {
    return (
      <Item
        key={token.tokenID}
        onClick={() => {
          closeModal();
          onSelect({ token });
        }}
      >
        <Image iconUrl={token.iconUrl} />
        <ThemedText.RegularLabel color="primary5" style={{ marginLeft: 12 }}>
          {token.symbol}
        </ThemedText.RegularLabel>
      </Item>
    );
  };

  return <Styled>{tokens.map(renderItem)}</Styled>;
};

TokenModal.displayName = 'TokenModal';

export default TokenModal;
