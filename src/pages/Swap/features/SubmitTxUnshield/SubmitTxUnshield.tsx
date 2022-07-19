import { ButtonConfirmed } from 'components/Core/Button';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { VerticalSpace } from 'components/Core/Space';
import React from 'react';
import { Field } from 'redux-form';

import { FORM_CONFIGS } from './SubmitTxUnshield.constant';
import enhance from './SubmitTxUnshield.enhance';

const SubmitTxUnshield = React.memo((props: any) => {
  const { handleSubmit } = props;
  return (
    <>
      <form onSubmit={handleSubmit(() => console.log('SNAG'))}>
        <Field
          component={InputField}
          name={FORM_CONFIGS.txHash}
          inputType={INPUT_FIELD.string}
          leftTitle="TxID"
          componentProps={{
            placeholder: 'Enter Your TxID',
          }}
        />
        <VerticalSpace />
        <Field
          component={InputField}
          name={FORM_CONFIGS.address}
          inputType={INPUT_FIELD.string}
          leftTitle="Incognito Address"
          componentProps={{
            placeholder: 'Enter Your Incognito Address',
          }}
        />
        <VerticalSpace />
        <ButtonConfirmed type="submit">Submit</ButtonConfirmed>
      </form>
    </>
  );
});

SubmitTxUnshield.displayName = 'SubmitTxUnshield';

export default enhance(SubmitTxUnshield);
