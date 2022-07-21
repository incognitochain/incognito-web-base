import { validator } from 'components/Core/ReduxForm';
import React from 'react';
import { useSelector } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { useAppSelector } from 'state/hooks';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';

import { FORM_CONFIGS } from './SubmitTxUnshield.constant';

const enhanceAddressValidation = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    const { onChangeField } = props;
    const formSelector = formValueSelector(FORM_CONFIGS.formName);
    const inputAddress = useAppSelector((state) => formSelector(state, FORM_CONFIGS.address));
    const incAccount = useSelector(incognitoWalletAccountSelector);

    const getAddressValidator = () => {
      return validator.combinedIncognitoAddress;
    };

    const validateAddress = getAddressValidator();

    React.useEffect(() => {
      if (incAccount && incAccount.paymentAddress && onChangeField) {
        onChangeField(incAccount.paymentAddress, FORM_CONFIGS.address);
      }
    }, [incAccount]);

    return <WrappedComponent {...{ ...props, validateAddress, inputAddress }} />;
  };
  FormDepositComp.displayName = 'FormUnshield.enhanceAddressValidation';
  return FormDepositComp;
};

export default enhanceAddressValidation;
