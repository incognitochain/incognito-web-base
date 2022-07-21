import { validator } from 'components/Core/ReduxForm';
import React from 'react';
import { formValueSelector } from 'redux-form';
import { useAppSelector } from 'state/hooks';

import { FORM_CONFIGS } from './SubmitTxUnshield.constant';

const enhanceHashValidation = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    const formSelector = formValueSelector(FORM_CONFIGS.formName);
    const inputHash = useAppSelector((state) => formSelector(state, FORM_CONFIGS.txHash));

    const getTxhashValidator = () => {
      return [validator.required, validator.minLength(20)];
    };

    const validateTxhash = getTxhashValidator();

    return <WrappedComponent {...{ ...props, validateTxhash, inputHash }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhanceHashValidation';
  return FormDepositComp;
};

export default enhanceHashValidation;
