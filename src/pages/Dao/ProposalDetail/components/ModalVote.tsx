import { Modal } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import { PRV } from 'constants/token';
import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Fee } from 'state/dao/types';
import { getMinimumPRVBalanceRequire, MINIMUM_PRV_REQUIRE_TO_BURN, NETWORK_FEE } from 'state/dao/utils';
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

const ReasonContainer = styled.div`
  margin-top: 24px;
`;

const ReasonOptionItemContainer = styled.div`
  background: #252525;
  border-radius: 8px;
  padding: 18px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  :hover {
    cursor: pointer;
  }
`;

const ReasonTitle = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #ffffff;
  margin-left: 16px;
`;

const LabelText = styled.p`
  font-size: 16px;
  color: #ffffff;
`;

const ErrorText = styled.p`
  font-size: 14px;
  color: red;
`;

interface ModalVoteProps {
  isOpen?: boolean;
  fee?: Fee;
  onCancel: (isOpen: boolean) => void;
  onChooseVoteOption: (voteOption: 1 | 2) => void;
  onSubmitVote: (prvBurnAmount: number) => void;
  selectedVote: 1 | 2;
}

export const ModalVote: React.FC<ModalVoteProps> = (props: ModalVoteProps) => {
  const { isOpen, onCancel, onChooseVoteOption, onSubmitVote, selectedVote, fee } = props;
  const reasons: any = [
    {
      id: 1,
      title: 'Cast 1 vote for Prop 12',
    },
    {
      id: 2,
      title: 'Abstain from voting on Prop 12',
    },
  ];

  const prvTokenInfo = useSelector(getPrivacyDataByTokenIDSelector)(PRV.id);
  const tokenToPayFeeInfo = useSelector(getPrivacyDataByTokenIDSelector)(fee?.tokenid || '');
  const minimumPRVBalanceRequire = getMinimumPRVBalanceRequire(prvTokenInfo?.amount || 0, fee?.feeAmount || 0);

  const getPrvBalanceToBurn = () => {
    const prvBalance: number = prvTokenInfo?.amount || 0;
    let prvToBurn = MINIMUM_PRV_REQUIRE_TO_BURN;
    if (prvBalance >= minimumPRVBalanceRequire) {
      prvToBurn = (prvBalance * 90) / 100 - (fee?.feeAmount || 0) - NETWORK_FEE;
    }
    return prvToBurn;
  };

  const prvBalanceToBurn = getPrvBalanceToBurn();

  const checkPrvBalance = () => {
    const prvBalance: number = Number(prvTokenInfo?.amount) || 0;
    if (prvBalance >= minimumPRVBalanceRequire) {
      return true;
    }
    return false;
  };

  const isDisabledButton = !checkPrvBalance();

  const renderReasonOption = (reason: any) => {
    return (
      <ReasonOptionItemContainer onClick={() => onChooseVoteOption(reason?.id)}>
        {selectedVote === reason?.id ? (
          <MdCheckBox size={24} color="#1A73E8" />
        ) : (
          <MdCheckBoxOutlineBlank color="#9C9C9C" size={24} />
        )}
        <ReasonTitle>{reason?.title}</ReasonTitle>
      </ReasonOptionItemContainer>
    );
  };

  const renderContent = () => {
    if (checkPrvBalance()) {
      return (
        <div>
          <LabelText>
            PRV burn:{' '}
            {format.amountVer2({
              originalAmount: Number(prvBalanceToBurn || 0),
              decimals: PRV.pDecimals,
            })}{' '}
            PRV
          </LabelText>
          <LabelText style={{ marginTop: 24 }}>
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
          <ErrorText>Your PRV balance is insufficien</ErrorText>
          <ErrorText>
            Your can minimum{' '}
            {format.amountVer2({
              originalAmount: Number(minimumPRVBalanceRequire || 0),
              decimals: tokenToPayFeeInfo.pDecimals,
            })}{' '}
            {tokenToPayFeeInfo?.symbol} to create transaction
          </ErrorText>
        </div>
      );
    }
  };

  return (
    <ModalWrapper
      centered
      open={isOpen}
      width={600}
      footer={null}
      bodyStyle={{ padding: 32, borderRadius: 16, backgroundColor: '#303030' }}
      closeIcon={<IoCloseOutline size={24} color="#FFFFFF" />}
      onCancel={() => onCancel?.(false)}
    >
      <ModalContainer>
        <ModalHeader>
          <div />
          <ModalTitle>Vote proposal</ModalTitle>
          <div />
        </ModalHeader>
        <ReasonContainer>{reasons?.map((item: any, i: any) => renderReasonOption(item))}</ReasonContainer>
        <div style={{ width: '100%', padding: 16, borderRadius: 16, border: '1px solid #757575' }}>
          {renderContent()}
        </div>
        <ButtonConfirmed
          disabled={isDisabledButton}
          onClick={() => onSubmitVote(prvBalanceToBurn)}
          height={'50px'}
          type="submit"
          style={{ marginTop: 24 }}
        >
          Submit Votes
        </ButtonConfirmed>
      </ModalContainer>
    </ModalWrapper>
  );
};
