import { ButtonConfirmed } from 'components/Core/Button';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { VerticalSpace } from 'components/Core/Space';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import { Selection } from 'pages/Swap/features/Selection';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components/macro';

import { EstReceive } from '../EstReceive';
import enhance, { IMergeProps } from './FormUnshield.enhance';

const Styled = styled.div``;

const FormUnshield = React.memo((props: IMergeProps) => {
  const {
    handleSubmit,
    sellToken,
    sellTokenList,
    buyToken,
    buyNetworkList,
    buyCurrency,
    buyNetworkName,
    userAmountFormatedText,
    buttonText,
    inputAmount,
    networkFeeText,
    burnFeeText,

    validateAddress,
    warningAddress,
    onSelectToken,
    onSelectNetwork,
    validateAmount,
    onClickMax,
    onSend,
  } = props;

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
          onSelectToken={onSelectToken}
          showNetwork={true}
        />
        <VerticalSpace />
        <Selection
          title="To"
          leftValue={buyToken.symbol}
          iconUrl={buyToken.iconUrl}
          networks={buyNetworkList}
          currency={buyCurrency}
          rightValue={buyNetworkName}
          onSelectNetwork={onSelectNetwork}
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
          rightTitle={userAmountFormatedText}
          componentProps={{
            placeholder: 'Amount',
            type: 'number',
          }}
          validate={validateAmount}
          onClickMax={onClickMax}
        />
        <VerticalSpace />
        <EstReceive
          amountText={inputAmount}
          symbol={buyToken.symbol || ''}
          networkFee={networkFeeText}
          burnFeeText={burnFeeText}
        />
        <VerticalSpace />
        <ButtonConfirmed type="submit">{buttonText}</ButtonConfirmed>
      </form>
    </Styled>
  );
});

FormUnshield.displayName = 'FormUnshield';

export default enhance(FormUnshield);
