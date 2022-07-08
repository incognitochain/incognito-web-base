import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import enhanceAddressValidation from './FormDeposit.enhanceAddressValidator';
import enhanceAmountValidator from './FormDeposit.enhanceAmountValidator';
import enhanceInit from './FormDeposit.enhanceInit';
import enhanceSelect from './FormDeposit.enhanceSelect';
import enhanceDeposit from './FormDeposit.enhanceSend';

const enhance = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    return <WrappedComponent {...{ ...props }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhance';
  return FormDepositComp;
};

export default compose(
  reduxForm({
    form: FORM_CONFIGS.formName,
  }),
  enhanceInit,
  enhanceAddressValidation,
  enhanceAmountValidator,
  enhanceSelect,
  enhanceDeposit,
  enhance
) as any;
