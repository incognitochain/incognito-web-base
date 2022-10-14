import { Image } from 'components/Core/Image';
import Row, { RowBetween } from 'components/Core/Row';
import { NetworkModal, useModal } from 'components/Modal';
import ModalTokens from 'components/Modal/Modal.tokens';
import React from 'react';
import { ThemedText } from 'theme';

import { MAIN_NETWORK_NAME_ICON } from '../../../../constants';
import { ISelectionFieldProps } from './SelectionField.interface';
import { ArrowDown, Container, Content, WrapNetwork, WrapToken } from './SelectionField.styled';

const SelectionField = (props: ISelectionFieldProps) => {
  const {
    headerTitle,
    networks,
    tokens,
    tokenSymbol,
    tokenImgUrl,
    tokenPlaceholder = 'Select token',

    networkName,
    showNetwork = true,
    networkPlaceholder = 'Select network',

    amount,

    onSelectToken,
    onSelectNetwork,
  } = props;

  const { setModal } = useModal();

  const activeNetworkHover = !!(networks && networks.length > 0);
  const activeTokensHover = !!(tokens && tokens.length > 0);

  const showTokensList = () => {
    if (!activeTokensHover) return;
    setModal({
      closable: true,
      data: <ModalTokens tokens={tokens} onSelect={onSelectToken} showNetwork={showNetwork} />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Select a Token',
      isSearchTokenModal: true,
    });
  };
  const showNetworkList = () => {
    if (!activeNetworkHover) return;
    setModal({
      closable: true,
      data: <NetworkModal networks={networks} onSelect={onSelectNetwork} />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Select network',
    });
  };
  const renderTokenSelection = () => (
    <Row>
      {tokenSymbol ? (
        <Row>
          {!!tokenImgUrl && <Image size={32} iconUrl={tokenImgUrl} />}
          {!!tokenSymbol && (
            <ThemedText.AvgMediumLabel style={{ marginLeft: 12, marginTop: 2 }} color="primary5">
              {tokenSymbol}
            </ThemedText.AvgMediumLabel>
          )}
        </Row>
      ) : (
        <Row>
          <ThemedText.RegularLabel color="primary8">{tokenPlaceholder}</ThemedText.RegularLabel>
        </Row>
      )}
      {activeTokensHover && <ArrowDown size={24} />}
    </Row>
  );
  const renderNetworkSelection = () => (
    <WrapNetwork onClick={showNetworkList} isActive={activeNetworkHover}>
      {networkName ? (
        <Row>
          {!!networkName && <Image border={false} iconUrl={MAIN_NETWORK_NAME_ICON[networkName]} />}
          {!!networkName && (
            <ThemedText.RegularLabel style={{ marginLeft: 8 }} color="primary8">
              {networkName}
            </ThemedText.RegularLabel>
          )}
        </Row>
      ) : (
        <Row>
          <ThemedText.RegularLabel color="primary8">{networkPlaceholder}</ThemedText.RegularLabel>
        </Row>
      )}
      {activeNetworkHover && <ArrowDown size={24} />}
    </WrapNetwork>
  );
  const renderHeaderTitle = () =>
    headerTitle ? (
      <ThemedText.SmallLabel fontWeight={400} color="primary8">
        {headerTitle}
      </ThemedText.SmallLabel>
    ) : undefined;

  return (
    <Container>
      <RowBetween>
        {renderHeaderTitle()}
        {renderNetworkSelection()}
      </RowBetween>
      <Content>
        <RowBetween>
          <WrapToken className={`default-padding ${activeTokensHover ? 'hover-item' : ''}`} onClick={showTokensList}>
            {renderTokenSelection()}
          </WrapToken>
        </RowBetween>
        <RowBetween className="default-padding">
          <ThemedText.SmallLabel fontWeight={400} color="primary8">
            Balance: {amount}
          </ThemedText.SmallLabel>
        </RowBetween>
      </Content>
    </Container>
  );
};

export default React.memo(SelectionField);
