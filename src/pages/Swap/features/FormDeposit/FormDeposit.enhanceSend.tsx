import { useModal } from 'components/Modal';
import LoadingTransaction from 'components/Modal/Modal.transaction';
import React from 'react';

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

    const { setModal, clearAllModal } = useModal();

    const _handleDepositERC20 = async () => {
      try {
        if (!isApproved) {
          // Check Approve
          await handleApproveToken();
          await checkIsApproved();
        }
        // Handle deposit ERC20
        await handleDepositERC20();
      } catch (error) {
        throw error;
      }
    };
    const _handleDepositEVM = async () => handleDepositEVM();

    const onSend = async () => {
      try {
        setModal({
          isTransparent: false,
          rightHeader: undefined,
          title: '',
          closable: true,
          data: <LoadingTransaction pendingText="Waiting For Confirmation" />,
        });
        if (sellToken.isMainEVMToken) {
          await _handleDepositEVM();
        } else {
          await _handleDepositERC20();
        }
        if (handleLoadBalance) {
          handleLoadBalance();
        }
        clearAllModal();
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
