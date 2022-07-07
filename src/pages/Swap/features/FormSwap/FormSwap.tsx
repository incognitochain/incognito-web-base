import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { VerticalSpace } from 'components/Core/Space';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components/macro';

import { Selection } from '../Selection';
import enhance from './FromSwap.enhance';

const Styled = styled.div``;

const FormSwap = React.memo((props: any) => {
  const { handleSubmit } = props;
  const handleSwap = () => console.log('SWAP');

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
          name={FORM_CONFIGS.formAddress}
          inputType={INPUT_FIELD.address}
          leftTitle="Address"
          componentProps={{
            placeholder: 'Your Address',
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

FormSwap.displayName = 'FormSwap';

export default enhance(FormSwap);
