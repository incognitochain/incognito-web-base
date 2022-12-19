import { List } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import { ModalConfirm } from 'pages/Dao/ProposalDetail/components/ModalConfirm';
import React, { useState } from 'react';

import ProposalItem from './ProposalItem';

const data = [
  {
    id: 198,
    expired: 3,
    status: 'active',
    title: 'PropBox: A Nouns Proposal Incubator',
  },
  {
    id: 197,
    expired: 3,
    status: 'active',
    title: '133 SharkLabs -- A nounish incubator by SharkDAO',
  },
  {
    id: 196,
    expired: 3,
    status: 'active',
    title: 'Mucho Love 4 Month Extension',
  },
  {
    id: 195,
    status: 'canceled',
    title: 'Liberating Proposal Threshold for 26 years',
  },
  {
    id: 194,
    status: 'executed',
    title: 'John Hamon X Nouns',
  },
  {
    id: 193,
    status: 'defeated',
    title: 'Integrate 8/8 Anniversary Art',
  },
  {
    id: 192,
    expired: 3,
    status: 'active',
    title: 'Mucho Love 4 Month Extension',
  },
];

const ListProposal: React.FC = () => {
  const [modalConfirmVisible, setModalConfirmVisible] = useState<boolean>(false);

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
            onClick={() => setModalConfirmVisible(true)}
            height={'40px'}
            type="submit"
            backgroundColor={'#9C9C9C'}
          >
            Submit Proposal
          </ButtonConfirmed>
        </div>
      </div>
      <List dataSource={data} renderItem={(item) => <ProposalItem {...item} />} />
      <ModalConfirm isOpen={modalConfirmVisible} />
    </div>
  );
};

export default ListProposal;
