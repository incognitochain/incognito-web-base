/* eslint-disable react/no-unknown-property */
import { InputField, validator } from 'components/Core/ReduxForm';
import React, { memo } from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components/macro';

import { FORM_BUY_POPENSEA } from '../POpenseaNFTDetail.constant';

export const Styled = styled.div`
  margin-top: 8px;
  width: 100%;

  .note {
    font-size: 12px;
    margin-top: 8px;
    color: gray;
  }
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
          name={FORM_BUY_POPENSEA.recipitentAddress}
          componentProps={{
            placeholder: 'Recipient Address',
          }}
          validate={validateAddress}
        />
      </form>
      <p className="note">
        (*) this is an Ethereum address that the buying NFT will be sent to, we recommend using a fresh address here to
        maximize your anonymity.
      </p>
    </Styled>
  );
};

export default reduxForm({
  form: FORM_BUY_POPENSEA.formName,
  destroyOnUnmount: false,
})(memo(ReciptientAddress));
