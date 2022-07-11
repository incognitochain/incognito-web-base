import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import enhanceChangeField from 'pages/Swap/Swap.enhanceChangeField';
import React from 'react';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import enhanceInit from './FormUnshield.enhanceInit';

const enhance = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: any) => {
    return <WrappedComponent {...{ ...props }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhance';
  return FormUnshieldComp;
};

export default compose(
  reduxForm({
    form: FORM_CONFIGS.formName,
  }),
  enhanceInit,
  enhanceChangeField,
  enhance
) as any;
