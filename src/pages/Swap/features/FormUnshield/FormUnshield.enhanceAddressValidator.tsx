import { validator } from 'components/Core/ReduxForm';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';

export interface TInner {
  validateAddress: () => any;
  warningAddress: () => string;
}

const enhanceAddressValidation = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: any) => {
    const refCountChangeField = React.useRef<any>(null);
    const { isExternalAddress, onChangeField, unshieldAddress, web3Account, incAddress, inputAmount, buyToken } = props;
    const getAddressValidator = React.useCallback(() => {
      return validator.combinedEtherAddress;
    }, [isExternalAddress]);

    const getWarningAddress = React.useCallback(() => null, []);

    const validateAddress = getAddressValidator();
    const warningAddress = getWarningAddress();

    React.useEffect(() => {
      if (!unshieldAddress && web3Account && onChangeField && !refCountChangeField.current) {
        onChangeField(web3Account, FORM_CONFIGS.toAddress);
        refCountChangeField.current = true;
      }
    }, [
      unshieldAddress,
      web3Account,
      isExternalAddress,
      incAddress,
      inputAmount,
      buyToken.tokenID,
      refCountChangeField.current,
    ]);

    return <WrappedComponent {...{ ...props, validateAddress, warningAddress }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceAddressValidation';
  return FormUnshieldComp;
};

export default enhanceAddressValidation;
