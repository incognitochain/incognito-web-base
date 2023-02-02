/* eslint-disable react/no-children-prop */

import { Progress } from 'antd';
import { Skeleton } from 'antd';
import { Proposal } from 'state/dao/types';
import styled, { DefaultTheme } from 'styled-components/macro';

interface InfoBoxProps {
  proposalDetail?: Proposal;
  isLoading?: boolean;
}

const Box2Container = styled.div`
  border: 1px solid #363636;
  border-radius: 16px;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 26px;

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
    align-items: flex-start;
  `}

  .ant-progress-text {
    color: white;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

const ItemContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  color: #0ecb81;
`;

const VoteInfoBox = (props: InfoBoxProps) => {
  const { isLoading, proposalDetail } = props;
  const voteFor = proposalDetail?.voteFor || 0;
  const voteAgainst = proposalDetail?.voteAgainst || 0;

  const totalVote = voteFor + voteAgainst;

  let voteForPercent = 0;
  let voteAgainstPercent = 0;

  if (totalVote > 0) {
    voteForPercent = parseFloat(((voteFor / totalVote) * 100).toFixed(2));
    voteAgainstPercent = 100 - voteForPercent;
  }

  return (
    <Box2Container>
      <ItemWrapper>
        {isLoading ? (
          <Skeleton.Input active size="large" />
        ) : (
          <>
            <ItemContainer>
              <Title>For</Title>
              <Title>
                {voteFor} ({voteForPercent}%)
              </Title>
            </ItemContainer>
            <Progress percent={voteForPercent} showInfo={false} strokeColor="#0ECB81" trailColor="#404040" />
          </>
        )}
      </ItemWrapper>
      <div style={{ width: 32 }} />
      <ItemWrapper>
        {isLoading ? (
          <Skeleton.Input active size="large" />
        ) : (
          <>
            <ItemContainer>
              <Title style={{ color: '#F6465D' }}>Against</Title>
              <Title style={{ color: '#F6465D' }}>
                {voteAgainst} ({voteAgainstPercent}%)
              </Title>
            </ItemContainer>
            <Progress percent={voteAgainstPercent} showInfo={false} strokeColor="#F6465D" trailColor="#404040" />
          </>
        )}
      </ItemWrapper>
    </Box2Container>
  );
};
export default VoteInfoBox;
