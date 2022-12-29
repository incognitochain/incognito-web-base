import { Skeleton } from 'antd';
import ProposalStatusBox from 'pages/Dao/Governance/components/ProposalStatus';
import { Proposal } from 'state/dao/types';
import styled from 'styled-components/macro';

interface HeaderProps {
  proposal?: Proposal;
  isLoading?: boolean;
}

const ProposalTitle = styled.p`
  font-weight: 500;
  font-size: 34px;
  line-height: 140%;
  color: #ffffff;
  margin-left: 16px;
`;

const ProposalAuthorText = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  color: #757575;
  margin-top: 8px;
`;

const HeaderBox = (props: HeaderProps) => {
  const { proposal, isLoading } = props;
  const { title, proposer } = proposal || {};

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Skeleton.Input />
        <div style={{ height: 20 }} />
        <Skeleton.Input />
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 40, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
      <ProposalTitle>{title}</ProposalTitle>
      <div style={{ maxWidth: 140, marginTop: 8 }}>
        <ProposalStatusBox status={proposal?.status} />
      </div>
    </div>
  );
};
export default HeaderBox;
