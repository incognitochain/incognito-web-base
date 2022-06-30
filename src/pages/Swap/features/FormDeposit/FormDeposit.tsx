import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { VerticalSpace } from 'components/Core/Space';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components/macro';

import { Selection } from '../Selection';

const Styled = styled.div``;

const FormDeposit = React.memo((props: any) => {
  const { handleSubmit } = props;
  const handleDeposit = () => console.log('DEPOSIT');

  return (
    <Styled>
      <form onSubmit={handleSubmit(handleDeposit)}>
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
        <VerticalSpace />
        <Selection title="Form" />
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
      </form>
    </Styled>
  );
});

FormDeposit.displayName = 'FormDeposit';

export default FormDeposit;
