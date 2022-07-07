import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import enhanceAddressValidation from './FormDeposit.enhanceAddressValidator';
import enhanceSelect from './FormDeposit.enhanceSelect';
import { useDeposit } from './FormDeposit.hook';

const enhanceInit = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    const data = useDeposit();
    return <WrappedComponent {...{ ...props, ...data }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhanceInit';
  return FormDepositComp;
};

export default compose(
  reduxForm({
    form: FORM_CONFIGS.formName,
  }),
  enhanceInit,
  enhanceAddressValidation,
  enhanceSelect
) as any;
