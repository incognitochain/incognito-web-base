import { Input, Modal } from 'antd';
import BigNumber from 'bignumber.js';
import { ButtonConfirmed } from 'components/Core/Button';
import { PRV } from 'constants/token';
import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Fee, Proposal } from 'state/dao/types';
import { NETWORK_FEE } from 'state/dao/utils';
import { getPrivacyDataByTokenIDSelector } from 'state/token';
import styled from 'styled-components/macro';
import convert from 'utils/convert';
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
  margin-top: 8px;
`;

const InputField = styled(Input)`
  background-color: #252525;
  color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  border-width: 0px;
  border: none;
  margin-top: 8px;

  ::placeholder {
    color: #757575;
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: #757575;
  }

  ::-ms-input-placeholder {
    color: #757575;
  }
`;

const LabelField = styled.p`
  font-size: 16px;
  font-weight: 500,
  color: white;
`;
interface ModalVoteProps {
  isOpen?: boolean;
  fee?: Fee;
  proposal?: Proposal;
  onCancel: (isOpen: boolean) => void;
  onChooseVoteOption: (voteOption: 0 | 1) => void;
  onSubmitVote: (prvBurnAmount: number) => void;
  selectedVote: 0 | 1;
  amount: any;
  onChangeAmount: (amount: any) => void;
}

export const ModalVote: React.FC<ModalVoteProps> = (props: ModalVoteProps) => {
  const { isOpen, onCancel, onChooseVoteOption, onSubmitVote, selectedVote, fee, amount, onChangeAmount, proposal } =
    props;
  const reasons: any = [
    {
      id: 1,
      title: `Vote for Prop ${proposal?.id}`,
    },
    {
      id: 0,
      title: `Vote against Prop ${proposal?.id}`,
    },
  ];

  const prvTokenInfo = useSelector(getPrivacyDataByTokenIDSelector)(PRV.id);
  const tokenToPayFeeInfo = useSelector(getPrivacyDataByTokenIDSelector)(fee?.tokenid || '');

  const prvBalanceToBurn = convert.toOriginalAmount({
    humanAmount: amount,
    decimals: PRV.pDecimals,
    round: false,
  });

  const validateAmount = (): {
    isValidate: boolean;
    errorMessage: string;
  } => {
    const prvBalance: number = Number(prvTokenInfo?.amount) || 0;

    const originalAmount = convert.toOriginalAmount({
      humanAmount: amount,
      decimals: PRV.pDecimals,
      round: false,
    });
    const minOriginalAmount = 1e-9;

    const bn = new BigNumber(amount);
    if (bn.isNaN()) {
      return {
        isValidate: false,
        errorMessage: 'Must be a number',
      };
    }

    if (originalAmount < minOriginalAmount) {
      return {
        isValidate: false,
        errorMessage: 'Amount must be larger than 0.000000001 PRV',
      };
    }

    if (
      prvBalance >= minOriginalAmount + (fee?.feeAmount || 0) + 2 * NETWORK_FEE &&
      originalAmount >= minOriginalAmount &&
      originalAmount <= prvBalance - (fee?.feeAmount || 0) - 2 * NETWORK_FEE
    ) {
      return {
        isValidate: true,
        errorMessage: '',
      };
    }

    return {
      isValidate: false,
      errorMessage: 'Your PRV balance is insufficien',
    };
  };

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
    return (
      <div>
        <LabelText>Snapshot Amount: {amount || 0} PRV</LabelText>
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
  };

  const isDisabledButton = validateAmount().isValidate === false || !amount;

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
          <ModalTitle>Vote proposal {proposal?.id}</ModalTitle>
          <div />
        </ModalHeader>
        <ReasonContainer>{reasons?.map((item: any, i: any) => renderReasonOption(item))}</ReasonContainer>
        <LabelField>Amount</LabelField>
        <InputField
          value={amount}
          onChange={(e) => onChangeAmount?.(e.target.value)}
          maxLength={250}
          placeholder="Enter Amount"
        />
        {amount && validateAmount()?.errorMessage && <ErrorText>{validateAmount()?.errorMessage}</ErrorText>}
        <div style={{ width: '100%', padding: 16, borderRadius: 16, border: '1px solid #757575', marginTop: 16 }}>
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
