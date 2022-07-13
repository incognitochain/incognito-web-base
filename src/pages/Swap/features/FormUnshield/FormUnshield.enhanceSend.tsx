import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { batch } from 'react-redux';
import { focus } from 'redux-form';
import { useAppDispatch } from 'state/hooks';

import { IMergeProps } from './FormUnshield.enhance';

export interface TInner {
  onSend: () => void;
}

const enhanceSend = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: IMergeProps) => {
    const { disabledForm, buyToken, fee } = props;
    const dispatch = useAppDispatch();
    const { requestSignTransaction, isIncognitoInstalled, requestIncognitoAccount } = useIncognitoWallet();

    const handleUnshieldToken = async () => {
      if (!fee) return;
      try {
        const { feeAddress, networkFee, networkFeeToken, burnFee, burnFeeToken } = fee;
        console.log('SANG TEST::: ', feeAddress);
      } catch (e) {
        console.log('HANDLE UNSHIELD WITH ERROR');
      }
      // const prvPayments = [
      //   {
      //     PaymentAddress: tempAddress,
      //     Amount: String(originalFee),
      //   },
      // ];
      //
      // const tokenPayments = [
      //   {
      //     PaymentAddress: tempAddress,
      //     Amount: String(originalAmount),
      //   },
      // ];
      // requestSignTransaction();
    };

    const onSend = async () => {
      if (disabledForm) {
        return batch(() => {
          dispatch(focus(FORM_CONFIGS.formName, FORM_CONFIGS.formAddress));
          dispatch(focus(FORM_CONFIGS.formName, FORM_CONFIGS.sellAmount));
        });
      }
      if (!isIncognitoInstalled()) {
        return requestIncognitoAccount();
      }

      await handleUnshieldToken();
    };
    return <WrappedComponent {...{ ...props, onSend }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceSend';
  return FormUnshieldComp;
};

export default enhanceSend;
