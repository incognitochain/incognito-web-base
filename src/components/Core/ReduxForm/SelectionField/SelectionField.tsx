import { BigNumber } from 'bignumber.js';
import { Image } from 'components/Core/Image';
import Row, { RowBetween } from 'components/Core/Row';
import { NetworkModal, useModal } from 'components/Modal';
import ModalTokens from 'components/Modal/Modal.tokens';
import { MAIN_NETWORK_NAME_ICON } from 'constants/token';
import React from 'react';
import { ThemedText } from 'theme';

import InputField from './SectionField.input';
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

    className,

    warning,
    meta,
    isUseInput = true,
    receiveValue = '0',
    footerRightText,
    onClickFooterRight,
    footerRightClass,
    showShowTopUp = false,
    onTopUp,
  } = props;

  const { error: errorMeta, touched, submitting, active } = meta;
  const error = errorMeta;
  const isError = React.useMemo(() => {
    return touched && error;
  }, [touched, error]);

  const isWarning = React.useMemo(() => {
    return touched && warning;
  }, [touched, warning]);

  const renderError = () => {
    if (submitting) {
      return null;
    }
    let _error = error;
    const isTopUp = _error !== 'Required' && showShowTopUp && onTopUp;
    if (isTopUp) {
      _error += ', please';
    }
    return (
      <div style={{ position: 'absolute' }}>
        {(isError && (
          <ThemedText.Error marginTop="4px" error className={`error`} display="flex">
            {_error}
            {isTopUp && (
              <div className="selectable-error" onClick={onTopUp}>
                top up
              </div>
            )}
            {isTopUp && (
              <ThemedText.Error style={{ display: 'flex', marginLeft: '4px' }} error>
                your crypto.
              </ThemedText.Error>
            )}
          </ThemedText.Error>
        )) ||
          (isWarning && (
            <ThemedText.Warning marginTop="4px" warning className={`warning`}>
              {warning}
            </ThemedText.Warning>
          ))}
      </div>
    );
  };

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
    <Container className={`${className ? className : ''}`} style={{ marginBottom: isError ? 10 : 0 }}>
      <RowBetween>
        {renderHeaderTitle()}
        {renderNetworkSelection()}
      </RowBetween>
      <Content isActive={!!active}>
        <RowBetween>
          <WrapToken className={`default-padding ${activeTokensHover ? 'hover-item' : ''}`} onClick={showTokensList}>
            {renderTokenSelection()}
          </WrapToken>
          {isUseInput ? (
            <InputField {...props} isError={isError} />
          ) : (
            <ThemedText.AvgMediumLabel fontSize={22} fontWeight={600}>
              {new BigNumber(receiveValue || 0).gt(0) ? receiveValue : '0.00'}
            </ThemedText.AvgMediumLabel>
          )}
        </RowBetween>
        <RowBetween className="default-padding">
          <ThemedText.SmallLabel fontWeight={400} color="primary8">
            Balance: {amount}
          </ThemedText.SmallLabel>
          {!!footerRightText && (
            <ThemedText.RegularLabel
              className={`${footerRightClass ? footerRightClass : ''}`}
              style={{ cursor: 'pointer' }}
              fontWeight={500}
              onClick={onClickFooterRight}
            >
              {footerRightText}
            </ThemedText.RegularLabel>
          )}
        </RowBetween>
      </Content>
      {renderError()}
    </Container>
  );
};

export default React.memo(SelectionField);
