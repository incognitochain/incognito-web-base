import { validator } from 'components/Core/ReduxForm';
import React from 'react';

import { WrappedComponentType } from './FormSend.types';

export interface TInner {
  validateAddress: () => any;
  warningAddress: () => string;
}

const enhanceAddressValidation = (WrappedComponent: WrappedComponentType) => {
  const FormSendComp = (props: any) => {
    const { isIncognitoAddress } = props;

    const getAddressValidator = React.useCallback(() => {
      return validator.combinedIncognitoAddress;
    }, [isIncognitoAddress]);

    const validateAddress = getAddressValidator();

    return <WrappedComponent {...{ ...props, validateAddress }} />;
  };
  FormSendComp.displayName = 'FormSend.enhanceAddressValidation';
  return FormSendComp;
};

export default enhanceAddressValidation;
