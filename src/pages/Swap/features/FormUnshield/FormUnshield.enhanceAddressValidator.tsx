import { validator } from 'components/Core/ReduxForm';
import { MAIN_NETWORK_NAME } from 'constants/token';
import { isAddress as isEtherAddress } from 'ethers/lib/utils';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';

import { FormTypes } from './FormUnshield.types';
const { isPaymentAddress } = require('incognito-chain-web-js/build/web/wallet');

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
        if (buyToken.isBTC || buyToken.isCentralized) return [validator.required];
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
        return;
      }

      if (refCountChangeField.current) {
        if (buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO) {
          onChangeField(incAddress, FORM_CONFIGS.toAddress);
        } else if (
          (buyNetworkName === MAIN_NETWORK_NAME.BSC ||
            buyNetworkName === MAIN_NETWORK_NAME.ETHEREUM ||
            buyNetworkName === MAIN_NETWORK_NAME.FANTOM ||
            buyNetworkName === MAIN_NETWORK_NAME.POLYGON) &&
          !!unshieldAddress &&
          !isEtherAddress(unshieldAddress)
        ) {
          onChangeField(web3Account, FORM_CONFIGS.toAddress);
        } else if (!!unshieldAddress && (isEtherAddress(unshieldAddress) || isPaymentAddress(unshieldAddress))) {
          onChangeField('', FORM_CONFIGS.toAddress);
        }
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
      buyNetworkName,
    ]);

    return <WrappedComponent {...{ ...props, validateAddress, warningAddress }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceAddressValidation';
  return FormUnshieldComp;
};

export default enhanceAddressValidation;
