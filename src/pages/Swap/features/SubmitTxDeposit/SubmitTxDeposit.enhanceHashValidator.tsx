import { validator } from 'components/Core/ReduxForm';
import React from 'react';
import { formValueSelector } from 'redux-form';
import { useAppSelector } from 'state/hooks';

import { FORM_CONFIGS } from './SubmitTxDeposit.constant';

const enhanceHashValidation = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    const formSelector = formValueSelector(FORM_CONFIGS.formName);
    const inputTxHash = useAppSelector((state) => formSelector(state, FORM_CONFIGS.txHash));

    const getTxhashValidator = () => {
      return validator.combinedOutchainHash;
    };

    const validateTxhash = getTxhashValidator();

    return <WrappedComponent {...{ ...props, validateTxhash, inputTxHash }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhanceHashValidation';
  return FormDepositComp;
};

export default enhanceHashValidation;
