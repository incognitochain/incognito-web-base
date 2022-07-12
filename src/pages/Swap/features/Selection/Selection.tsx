import { Image } from 'components/Core/Image';
import Row, { RowBetween } from 'components/Core/Row';
import { NetworkModal, useModal } from 'components/Modal';
import ModalTokens from 'components/Modal/Modal.tokens';
import { ROOT_NETWORK_IMG } from 'constants/token';
import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import React from 'react';
import { ChevronDown } from 'react-feather';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

interface ISelection {
  title: string;
  rightLabel?: string;
  rightValue?: string;
  leftValue?: string;
  iconUrl?: string;
  currency?: number;
  tokens?: PToken[];
  networks?: ITokenNetwork[];
  onSelectToken?: ({ token }: { token: PToken }) => void;
  onSelectNetwork?: ({ network }: { network: ITokenNetwork }) => void;
}

const MainStyled = styled(Row)`
  border: 1px solid ${({ theme }) => theme.border1};
  border-radius: 8px;
  min-height: 88px;
  background-color: ${({ theme }) => theme.primary14};
  margin-top: 4px;
  position: relative;
  .section {
    padding: 16px;
    flex: 1;
  }
  .selection-item {
    width: 100%;
    cursor: pointer;
    padding-top: 12px;
  }
  .line {
    background-color: ${({ theme }) => theme.border1};
    width: 1px;
    top: 0;
    position: absolute;
    bottom: 0;
    left: 49%;
  }
  .hover-item {
    :hover {
      background-color: ${({ theme }) => theme.bg4};
      padding-left: 6px;
      padding-right: 4px;
      border-radius: 8px;
      transform: scale(1); /* you need a scale here to allow it to transition in both directions */
      transition: 0.2s all ease;
    }
  }
`;

const Selection = React.memo((props: ISelection) => {
  const {
    title,
    iconUrl,
    rightLabel,
    rightValue,
    leftValue,
    tokens,
    onSelectToken,
    networks,
    onSelectNetwork,
    currency,
  } = props;
  const { setModal } = useModal();
  const isHideNetwork = !networks || networks.length === 0;
  const isHideToken = !tokens || tokens.length === 0;

  const showTokensList = () => {
    if (isHideToken) return;
    setModal({
      closable: true,
      data: <ModalTokens tokens={tokens} onSelect={onSelectToken} />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Select a Token',
    });
  };

  const showNetworkList = () => {
    if (isHideNetwork) return;
    setModal({
      closable: true,
      data: <NetworkModal networks={networks} onSelect={onSelectNetwork} />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Select network',
    });
  };

  return (
    <>
      <RowBetween>
        <ThemedText.SmallLabel fontWeight={400} color="primary8">
          {title}
        </ThemedText.SmallLabel>
        {!!rightLabel && (
          <ThemedText.SmallLabel fontWeight={400} color="primary8">
            {rightLabel}
          </ThemedText.SmallLabel>
        )}
      </RowBetween>
      <MainStyled>
        <div className="section">
          <ThemedText.SmallLabel fontWeight={400} color="primary8">
            Token
          </ThemedText.SmallLabel>
          <RowBetween className={`selection-item hover-item`} onClick={showTokensList}>
            <Row>
              {!!iconUrl && <Image iconUrl={iconUrl} />}
              {!!leftValue && (
                <ThemedText.RegularLabel style={{ marginLeft: 8 }} color="primary5">
                  {leftValue}
                </ThemedText.RegularLabel>
              )}
            </Row>
            {!isHideToken && <ChevronDown size={24} />}
          </RowBetween>
        </div>
        <div className="line" />
        <div className="section">
          <ThemedText.SmallLabel fontWeight={400} color="primary8">
            Network
          </ThemedText.SmallLabel>
          <RowBetween className="selection-item hover-item" onClick={showNetworkList}>
            <Row>
              {!!currency && <Image iconUrl={ROOT_NETWORK_IMG[currency]} />}
              {!!rightValue && (
                <ThemedText.RegularLabel style={{ marginLeft: 8 }} color="primary5">
                  {rightValue}
                </ThemedText.RegularLabel>
              )}
            </Row>
            {!isHideNetwork && <ChevronDown size={24} />}
          </RowBetween>
        </div>
      </MainStyled>
    </>
  );
});

Selection.displayName = 'Selection';

export default Selection;
