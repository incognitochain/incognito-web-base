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
    const { disabledForm, buyToken, sellToken, fee, inputOriginalAmount, inputAddress, inputAmount } = props;
    const dispatch = useAppDispatch();
    const { requestSignTransaction, isIncognitoInstalled, requestIncognitoAccount } = useIncognitoWallet();

    const handleUnshieldToken = async () => {
      const {
        feeAddress,
        networkFee,
        networkFeeToken,
        burnFee,
        burnFeeToken,
        id,
        estimatedBurnAmount,
        estimatedExpectedAmount,
      } = fee;
      if (sellToken.hasChild && (!estimatedBurnAmount || !estimatedExpectedAmount)) return;
      try {
        const payload: any = {
          networkFee,
          networkFeeToken,

          isUnshield: true,
          isUnified: sellToken.hasChild,

          burnFee,
          burnFeeToken,
          burnFeeID: String(id),

          burnAmount: inputOriginalAmount,
          burnToken: sellToken.tokenID,
          burnAmountText: inputAmount,

          receiverAddress: inputAddress,
          feeAddress,

          receiverTokenID: buyToken.tokenID,
          estimatedBurnAmount, // estimate fee unified
          estimatedExpectedAmount, // estimate fee unified
        };
        const tx = await requestSignTransaction(payload);
      } catch (e) {
        console.log('HANDLE UNSHIELD WITH ERROR');
      }
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
