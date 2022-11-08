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
    tokenNetwork,

    tokenAmountNum,
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
    let isTopUp = _error !== 'Required' && showShowTopUp && onTopUp;
    if (isTopUp && (_error || '').includes('larger') && tokenAmountNum) {
      isTopUp = false;
    }
    if (isTopUp) {
      _error += '';
    }
    return (
      <div style={{ position: 'absolute' }}>
        {(isError && (
          <ThemedText.Error marginTop="4px" error className={`error`} display="flex">
            {_error}
            {isTopUp && (
              <div className="selectable-error" onClick={onTopUp}>
                Deposit now
              </div>
            )}
            {isTopUp && (
              <ThemedText.Error style={{ display: 'flex' }} error>
                .
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
          {!!tokenImgUrl && <Image size={24} iconUrl={tokenImgUrl} />}
          {!!tokenSymbol && (
            <ThemedText.AvgMediumLabel
              lineHeight={'16px'}
              fontSize={16}
              style={{ marginLeft: 12, marginTop: 2 }}
              color="primary5"
            >
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
            <ThemedText.RegularLabel style={{ marginLeft: 8 }} color="text1">
              {networkName}
            </ThemedText.RegularLabel>
          )}
        </Row>
      ) : (
        <Row>
          <ThemedText.RegularLabel color="text1">{networkPlaceholder}</ThemedText.RegularLabel>
        </Row>
      )}
      {activeNetworkHover && <ArrowDown size={24} color="white" />}
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
        {/* {renderNetworkSelection()} */}
      </RowBetween>
      <Content isActive={!!active}>
        <RowBetween align="center" style={{ paddingTop: isUseInput ? 0 : 8, paddingBottom: isUseInput ? 0 : 8 }}>
          {isUseInput ? (
            <InputField {...props} isError={isError} />
          ) : (
            <ThemedText.AvgMediumLabel fontSize={22} fontWeight={600} style={{ marginRight: 8, marginLeft: 8 }}>
              {new BigNumber(receiveValue || 0).gt(0) ? receiveValue : '0.00'}
            </ThemedText.AvgMediumLabel>
          )}
          <WrapToken className={`default-padding ${activeTokensHover ? 'hover-item' : ''}`} onClick={showTokensList}>
            {renderTokenSelection()}
          </WrapToken>
        </RowBetween>
        <RowBetween align="center" className="default-padding">
          <Row style={{ width: 'fit-content' }}>
            <ThemedText.SmallLabel fontWeight={400} color="primary8">
              Balance: {amount}
            </ThemedText.SmallLabel>
            {!!tokenNetwork && (
              <ThemedText.SmallLabel fontWeight={500} className="wrap-network">
                {tokenNetwork}
              </ThemedText.SmallLabel>
            )}
          </Row>
          {renderNetworkSelection()}
          {/* {!!footerRightText && (
            <ThemedText.RegularLabel
              className={`${footerRightClass ? footerRightClass : ''}`}
              style={{ cursor: 'pointer' }}
              fontWeight={500}
              onClick={onClickFooterRight}
            >
              {footerRightText}
            </ThemedText.RegularLabel>
          )} */}
        </RowBetween>
      </Content>
      {renderError()}
    </Container>
  );
};

export default React.memo(SelectionField);
