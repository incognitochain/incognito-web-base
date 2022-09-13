import { ButtonConfirmed } from 'components/Core/Button';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { VerticalSpace } from 'components/Core/Space';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import { Selection } from 'pages/Swap/features/Selection';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Field } from 'redux-form';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import { EstReceive } from '../EstReceive';
import { actionSetExchangeSelected } from './FormUnshield.actions';
import enhance, { IMergeProps } from './FormUnshield.enhance';
import { FormTypes } from './FormUnshield.types';

const Styled = styled.div``;

const FormUnshield = React.memo((props: IMergeProps) => {
  const {
    handleSubmit,
    sellToken,
    sellTokenList,
    buyParentToken,
    buyToken,
    buyTokenList,
    buyNetworkList,
    buyCurrency,
    buyNetworkName,
    userBalanceFormatedText,
    button,
    inputAmount,
    networkFeeText,
    burnFeeText,

    validateAddress,
    warningAddress,
    onSelectSellToken,
    onSelectBuyToken,
    onSelectBuyNetwork,
    validateAmount,
    onClickMax,
    onSend,

    fee,
    formType,
    exchangeSelected,
    estReceiveAmount,
    exchangeSupports,
    tradePaths,
    estimateTradeErrorMsg,
    swapFee,
  } = props;

  const { showPopup } = useIncognitoWallet();

  const _buttonAction = () => showPopup();

  const dispatch = useDispatch();

  const onSelectExchange = (exchangeName: any) => {
    dispatch(actionSetExchangeSelected(exchangeName));
  };

  return (
    <Styled>
      <form onSubmit={handleSubmit(onSend)}>
        <VerticalSpace />
        <Selection
          title="From"
          currency={PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN}
          rightValue={MAIN_NETWORK_NAME.INCOGNITO}
          tokens={sellTokenList}
          leftValue={sellToken.symbol}
          iconUrl={sellToken.iconUrl}
          onSelectToken={onSelectSellToken}
          showNetwork={true}
        />
        <VerticalSpace />
        <Selection
          title="To"
          leftPlaceholder="Select token"
          rightPlaceholder="Select network"
          leftValue={buyParentToken.symbol}
          tokens={buyTokenList}
          iconUrl={buyParentToken.iconUrl}
          networks={buyNetworkList}
          currency={buyCurrency}
          rightValue={buyNetworkName}
          onSelectToken={onSelectBuyToken}
          onSelectNetwork={onSelectBuyNetwork}
          showNetwork={true}
        />
        <VerticalSpace />
        <Field
          component={InputField}
          name={FORM_CONFIGS.toAddress}
          inputType={INPUT_FIELD.address}
          leftTitle="Address"
          componentProps={{
            placeholder: 'Your External Address',
          }}
          validate={validateAddress}
          warning={warningAddress}
        />
        <VerticalSpace />
        <Field
          component={InputField}
          name={FORM_CONFIGS.sellAmount}
          inputType={INPUT_FIELD.amount}
          leftTitle="Total amount"
          rightTitle={userBalanceFormatedText}
          showIcon={true}
          componentProps={{
            placeholder: 'Amount',
            type: 'number',
          }}
          validate={validateAmount}
          onClickMax={onClickMax}
        />
        <VerticalSpace />
        <Field
          component={InputField}
          name={FORM_CONFIGS.slippage}
          inputType={INPUT_FIELD.amount}
          leftTitle="Slippage tolerance (%)"
          componentProps={{
            placeholder: 'Percent',
            type: 'number',
          }}
        />
        <VerticalSpace />
        <EstReceive
          amountText={formType === FormTypes.SWAP ? estReceiveAmount?.toString() : inputAmount}
          symbol={buyToken.symbol || ''}
          networkFee={networkFeeText}
          burnFeeText={burnFeeText}
          time={fee.extraFee && sellToken.isUnified ? '12' : '2'}
          exchanges={exchangeSupports}
          exchangeSelected={exchangeSelected}
          onSelectExchange={onSelectExchange}
          formType={formType}
          tradePaths={tradePaths}
          swapFee={swapFee}
        />
        <VerticalSpace />
        {estimateTradeErrorMsg && (
          <>
            <ThemedText.Error marginTop="4px" error className={`error`}>
              {estimateTradeErrorMsg}
            </ThemedText.Error>
            <VerticalSpace />
          </>
        )}
        {button.isConnected ? (
          <ButtonConfirmed type="submit">{button.text}</ButtonConfirmed>
        ) : (
          <ButtonConfirmed onClick={_buttonAction}>{button.text}</ButtonConfirmed>
        )}
      </form>
    </Styled>
  );
});

FormUnshield.displayName = 'FormUnshield';

export default enhance(FormUnshield);
