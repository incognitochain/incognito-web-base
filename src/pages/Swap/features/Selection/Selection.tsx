import { Image } from 'components/Core/Image';
import Row, { RowBetween } from 'components/Core/Row';
import { NetworkModal, useModal } from 'components/Modal';
import ModalTokens from 'components/Modal/Modal.tokens';
import { MAIN_NETWORK_NAME_ICON } from 'constants/token';
import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import React from 'react';
import { ChevronDown } from 'react-feather';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

interface ISelection {
  title: string;
  leftPlaceholder?: string;
  rightPlaceholder?: string;
  rightLabel?: string;
  rightValue?: string;
  leftValue?: string;
  iconUrl?: string;
  currency?: number;
  tokens?: PToken[];
  networks?: ITokenNetwork[];
  onSelectToken?: ({ token }: { token: PToken }) => void;
  showNetwork?: boolean;
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
    padding: 16px 16px 4px 16px;
    flex: 1;
  }
  .selection-item {
    width: 100%;
    cursor: pointer;
    padding-top: 12px;
    padding-bottom: 12px;
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
      transform: scale(1);
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
    leftPlaceholder,
    rightPlaceholder,
    leftValue,
    tokens,
    onSelectToken,
    networks,
    onSelectNetwork,
    currency,
    showNetwork = false,
  } = props;
  const { setModal } = useModal();
  const isHideNetwork = !networks || networks.length === 0;
  const isHideToken = !tokens || tokens.length === 0;

  const showTokensList = () => {
    if (isHideToken) return;
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
    if (isHideNetwork) return;
    setModal({
      closable: true,
      data: <NetworkModal networks={networks} onSelect={onSelectNetwork} />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Select network',
    });
  };

  const activeNetworkHover = !!(networks && networks.length > 0);
  const activeTokensHover = !!(tokens && tokens.length > 0);

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
          <RowBetween className={`selection-item ${activeTokensHover ? 'hover-item' : ''} `} onClick={showTokensList}>
            {leftValue ? (
              <Row>
                {!!iconUrl && <Image iconUrl={iconUrl} />}
                {!!leftValue && (
                  <ThemedText.RegularLabel style={{ marginLeft: 8 }} color="primary5">
                    {leftValue}
                  </ThemedText.RegularLabel>
                )}
              </Row>
            ) : (
              <Row>
                <ThemedText.RegularLabel color="primary8">{leftPlaceholder}</ThemedText.RegularLabel>
              </Row>
            )}
            {!isHideToken && <ChevronDown size={24} />}
          </RowBetween>
        </div>
        <div className="line" />
        <div className="section">
          <ThemedText.SmallLabel fontWeight={400} color="primary8">
            Network
          </ThemedText.SmallLabel>
          <RowBetween className={`selection-item ${activeNetworkHover ? 'hover-item' : ''}`} onClick={showNetworkList}>
            {rightValue ? (
              <Row>
                {currency !== undefined && currency !== null && (
                  <Image border={false} iconUrl={MAIN_NETWORK_NAME_ICON[rightValue]} />
                )}
                {!!rightValue && (
                  <ThemedText.RegularLabel style={{ marginLeft: 8 }} color="primary5">
                    {rightValue}
                  </ThemedText.RegularLabel>
                )}
              </Row>
            ) : (
              <Row>
                <ThemedText.RegularLabel color="primary8">{rightPlaceholder}</ThemedText.RegularLabel>
              </Row>
            )}
            {!isHideNetwork && <ChevronDown size={24} />}
          </RowBetween>
        </div>
      </MainStyled>
    </>
  );
});

Selection.displayName = 'Selection';

export default Selection;
