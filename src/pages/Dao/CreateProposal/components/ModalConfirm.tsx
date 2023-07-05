import { Modal } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import { PRV } from 'constants/token';
import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Fee } from 'state/dao/types';
import { getMinimumPRVBalanceRequire, MINIMUM_PRV_REQUIRE_TO_BURN } from 'state/dao/utils';
import { getPrivacyDataByTokenIDSelector } from 'state/token';
import styled from 'styled-components/macro';
import format from 'utils/format';

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
  onRequestCreateProposal: (prvBurnAmount: number) => void;
}

export const ModalConfirm: React.FC<ModalConfirmProps> = (props: ModalConfirmProps) => {
  const { fee, isOpen, onCancel, onRequestCreateProposal } = props;
  const prvTokenInfo = useSelector(getPrivacyDataByTokenIDSelector)(PRV.id);
  const tokenToPayFeeInfo = useSelector(getPrivacyDataByTokenIDSelector)(fee?.tokenid || '');
  const minimumPRVBalanceRequire = getMinimumPRVBalanceRequire(prvTokenInfo?.amount || 0, fee?.feeAmount || 0);

  const prvBalanceToBurn = MINIMUM_PRV_REQUIRE_TO_BURN;

  const checkPrvBalance = () => {
    const prvBalance: number = Number(prvTokenInfo?.amount) || 0;
    if (prvBalance >= minimumPRVBalanceRequire) {
      return true;
    }
    return false;
  };

  const isDisabledButton = !checkPrvBalance();

  const renderContent = () => {
    if (checkPrvBalance()) {
      return (
        <div>
          <LabelText>
            Snapshot Amount:{' '}
            {format.amountVer2({
              originalAmount: Number(prvBalanceToBurn || 0),
              decimals: PRV.pDecimals,
            })}{' '}
            PRV
          </LabelText>
          <LabelText>
            Fee:{' '}
            {format.amountVer2({
              originalAmount: Number(fee?.feeAmount || 0),
              decimals: tokenToPayFeeInfo.pDecimals,
            })}{' '}
            {tokenToPayFeeInfo.symbol}
          </LabelText>
        </div>
      );
    } else {
      return (
        <div>
          <ErrorText>
            Your PRV balance is insufficient, you need at least{' '}
            {format.amountVer2({
              originalAmount: Number(minimumPRVBalanceRequire || 0),
              decimals: tokenToPayFeeInfo.pDecimals,
            })}{' '}
            {tokenToPayFeeInfo?.symbol} to create the proposal.
          </ErrorText>
        </div>
      );
    }
  };

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
          <div style={{ width: '100%', padding: 16, borderRadius: 16, border: '1px solid #757575' }}>
            {renderContent()}
          </div>
        </ModalBody>
        <ButtonConfirmed
          disabled={isDisabledButton}
          onClick={() => onRequestCreateProposal(prvBalanceToBurn)}
          height={'50px'}
          type="submit"
          style={{ marginTop: 24 }}
        >
          Ok
        </ButtonConfirmed>
      </ModalContainer>
    </ModalWrapper>
  );
};
