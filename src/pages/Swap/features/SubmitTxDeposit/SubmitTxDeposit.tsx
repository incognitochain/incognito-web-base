import { ButtonConfirmed } from 'components/Core/Button';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { VerticalSpace } from 'components/Core/Space';
import React from 'react';
import { Field } from 'redux-form';

import { FORM_CONFIGS } from './SubmitTxDeposit.constant';
import enhance from './SubmitTxDeposit.enhance';

const SubmitTxDeposit = React.memo((props: any) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit(() => console.log('SNAG'))}>
      <Field
        component={InputField}
        name={FORM_CONFIGS.formName}
        inputType={INPUT_FIELD.string}
        leftTitle="TxID"
        componentProps={{
          placeholder: 'Enter Your TxID',
        }}
      />
      <VerticalSpace />
      <ButtonConfirmed type="submit">Submit</ButtonConfirmed>
    </form>
  );
});

SubmitTxDeposit.displayName = 'SubmitTxDeposit';

export default enhance(SubmitTxDeposit);
