/* eslint-disable react/no-unknown-property */
import { InputField, validator } from 'components/Core/ReduxForm';
import React, { memo } from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components/macro';

export const FORM_NAME = 'Reciptient';
export const FIELD_NAME = 'ReciptientAddress';

export const Styled = styled.div`
  margin-top: 8px;
  width: 100%;
`;

const ReciptientAddress = () => {
  const getAddressValidator = React.useCallback(() => {
    return validator.combinedEtherAddress;
  }, []);
  const validateAddress = getAddressValidator();

  return (
    <Styled>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Field
          component={InputField}
          name={FIELD_NAME}
          inputType={FIELD_NAME}
          componentProps={{
            placeholder: 'Recipient Address',
          }}
          validate={validateAddress}
        />
      </form>
    </Styled>
  );
};

export default reduxForm({
  form: FORM_NAME,
  destroyOnUnmount: false,
})(memo(ReciptientAddress));
