import { validator } from 'components/Core/ReduxForm';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';

export interface TInner {
  validateAddress: () => any;
  warningAddress: () => string;
}

const enhanceAddressValidation = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: any) => {
    const { isExternalAddress, onChangeField, incAccount } = props;
    const getAddressValidator = React.useCallback(() => {
      return validator.combinedEtherAddress;
    }, [isExternalAddress]);

    const getWarningAddress = React.useCallback(() => null, []);

    const validateAddress = getAddressValidator();
    const warningAddress = getWarningAddress();

    React.useEffect(() => {
      if (incAccount && incAccount.paymentAddress && onChangeField) {
        onChangeField(incAccount.paymentAddress, FORM_CONFIGS.toAddress);
      }
    }, [incAccount]);

    return <WrappedComponent {...{ ...props, validateAddress, warningAddress }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceAddressValidation';
  return FormUnshieldComp;
};

export default enhanceAddressValidation;
