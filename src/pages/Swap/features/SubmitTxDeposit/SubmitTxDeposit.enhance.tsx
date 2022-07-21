import React from 'react';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import { FORM_CONFIGS } from './SubmitTxDeposit.constant';
import enhanceHashValidation from './SubmitTxDeposit.enhanceHashValidator';

const enhance = (WrappedComponent: any) => {
  const SubmitTxDeposit = (props: any) => {
    return <WrappedComponent {...{ ...props }} />;
  };
  SubmitTxDeposit.displayName = 'SubmitTxDeposit.enhance';
  return SubmitTxDeposit;
};

export default compose(
  reduxForm({
    form: FORM_CONFIGS.formName,
    destroyOnUnmount: false,
  }),
  enhanceHashValidation,
  enhance
) as any;
