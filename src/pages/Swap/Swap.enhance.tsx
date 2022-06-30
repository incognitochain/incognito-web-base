import React from 'react';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import { FORM_CONFIGS } from './Swap.constant';
import enhanceInit from './Swap.enhanceInit';

const enhance = (WrappedComponent: any) => {
  const SwapComp = (props: any) => {
    return <WrappedComponent {...{ ...props }} />;
  };
  SwapComp.displayName = 'Swap.enhance';
  return SwapComp;
};

export default compose(
  reduxForm({
    form: FORM_CONFIGS.formName,
  }),
  enhanceInit,
  enhance
) as any;
