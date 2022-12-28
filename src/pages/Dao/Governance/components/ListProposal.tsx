import { List } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getProposals } from 'state/dao/operations';
import { isFetchingProposalsSelector, proposalsSelector } from 'state/dao/selectors';
import { Proposal } from 'state/dao/types';
import { useAppDispatch } from 'state/hooks';

import ProposalItem, { ProposalItemLoading } from './ProposalItem';

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

  const renderLoading = () => {
    return <List dataSource={[1, 2, 3, 4, 5]} renderItem={() => <ProposalItemLoading />} />;
  };

  const renderListProposal = () => {
    return <List dataSource={proposals} renderItem={(item: Proposal) => <ProposalItem proposal={item} />} />;
  };

  return (
    <div style={{ width: '100%', marginTop: 40 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <h3>Proposals</h3>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {/* <p>You have no Votes.</p> */}
          <ButtonConfirmed
            onClick={() => history.push('/create-proposal')}
            height={'40px'}
            type="submit"
            backgroundColor={'#9C9C9C'}
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
