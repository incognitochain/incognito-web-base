import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components/macro';

const Styled = styled.div`
  .wrap-input-panel {
    margin-top: 16px;
  }
`;

const FormSwap = React.memo((props: any) => {
  const { handleSubmit } = props;
  const handleSwap = () => console.log('SWAP');

  const renderFormDeposit = () => {
    return (
      <>
        <Field
          component={InputField}
          name={FORM_CONFIGS.sellAmount}
          inputType={INPUT_FIELD.amount}
          leftTitle="Total amount"
          componentProps={{
            placeholder: 'Amount',
          }}
        />
        <Field
          component={InputField}
          name={FORM_CONFIGS.formAddress}
          inputType={INPUT_FIELD.address}
          leftTitle="Address"
          componentProps={{
            placeholder: 'Your Address',
          }}
        />
      </>
    );
  };

  const renderForm = () => null;

  return (
    <Styled>
      <form onSubmit={handleSubmit(handleSwap)}>
        <Field
          component={InputField}
          name={FORM_CONFIGS.formAddress}
          inputType={INPUT_FIELD.address}
          leftTitle="Address"
          componentProps={{
            placeholder: 'Your Address',
          }}
        />
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

export default FormSwap;
