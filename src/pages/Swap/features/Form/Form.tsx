import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { Field } from 'redux-form';

const Form = React.memo((props: any) => {
  const { handleSubmit } = props;
  const handleSwap = () => console.log('SANG');
  return (
    <form onSubmit={handleSubmit(handleSwap)}>
      <Field
        component={InputField}
        name={FORM_CONFIGS.sellAmount}
        inputType={INPUT_FIELD.amount}
        componentProps={{
          placeholder: 'Amount',
          autoFocus: true,
        }}
      />
    </form>
  );
});

Form.displayName = 'FormSwap';

export default Form;
