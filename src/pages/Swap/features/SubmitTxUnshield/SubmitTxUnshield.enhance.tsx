import React from 'react';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import { FORM_CONFIGS } from './SubmitTxUnshield.constant';

const enhance = (WrappedComponent: any) => {
  const SubmitTxUnshield = (props: any) => {
    return <WrappedComponent {...{ ...props }} />;
  };
  SubmitTxUnshield.displayName = 'SubmitTxUnshield.enhance';
  return SubmitTxUnshield;
};

export default compose(
  reduxForm({
    form: FORM_CONFIGS.formName,
  }),
  enhance
) as any;
