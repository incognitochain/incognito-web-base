import React from 'react';
import { ProposalStatus } from 'state/dao/types';
import styled from 'styled-components/macro';

const StatusBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  background: #757575;
  border-radius: 6px;
  margin-left: 16px;
`;

const StatusText = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 116%;
  color: #ffffff;
`;

const getStatusColor = (status: ProposalStatus | undefined): string => {
  switch (status) {
    case ProposalStatus.PENDING:
    case ProposalStatus.ACTIVE:
      return '#03A66D';
    case ProposalStatus.SUCCEEDED:
    case ProposalStatus.EXECUTED:
      return '#6BA0FB';
    case ProposalStatus.DEFEATED:
    case ProposalStatus.VETOED:
      return '#CF304A';
    case ProposalStatus.QUEUED:
    case ProposalStatus.CANCELLED:
    case ProposalStatus.EXPIRED:
      return '#757575';
    default:
      return '#757575';
  }
};

const getStatusText = (status: ProposalStatus | undefined): string => {
  switch (status) {
    case ProposalStatus.PENDING:
      return 'Active';
    case ProposalStatus.ACTIVE:
      return 'Submitting';
    case ProposalStatus.SUCCEEDED:
      return 'Succeeded';
    case ProposalStatus.EXECUTED:
      return 'Executed';
    case ProposalStatus.DEFEATED:
      return 'Defeated';
    case ProposalStatus.QUEUED:
      return 'Queued';
    case ProposalStatus.CANCELLED:
      return 'Cancelled';
    case ProposalStatus.VETOED:
      return 'Voted';
    case ProposalStatus.EXPIRED:
      return 'Expired';
    default:
      return 'Pending';
  }
};

interface ProposalStatusProps {
  status?: ProposalStatus | undefined;
}

const ProposalStatusBox: React.FC<ProposalStatusProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { status } = props;
  const statusText = getStatusText(status);
  const statusColor = getStatusColor(status);
  return (
    <StatusBoxContainer style={{ backgroundColor: statusColor }}>
      <StatusText>{statusText}</StatusText>
    </StatusBoxContainer>
  );
};

export default ProposalStatusBox;
