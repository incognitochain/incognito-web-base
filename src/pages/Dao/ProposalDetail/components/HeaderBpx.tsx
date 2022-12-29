/* eslint-disable react/prop-types */
import { Skeleton } from 'antd';
import BackButton from 'components/BackButton';
import ProposalStatusBox from 'pages/Dao/Governance/components/ProposalStatus';
import { useHistory } from 'react-router-dom';
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
  margin-top: 8px;
`;

const HeaderBox: React.FC<HeaderProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { proposal, isLoading } = props;
  const { title, proposer } = proposal || {};

  const history = useHistory();

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
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div>
          <BackButton onBack={() => history.goBack()} />
        </div>
        <div style={{ maxWidth: 140 }}>
          <ProposalStatusBox status={proposal?.status} />
        </div>
      </div>

      <ProposalTitle>{title}</ProposalTitle>
    </div>
  );
};
export default HeaderBox;
