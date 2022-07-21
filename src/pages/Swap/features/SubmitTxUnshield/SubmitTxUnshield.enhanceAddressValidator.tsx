import { validator } from 'components/Core/ReduxForm';
import React from 'react';
import { formValueSelector } from 'redux-form';
import { useAppSelector } from 'state/hooks';

import { FORM_CONFIGS } from './SubmitTxUnshield.constant';

const enhanceAddressValidation = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    const formSelector = formValueSelector(FORM_CONFIGS.formName);
    const inputAddress = useAppSelector((state) => formSelector(state, FORM_CONFIGS.address));

    const getAddressValidator = () => {
      return validator.combinedIncognitoAddress;
    };

    const validateAddress = getAddressValidator();

    return <WrappedComponent {...{ ...props, validateAddress, inputAddress }} />;
  };
  FormDepositComp.displayName = 'FormUnshield.enhanceAddressValidation';
  return FormDepositComp;
};

export default enhanceAddressValidation;
