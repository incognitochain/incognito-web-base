import { validator } from 'components/Core/ReduxForm';
import debounce from 'lodash/debounce';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { useAppDispatch } from 'state/hooks';

import { actionEstimateFee } from './FormUnshield.actions';

export interface TInner {
  validateAddress: () => any;
  warningAddress: () => string;
}

const enhanceAddressValidation = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: any) => {
    const dispatch = useAppDispatch();
    const { isExternalAddress, onChangeField, unshieldAddress, web3Account, incAddress, amount } = props;
    const getAddressValidator = React.useCallback(() => {
      return validator.combinedEtherAddress;
    }, [isExternalAddress]);

    const getWarningAddress = React.useCallback(() => null, []);

    const validateAddress = getAddressValidator();
    const warningAddress = getWarningAddress();

    const onEstimateFee = () => {
      dispatch(actionEstimateFee());
    };

    const debounceEstimateFee = debounce(onEstimateFee, 500);

    React.useEffect(() => {
      if (!unshieldAddress && web3Account && onChangeField) {
        onChangeField(web3Account, FORM_CONFIGS.toAddress);
      }

      if (unshieldAddress && isExternalAddress && incAddress) {
        debounceEstimateFee();
      }
    }, [unshieldAddress, web3Account, isExternalAddress, incAddress, amount]);

    return <WrappedComponent {...{ ...props, validateAddress, warningAddress }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceAddressValidation';
  return FormUnshieldComp;
};

export default enhanceAddressValidation;
