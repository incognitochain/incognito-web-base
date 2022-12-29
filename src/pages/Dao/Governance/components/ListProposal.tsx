import { List } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getProposals } from 'state/dao/operations';
import { isFetchingProposalsSelector, proposalsSelector } from 'state/dao/selectors';
import { Proposal } from 'state/dao/types';
import { useAppDispatch } from 'state/hooks';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import styled from 'styled-components/macro';

import ProposalItem, { ProposalItemLoading } from './ProposalItem';

const Title = styled.p`
  font-weight: 500;
  font-size: 34px;
  line-height: 140%;
  color: #ffffff;
`;

const Desc = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: #757575;
  margin-left: 24px;
  margin-right: 24px;
`;

const ListProposal: React.FC = () => {
  const dispatch = useAppDispatch();

  const getProposal = () => {
    dispatch(getProposals());
  };

  useEffect(() => {
    getProposal();
  }, []);

  const history = useHistory();

  const isFetchingProposals = useSelector(isFetchingProposalsSelector);
  const proposals: Proposal[] = useSelector(proposalsSelector);

  const incAccount = useSelector(incognitoWalletAccountSelector);

  const renderLoading = () => {
    return <List dataSource={[1, 2, 3, 4, 5]} renderItem={() => <ProposalItemLoading />} />;
  };

  const renderListProposal = () => {
    return <List dataSource={proposals} renderItem={(item: Proposal) => <ProposalItem proposal={item} />} />;
  };

  const isDisabledButton = !incAccount;

  return (
    <div style={{ width: '100%', marginTop: 40 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 24,
          width: '100%',
        }}
      >
        <Title style={{ flex: 1 }}>Proposals</Title>
        {!incAccount && <Desc>Connect wallet to make a proposal.</Desc>}
        <div>
          <ButtonConfirmed
            disabled={isDisabledButton}
            onClick={() => history.push('/create-proposal')}
            height={'40px'}
            type="submit"
            backgroundColor={'#9C9C9C'}
            style={{ minWidth: 150 }}
          >
            Add Proposal
          </ButtonConfirmed>
        </div>
      </div>
      {!proposals?.length && isFetchingProposals ? renderLoading() : renderListProposal()}
    </div>
  );
};

export default ListProposal;
