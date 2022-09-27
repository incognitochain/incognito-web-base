import { validator } from 'components/Core/ReduxForm';
import { MAIN_NETWORK_NAME } from 'constants/token';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';

import { FormTypes } from './FormUnshield.types';

export interface TInner {
  validateAddress: () => any;
  warningAddress: () => string;
}

const enhanceAddressValidation = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: any) => {
    const refCountChangeField = React.useRef<any>(null);
    const {
      isExternalAddress,
      onChangeField,
      unshieldAddress,
      web3Account,
      incAddress,
      inputAmount,
      buyToken,
      formType,
      buyNetworkName,
    } = props;
    const getAddressValidator = React.useCallback(() => {
      if (formType === FormTypes.UNSHIELD) {
        return validator.combinedEtherAddress;
      } else {
        if (buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO) {
          return validator.combinedIncognitoAddress;
        } else {
          return validator.combinedEtherAddress;
        }
      }
    }, [isExternalAddress, formType, buyNetworkName]);

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
      formType,
    ]);

    return <WrappedComponent {...{ ...props, validateAddress, warningAddress }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceAddressValidation';
  return FormUnshieldComp;
};

export default enhanceAddressValidation;
