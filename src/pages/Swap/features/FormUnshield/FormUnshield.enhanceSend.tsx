import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { TransactionSubmittedContent } from 'components/Core/TransactionConfirmationModal';
import { useModal } from 'components/Modal';
import LoadingTransaction from 'components/Modal/Modal.transaction';
import { PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { batch } from 'react-redux';
import { focus } from 'redux-form';
import { useAppDispatch } from 'state/hooks';

import { actionEstimateFee } from './FormUnshield.actions';
import { IMergeProps } from './FormUnshield.enhance';

export interface TInner {
  onSend: () => void;
}

const enhanceSend = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: IMergeProps) => {
    const { disabledForm, buyToken, sellToken, fee, burnOriginalAmount, inputAddress, inputAmount } = props;
    const dispatch = useAppDispatch();
    const { requestSignTransaction, isIncognitoInstalled, requestIncognitoAccount } = useIncognitoWallet();
    const { setModal, clearAllModal } = useModal();

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

          burnAmount: burnOriginalAmount,
          burnToken: sellToken.tokenID,
          burnAmountText: inputAmount,

          receiverAddress: inputAddress,
          feeAddress,

          receiverTokenID: buyToken.tokenID,
          estimatedBurnAmount, // estimate fee unified
          estimatedExpectedAmount, // estimate fee unified
        };
        return new Promise(async (resolve, reject) => {
          try {
            const tx = await requestSignTransaction(payload);
            resolve(tx);
          } catch (e) {
            reject(e);
          }
        });
      } catch (e) {
        console.log('HANDLE UNSHIELD WITH ERROR ', e);
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

      setModal({
        isTransparent: false,
        rightHeader: undefined,
        title: '',
        closable: true,
        data: <LoadingTransaction pendingText="Waiting For Confirmation" />,
      });
      try {
        const resolve: any = await handleUnshieldToken();
        if (!resolve || !resolve.data) return;
        clearAllModal();
        setModal({
          isTransparent: false,
          rightHeader: undefined,
          title: '',
          closable: true,
          data: <TransactionSubmittedContent chainId={PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO} hash={resolve.data} />,
        });
      } catch (e) {
        clearAllModal();
        alert(JSON.stringify(e));
      } finally {
        setTimeout(() => {
          dispatch(actionEstimateFee());
        }, 300);
      }
    };
    return <WrappedComponent {...{ ...props, onSend }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceSend';
  return FormUnshieldComp;
};

export default enhanceSend;
