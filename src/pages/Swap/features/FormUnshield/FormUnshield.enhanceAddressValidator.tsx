import { validator } from 'components/Core/ReduxForm';
import React from 'react';

import { FORM_CONFIGS } from '../../Swap.constant';

export interface TInner {
  validateAddress: () => any;
  warningAddress: () => string;
}

const enhanceAddressValidation = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: any) => {
    const { isExternalAddress, onChangeField, unshieldAddress, web3Account } = props;
    const getAddressValidator = React.useCallback(() => {
      return validator.combinedEtherAddress;
    }, [isExternalAddress]);

    const getWarningAddress = React.useCallback(() => null, []);

    const validateAddress = getAddressValidator();
    const warningAddress = getWarningAddress();

    React.useEffect(() => {
      if (!unshieldAddress && web3Account && onChangeField) {
        onChangeField(web3Account, FORM_CONFIGS.toAddress);
      }
    }, [unshieldAddress, web3Account]);

    return <WrappedComponent {...{ ...props, validateAddress, warningAddress }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceAddressValidation';
  return FormUnshieldComp;
};

export default enhanceAddressValidation;
