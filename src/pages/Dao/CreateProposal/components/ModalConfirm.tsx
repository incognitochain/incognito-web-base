import { Input, Modal } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import { PRV } from 'constants/token';
import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Fee } from 'state/dao/types';
import { getPrivacyDataByTokenIDSelector } from 'state/token';
import styled from 'styled-components/macro';
import format from 'utils/format';

const { TextArea } = Input;

const ModalWrapper = styled(Modal)`
  .ant-modal {
    border-radius: 20px;
  }

  .ant-modal-content {
    background: #303030;
    border-radius: 20px;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #303030;
  border-radius: 16px;
  padding: 0px;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
  color: #ffffff;
  text-align: center;
`;

const ModalBody = styled.div`
  margin-top: 24px;
`;

const LabelText = styled.p`
  font-size: 16px;
  color: #ffffff;
`;

const ErrorText = styled.p`
  font-size: 14px;
  color: red;
`;

interface ModalConfirmProps {
  fee?: Fee;
  isOpen?: boolean;
  onCancel: (isOpen: boolean) => void;
  onRequestCreateProposal: () => void;
}

export const ModalConfirm: React.FC<ModalConfirmProps> = (props: ModalConfirmProps) => {
  const { fee, isOpen, onCancel, onRequestCreateProposal } = props;
  const prvTokenInfo = useSelector(getPrivacyDataByTokenIDSelector)(PRV.id);
  const tokenToPayFeeInfo = useSelector(getPrivacyDataByTokenIDSelector)(fee?.tokenid || '');

  const getPrvBalanceToBurn = () => {
    const prvBalance: number = prvTokenInfo?.amount || 0;
    const prvBalanceToBurn = (prvBalance * 99) / 100;
    if (prvBalanceToBurn > 1000) {
      return prvBalanceToBurn;
    }
    return 1000;
  };

  const checkPrvBalance = () => {
    const prvBalance: number = Number(prvTokenInfo?.amount) || 0;
    if (prvBalance > 10000) {
      return true;
    }
    return false;
  };

  const checkFee = () => {
    const tokenToPayFeeBalance: number = tokenToPayFeeInfo?.amount || 0;
    const feeRequired: number = fee?.feeAmount || 0;
    if (tokenToPayFeeBalance > feeRequired) {
      return true;
    }
    return false;
  };

  const checkDisabledButton = () => {
    const isEnoughPRVBalance = checkPrvBalance();
    const isEnoughFee = checkFee();
    if (isEnoughPRVBalance && isEnoughFee) {
      return false;
    }
    return true;
  };

  const isDisabledButton = checkDisabledButton();

  return (
    <ModalWrapper
      centered
      open={props?.isOpen}
      width={600}
      footer={null}
      bodyStyle={{ padding: 32, borderRadius: 16, backgroundColor: '#303030' }}
      closeIcon={<IoCloseOutline size={24} color="#FFFFFF" />}
      onCancel={() => props?.onCancel?.(false)}
    >
      <ModalContainer>
        <ModalHeader>
          <div />
          <ModalTitle>Confirm</ModalTitle>
          <div />
        </ModalHeader>
        <ModalBody>
          <LabelText>
            PRV burn:{' '}
            {format.amountVer2({
              originalAmount: Number(getPrvBalanceToBurn() || 0),
              decimals: PRV.pDecimals,
            })}
          </LabelText>
          {!checkPrvBalance() && <ErrorText>You PRV balance is insufficien</ErrorText>}
          <LabelText style={{ marginTop: 24 }}>
            Fee:{' '}
            {format.amountVer2({
              originalAmount: Number(fee?.feeAmount || 0),
              decimals: tokenToPayFeeInfo.pDecimals,
            })}{' '}
            {tokenToPayFeeInfo.symbol}
          </LabelText>
          {!checkFee() && <ErrorText>You {tokenToPayFeeInfo.symbol} balance is insufficien</ErrorText>}
        </ModalBody>

        <ButtonConfirmed onClick={onRequestCreateProposal} height={'50px'} type="submit" style={{ marginTop: 24 }}>
          Ok
        </ButtonConfirmed>
      </ModalContainer>
    </ModalWrapper>
  );
};
