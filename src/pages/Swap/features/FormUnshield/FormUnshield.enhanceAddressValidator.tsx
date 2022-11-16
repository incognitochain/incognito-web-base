import { validator } from 'components/Core/ReduxForm';
import { MAIN_NETWORK_NAME } from 'constants/token';
import React from 'react';

import { FormTypes } from './FormUnshield.types';

export interface TInner {
  validateAddress: () => any;
  warningAddress: () => string;
}

const enhanceAddressValidation = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: any) => {
    const { isExternalAddress, buyToken, formType, buyNetworkName } = props;

    const getAddressValidator = React.useCallback(() => {
      if (formType === FormTypes.UNSHIELD) {
        if (buyToken.isBTC || buyToken.isCentralized) {
          return validator.combinedCentralizedAddress;
        }
        if (buyToken.isNearToken || buyToken.isMainNEAR) {
          return validator.combinedNearAddress;
        }
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

    // React.useEffect(() => {
    //   if (!unshieldAddress && web3Account && onChangeField && !refCountChangeField.current) {
    //     onChangeField(web3Account, FORM_CONFIGS.toAddress);
    //     refCountChangeField.current = true;
    //   }
    //   // isEtherAddress
    //   // isPaymentAddress
    //   // import { isAddress as isEtherAddress } from 'ethers/lib/utils';
    //   // const { isPaymentAddress } = require('incognito-chain-web-js/build/web/wallet');
    // }, [
    //   unshieldAddress,
    //   web3Account,
    //   isExternalAddress,
    //   incAddress,
    //   inputAmount,
    //   buyToken.tokenID,
    //   refCountChangeField.current,
    //   formType,
    // ]);

    return <WrappedComponent {...{ ...props, validateAddress, warningAddress }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceAddressValidation';
  return FormUnshieldComp;
};

export default enhanceAddressValidation;
