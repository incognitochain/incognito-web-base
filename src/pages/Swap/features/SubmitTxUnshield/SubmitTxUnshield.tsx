import { ButtonConfirmed } from 'components/Core/Button';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { VerticalSpace } from 'components/Core/Space';
import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components/macro';

import { FORM_CONFIGS } from './SubmitTxUnshield.constant';
import enhance from './SubmitTxUnshield.enhance';

export const ButtonSubmit = styled(ButtonConfirmed)`
  position: absolute;
  bottom: 20px;
  right: 24px;
  left: 24px;
  width: auto;
`;

const SubmitTxUnshield = React.memo((props: any) => {
  const { handleSubmit } = props;
  return (
    <form className="form" onSubmit={handleSubmit(() => console.log('SNAG'))}>
      <VerticalSpace />
      <Field
        component={InputField}
        name={FORM_CONFIGS.txHash}
        inputType={INPUT_FIELD.string}
        leftTitle="TxID"
        componentProps={{
          placeholder: 'Enter Burn TxID',
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
      <ButtonSubmit type="submit">Submit</ButtonSubmit>
    </form>
  );
});

SubmitTxUnshield.displayName = 'SubmitTxUnshield';

export default enhance(SubmitTxUnshield);
