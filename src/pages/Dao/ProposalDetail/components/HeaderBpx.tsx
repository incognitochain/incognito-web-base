/* eslint-disable react/prop-types */
import { Skeleton } from 'antd';
import BackButton from 'components/BackButton';
import { ButtonConfirmed } from 'components/Core/Button';
import ProposalStatusBox from 'pages/Dao/Governance/components/ProposalStatus';
import { useHistory } from 'react-router-dom';
import { Proposal } from 'state/dao/types';
import styled, { DefaultTheme } from 'styled-components/macro';

interface HeaderProps {
  proposal?: Proposal;
  isLoading?: boolean;
  isDisabledButtonVote?: boolean;
  onClickVoteButton?: () => void;
}

const ProposalTitle = styled.p`
  font-weight: 500;
  font-size: 34px;
  line-height: 140%;
  color: #ffffff;
  margin-top: 8px;
  flex: 1;
  margin-right: 36px;
`;

const ProposalIdText = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  color: #757575;
  margin-left: 16px;

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    margin-right: 0px;
  `}
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

const AddProposalButtonContainer = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    margin-top: 24px;
  `}
`;

const AddProposalButton = styled(ButtonConfirmed)`
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    width: 100%
  `}
`;

const HeaderBox: React.FC<HeaderProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { proposal, isLoading, isDisabledButtonVote, onClickVoteButton } = props;
  const { title } = proposal || {};

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Skeleton.Input />
        <div style={{ height: 20 }} />
        <Skeleton.Input />
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const history = useHistory();

  return (
    <div style={{ marginBottom: 40, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div>
          <BackButton onBack={() => history.push('/vote')} />
        </div>
        <ProposalIdText>Proposal #{proposal?.id}</ProposalIdText>
        <div style={{ maxWidth: 140 }}>
          <ProposalStatusBox status={proposal?.status} />
        </div>
      </div>

      <TitleContainer>
        <ProposalTitle>{title}</ProposalTitle>
        <AddProposalButtonContainer>
          <AddProposalButton disabled={isDisabledButtonVote} onClick={() => onClickVoteButton?.()} height={'40px'}>
            Submit vote
          </AddProposalButton>
        </AddProposalButtonContainer>
      </TitleContainer>
    </div>
  );
};
export default HeaderBox;
