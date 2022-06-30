import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { Field } from 'redux-form';

const Form = React.memo((props: any) => {
  const { handleSubmit, onChangeField } = props;
  const handleSwap = () => console.log('SWAP');
  return (
    <form onSubmit={handleSubmit(handleSwap)}>
      <Field
        onChange={(e: any) => onChangeField(e, FORM_CONFIGS.formAddress)}
        component={InputField}
        name={FORM_CONFIGS.formAddress}
        inputType={INPUT_FIELD.address}
        leftTitle="Address"
        componentProps={{
          placeholder: 'Your Address',
        }}
      />
    </form>
  );
});

Form.displayName = 'FormSwap';

export default Form;
