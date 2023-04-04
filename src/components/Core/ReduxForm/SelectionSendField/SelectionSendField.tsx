import SelectPaymentIconSrc from 'assets/svg/ic-select-payment-address.svg';
import Row, { RowBetween } from 'components/Core/Row';
import { useModal } from 'components/Modal';
import React from 'react';
import { BaseFieldProps } from 'redux-form';
import { ThemedText } from 'theme';

import InputField from './SectionSendField.input';
import { ISelectionFieldProps } from './SelectionSendField.interface';
import { Container, Content } from './SelectionSendField.styled';

const SelectionSendField = (props: ISelectionFieldProps & BaseFieldProps) => {
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
    tokenType,
    componentProps,

    bodyRightView = undefined,
    maxButtonOnClick,
    selectPaymentAddressButtonOnClick,

    disabled = false,
    feeSymbol = undefined,
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
    let isTopUp = _error !== 'Required' && onTopUp;
    if (isTopUp && (_error || '').includes('larger') && tokenAmountNum) {
      isTopUp = false;
    }
    if (isTopUp) {
      _error += '';
    }
    return (
      <div>
        {(isError && (
          <ThemedText.Error fontWeight={400} fontSize={14} error className={`error`} display="flex">
            {_error}
            {isTopUp && (
              <div className="selectable-error" onClick={onTopUp}>
                Shield now
              </div>
            )}
            {isTopUp && (
              <ThemedText.Error fontWeight={400} fontSize={14} style={{ display: 'flex' }} error>
                .
              </ThemedText.Error>
            )}
          </ThemedText.Error>
        )) ||
          (isWarning && (
            <ThemedText.Warning fontWeight={400} fontSize={14} warning className={`warning`}>
              {warning}
            </ThemedText.Warning>
          ))}
      </div>
    );
  };

  const { setModal } = useModal();

  const renderHeaderTitle = () =>
    headerTitle ? (
      <ThemedText.RegularLabel fontWeight={500} color="primary8">
        {headerTitle}
      </ThemedText.RegularLabel>
    ) : undefined;

  const renderHeaderRightView = () =>
    tokenSymbol ? (
      <ThemedText.RegularLabel fontWeight={500} color="primary8">
        {`${amount || '0.00'} ${tokenSymbol}`}
      </ThemedText.RegularLabel>
    ) : undefined;

  const renderHeaderView = () => {
    return (
      <RowBetween>
        {renderHeaderTitle()}
        {renderHeaderRightView()}
      </RowBetween>
    );
  };
  const renderBodyView = () => {
    return (
      <RowBetween>
        <InputField
          {...props}
          componentProps={{
            style: {
              fontSize: 18,
              fontWeight: '500',
            },
            onKeyDown: (e: any) => {
              if (e.keyCode === 9) e.preventDefault();
            },
            ...componentProps,
          }}
          isError={isError}
          fontSize={29}
        />
        {maxButtonOnClick && (
          <ThemedText.RegularLabel
            className={`${footerRightClass ? footerRightClass : 'max-text'}`}
            style={{ cursor: 'pointer' }}
            fontWeight={500}
            onClick={maxButtonOnClick}
          >
            {'MAX'}
          </ThemedText.RegularLabel>
        )}

        {selectPaymentAddressButtonOnClick && (
          <div key="info" className="hover-opacity center" onClick={selectPaymentAddressButtonOnClick}>
            <img alt="ic-select-payment-address" src={SelectPaymentIconSrc} />
          </div>
        )}

        {feeSymbol && (
          <ThemedText.RegularLabel fontWeight={500} color="primary8">
            {feeSymbol}
          </ThemedText.RegularLabel>
        )}
      </RowBetween>
    );
  };
  const renderErrorView = () => {
    if (!isError) return null;
    return (
      <>
        <div style={{ height: '6px' }} />
        <RowBetween align="center">
          <Row style={{ width: 'fit-content' }}>{renderError()}</Row>
        </RowBetween>
      </>
    );
  };

  return (
    <Container className={`${className ? className : ''}`}>
      {renderHeaderView()}
      <Content isActive={!!active}>
        {renderBodyView()}
        {renderErrorView()}
      </Content>
    </Container>
  );
};

export default React.memo(SelectionSendField);
