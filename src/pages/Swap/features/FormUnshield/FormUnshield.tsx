import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { VerticalSpace } from 'components/Core/Space';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import { Selection } from 'pages/Swap/features/Selection';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components/macro';

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

    validateAddress,
    warningAddress,
    onSelectToken,
    onSelectNetwork,
  } = props;
  const handleSwap = () => console.log('SWAP');
  return (
    <Styled>
      <form onSubmit={handleSubmit(handleSwap)}>
        <VerticalSpace />
        <Selection
          title="From"
          currency={PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN}
          rightValue={MAIN_NETWORK_NAME.INCOGNITO}
          tokens={sellTokenList}
          leftValue={sellToken.symbol}
          iconUrl={sellToken.iconUrl}
          onSelectToken={onSelectToken}
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
          componentProps={{
            placeholder: 'Amount',
          }}
        />
      </form>
    </Styled>
  );
});

FormUnshield.displayName = 'FormUnshield';

export default enhance(FormUnshield);
