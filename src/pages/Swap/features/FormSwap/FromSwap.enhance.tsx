import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

const enhance = (WrappedComponent: any) => {
  const FormSwapComp = (props: any) => {
    return <WrappedComponent {...{ ...props }} />;
  };
  FormSwapComp.displayName = 'FormSwap.enhance';
  return FormSwapComp;
};

export default compose(
  reduxForm({
    form: FORM_CONFIGS.formName,
  }),
  enhance
) as any;
