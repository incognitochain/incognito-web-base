import { Input } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import Modal from 'components/Core/Modal';
import { useState } from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import styled from 'styled-components/macro';

const { TextArea } = Input;

const ModalContainer = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  padding: 32px;
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

const ReasonTextInput = styled(TextArea)`
  background: #252525;
  border-radius: 8px;
  border-width: 0px;
  padding: 14px 16px;
  margin-top: 8px;
`;

export function ModalConfirm(props: any) {
  const [selectedReasonId, setSelectedReasonId] = useState<number>();

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
      <ReasonOptionItemContainer onClick={() => setSelectedReasonId(reason?.id)}>
        {selectedReasonId === reason?.id ? (
          <MdCheckBox size={24} color="#1A73E8" />
        ) : (
          <MdCheckBoxOutlineBlank color="#9C9C9C" size={24} />
        )}
        <ReasonTitle>{reason?.title}</ReasonTitle>
      </ReasonOptionItemContainer>
    );
  };

  return (
    <Modal isOpen={props?.isOpen} onDismiss={() => null}>
      <ModalContainer>
        <ModalHeader>
          <div />
          <ModalTitle>Vote on Pro 12</ModalTitle>
          <div />
        </ModalHeader>
        <ReasonContainer>{reasons?.map((item: any, i: any) => renderReasonOption(item))}</ReasonContainer>

        <p style={{ fontSize: 14 }}>Reason (Optional)</p>
        <ReasonTextInput placeholder="Insert your methodology" />
        <ButtonConfirmed height={'50px'} type="submit" style={{ marginTop: 24 }}>
          Submit Votes
        </ButtonConfirmed>
      </ModalContainer>
    </Modal>
  );
}
