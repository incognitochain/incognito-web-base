import { ButtonConfirmed } from 'components/Core/Button';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { VerticalSpace } from 'components/Core/Space';
import React from 'react';
import { Field } from 'redux-form';
import { rpcClient } from 'services';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import { FORM_CONFIGS } from './SubmitTxUnshield.constant';
import enhance from './SubmitTxUnshield.enhance';

export const BottomView = styled.div`
  margin-top: 60px;
`;

const SubmitTxUnshield = React.memo((props: any) => {
  const { handleSubmit, validateAddress, validateTxhash, inputAddress, inputHash } = props;
  const [{ isLoading, isSuccess }, setState] = React.useState({ isLoading: false, isSuccess: false });
  const [error, setError] = React.useState('');

  const handleSubmitTxHash = async () => {
    try {
      setState({ isLoading: true, isSuccess: false });
      await rpcClient.submitUnshieldTx({
        paymentAddr: inputAddress,
        txID: inputHash,
      });
      setState({ isLoading: false, isSuccess: true });
    } catch (error) {
      setError(error && error.message ? error.message : error);
      setState({ isLoading: false, isSuccess: false });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleSubmitTxHash)}>
      <VerticalSpace />
      <Field
        component={InputField}
        name={FORM_CONFIGS.txHash}
        inputType={INPUT_FIELD.string}
        leftTitle="TxID"
        componentProps={{
          placeholder: 'Enter Burn TxID',
        }}
        validate={validateTxhash}
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
        validate={validateAddress}
      />
      <VerticalSpace />
      <BottomView>
        <ThemedText.Error marginBottom="4px" error className={`error`}>
          {error}
        </ThemedText.Error>
        <ButtonConfirmed type="submit">
          {isSuccess ? 'Successfully' : isLoading ? 'Submitting...' : 'Submit'}
        </ButtonConfirmed>
      </BottomView>
    </form>
  );
});

SubmitTxUnshield.displayName = 'SubmitTxUnshield';

export default enhance(SubmitTxUnshield);
