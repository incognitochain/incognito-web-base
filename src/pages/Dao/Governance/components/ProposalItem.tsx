import { Skeleton } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useBlockNumber from 'lib/hooks/useBlockNumber';
import { useHistory } from 'react-router-dom';
import { Proposal } from 'state/dao/types';
import styled from 'styled-components/macro';

import ProposalStatusBox from './ProposalStatus';

dayjs.extend(relativeTime);

interface ProposalItemProps {
  proposal: Proposal;
}

const Label = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 116%;
  text-align: center;
  color: ${({ theme }) => theme.text2};
`;

const LeftItemContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProposalIdContainer = styled.div`
  width: 80px;
  justify-content: center;
`;

const TextId = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  color: #757575;
  text-align: left;
`;

const AVERAGE_BLOCK_TIME_IN_SECS = 12;

const getCountdownCopy = (proposal: Proposal, currentBlock?: number) => {
  const timestamp = Date.now();
  const startDate =
    proposal && timestamp && currentBlock
      ? dayjs(timestamp).add(AVERAGE_BLOCK_TIME_IN_SECS * (proposal.startBlock - currentBlock), 'seconds')
      : undefined;

  const endDate =
    proposal && timestamp && currentBlock
      ? dayjs(timestamp).add(AVERAGE_BLOCK_TIME_IN_SECS * (proposal.endBlock - currentBlock), 'seconds')
      : undefined;

  // const expiresDate = proposal && dayjs(proposal.eta).add(14, 'days');

  const now = dayjs();

  if (startDate?.isBefore(now) && endDate?.isAfter(now)) {
    return <Label>Ends {endDate.fromNow()}</Label>;
  }
  // if (endDate?.isBefore(now)) {
  //   return <Label>Expires {expiresDate.fromNow()}</Label>;
  // }
  return <Label>Starts {dayjs(startDate).fromNow()}</Label>;
};

const ProposalContainer = styled.div`
  width: 100%;
  padding: 18px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #363636;
  border-radius: 12px;
  margin-bottom: 16px;
  :hover {
    cursor: pointer;
    background: #303030;
    border: 1px solid #363636;
  }
`;

const ProposalTitle = styled.span`
  flex: 1;
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  color: ${({ theme }) => theme.text1};
`;

const ProposalItem = (props: ProposalItemProps) => {
  const { title, id, status } = props?.proposal;
  const history = useHistory();

  const currentBlock = useBlockNumber();

  const goToDetail = () => {
    history.push(`vote/${id}`);
  };

  return (
    <ProposalContainer onClick={goToDetail}>
      <LeftItemContainer>
        <ProposalIdContainer>
          <TextId>{id}</TextId>
        </ProposalIdContainer>
        <ProposalTitle>{title}</ProposalTitle>
      </LeftItemContainer>

      {/* {getCountdownCopy(props?.proposal, 10)} */}
      <div>
        <ProposalStatusBox status={status} />
      </div>
    </ProposalContainer>
  );
};

export const ProposalItemLoading = () => {
  return (
    <ProposalContainer>
      <LeftItemContainer>
        <ProposalTitle>
          <Skeleton.Input active={true} size={'small'} />
        </ProposalTitle>
      </LeftItemContainer>
      <Skeleton.Input active={true} size={'small'} />
      <div>
        <Skeleton.Button active={true} size={'small'} />
      </div>
    </ProposalContainer>
  );
};

export default ProposalItem;
