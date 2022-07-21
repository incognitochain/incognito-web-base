import React from 'react';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import { FORM_CONFIGS } from './SubmitTxUnshield.constant';
import enhanceAddressValidation from './SubmitTxUnshield.enhanceAddressValidator';
import enhanceChangeField from './SubmitTxUnshield.enhanceChangeField';
import enhanceHashValidation from './SubmitTxUnshield.enhanceHashValidator';

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
    destroyOnUnmount: false,
  }),
  enhanceChangeField,
  enhanceAddressValidation,
  enhanceHashValidation,
  enhance
) as any;
