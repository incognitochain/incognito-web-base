import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { VerticalSpace } from 'components/Core/Space';
import { Selection } from 'pages/Swap/features/Selection';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components/macro';

import enhance from './FormUnshield.enhance';
import { useUnshield } from './FormUnshield.hook';

const Styled = styled.div``;

const FormUnshield = React.memo((props: any) => {
  const { handleSubmit } = props;
  const handleSwap = () => console.log('SWAP');
  const data = useUnshield();
  return (
    <Styled>
      <form onSubmit={handleSubmit(handleSwap)}>
        <VerticalSpace />
        <Selection title="From" />
        <VerticalSpace />
        <Selection title="To" />
        <VerticalSpace />
        <Field
          component={InputField}
          name={FORM_CONFIGS.toAddress}
          inputType={INPUT_FIELD.address}
          leftTitle="Address"
          componentProps={{
            placeholder: 'Your External Address',
          }}
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
