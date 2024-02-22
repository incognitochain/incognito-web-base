/* eslint-disable react/no-children-prop */

import { Progress } from 'antd';
import { Skeleton } from 'antd';
import { PRV } from 'constants/token';
import { Proposal } from 'state/dao/types';
import styled, { DefaultTheme } from 'styled-components/macro';
import convert from 'utils/convert';

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
  const voteForAmount = proposalDetail?.voteForAmount || 0;
  const voteAgainstAmount = proposalDetail?.voteAgainstAmount || 0;
  const voteForHumanAmount = convert.toHumanAmount({
    originalAmount: voteForAmount,
    decimals: PRV.pDecimals,
  });
  const voteAgainstHumanAmount = convert.toHumanAmount({
    originalAmount: voteAgainstAmount,
    decimals: PRV.pDecimals,
  });

  const totalVote = voteForAmount + voteAgainstAmount;

  let voteForPercent = 0;
  let voteAgainstPercent = 0;

  if (totalVote > 0) {
    voteForPercent = parseFloat(((voteForAmount / totalVote) * 100).toFixed(2));
    voteAgainstPercent = Math.round((100 - voteForPercent) * 100) / 100;
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
                {voteForHumanAmount} PRV {voteForPercent}%
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
                {voteAgainstHumanAmount} PRV {voteAgainstPercent}%
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
