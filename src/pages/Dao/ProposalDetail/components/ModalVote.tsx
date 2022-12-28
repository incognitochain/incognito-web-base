import { Modal } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import styled from 'styled-components/macro';

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

interface ModalVoteProps {
  isOpen?: boolean;
  onCancel: (isOpen: boolean) => void;
  onChooseVoteOption: (voteOption: 1 | 2) => void;
  onSubmitVote: () => void;
  selectedVote: 1 | 2;
}

export const ModalVote: React.FC<ModalVoteProps> = (props: ModalVoteProps) => {
  const { isOpen, onCancel, onChooseVoteOption, onSubmitVote, selectedVote } = props;
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
          <ModalTitle>Vote on Pro 12</ModalTitle>
          <div />
        </ModalHeader>
        <ReasonContainer>{reasons?.map((item: any, i: any) => renderReasonOption(item))}</ReasonContainer>
        <ButtonConfirmed onClick={onSubmitVote} height={'50px'} type="submit" style={{ marginTop: 24 }}>
          Submit Votes
        </ButtonConfirmed>
      </ModalContainer>
    </ModalWrapper>
  );
};
