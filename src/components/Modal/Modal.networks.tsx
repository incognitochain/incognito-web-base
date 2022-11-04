import Column from 'components/Core/Column';
import { Image } from 'components/Core/Image';
import Row from 'components/Core/Row';
import { ROOT_NETWORK_IMG } from 'constants/token';
import { ITokenNetwork } from 'models/model/pTokenModel';
import React from 'react';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import { useModal } from './Modal.provider';

const Styled = styled(Column)`
  width: 100%;
  overflow-y: auto;
  max-height: 530px;
  margin-top: 24px;
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
  networks: ITokenNetwork[];
  onSelect: ({ token }: { token: ITokenNetwork }) => void;
}

const NetworkModal = (props: IProps & any) => {
  const { networks, onSelect } = props;
  const { closeModal } = useModal();
  const renderItem = (network: ITokenNetwork) => {
    return (
      <Item
        key={network.networkName || network.identify}
        onClick={() => {
          closeModal();
          onSelect({ network });
        }}
      >
        <Image border={false} iconUrl={ROOT_NETWORK_IMG[network.currency]} size={32} />
        <ThemedText.RegularLabel color="primary5" style={{ marginLeft: 12 }}>
          {network.networkName}
        </ThemedText.RegularLabel>
      </Item>
    );
  };

  return <Styled>{networks.map(renderItem)}</Styled>;
};

NetworkModal.displayName = 'NetworkModal';

export default NetworkModal;
