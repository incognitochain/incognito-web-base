import { TransactionSubmittedContent } from 'components/Core/TransactionConfirmationModal';
import { useModal } from 'components/Modal';
import LoadingTransaction from 'components/Modal/Modal.transaction';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { change, untouch } from 'redux-form';
import rpcMetric, { METRIC_TYPE } from 'services/rpcMetric';
import { useAppDispatch } from 'state/hooks';

export interface TInter {
  onSend: () => void;
}

const enhanceSend = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    const {
      isApproved,
      checkIsApproved,
      handleApproveToken,
      handleDepositERC20,
      handleDepositEVM,
      sellToken,
      handleLoadBalance,
    } = props;
    const dispatch = useAppDispatch();
    const updateMetric = () => rpcMetric.updateMetric({ type: METRIC_TYPE.CONFIRM_DEPOSIT });
    const { setModal, clearAllModal } = useModal();
    const _handleDepositERC20 = async () => {
      try {
        return await handleDepositERC20();
      } catch (error) {
        throw error;
      }
    };
    const _handleDepositEVM = async () => handleDepositEVM();

    const onSend = async () => {
      try {
        let tx;
        setModal({
          isTransparent: false,
          rightHeader: undefined,
          title: '',
          closable: true,
          data: <LoadingTransaction pendingText="Waiting For Confirmation" />,
        });
        let showMessage = true;
        if (sellToken.isMainEVMToken) {
          tx = await _handleDepositEVM();
        } else {
          if (!isApproved) {
            // Check Approve
            tx = await handleApproveToken();
            await checkIsApproved();
            showMessage = false;
          } else {
            // Handle deposit ERC20
            tx = await _handleDepositERC20();
          }
        }
        updateMetric().then();
        clearAllModal();
        if (handleLoadBalance) {
          handleLoadBalance();
        }
        if (tx.hash) {
          if (showMessage) {
            dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.sellAmount, ''));
            dispatch(untouch(FORM_CONFIGS.formName, FORM_CONFIGS.sellAmount));
          }
          setModal({
            isTransparent: false,
            rightHeader: undefined,
            title: '',
            closable: true,
            data: (
              <TransactionSubmittedContent
                chainId={sellToken.chainID}
                hash={tx.hash}
                message={
                  showMessage
                    ? 'Please wait for a few minutes to receive the asset on Incognito Wallet. Check your updated balance on Incognito Extension or Incognito Account on web-based application'
                    : ''
                }
              />
            ),
          });
        }
      } catch (error) {
        clearAllModal();
        console.log('SEND WITH ERROR: ', error);
      }
    };
    return <WrappedComponent {...{ ...props, onSend }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhanceDeposit';
  return FormDepositComp;
};

export default enhanceSend;
