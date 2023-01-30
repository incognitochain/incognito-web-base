import React from 'react';
import { MINIMUM_PRV_HUMAN_AMOUNT_REQUIRE } from 'state/dao/utils';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const GovernanceBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px 8px;
  background: #303030;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const Desc = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-top: 16px;
  line-height: 140%;
  text-align: center;
`;

const ListProposal: React.FC = () => (
  <Container>
    <GovernanceBox>
      <p>Governance</p>
    </GovernanceBox>
    <h3>Incognito DAO</h3>
    <Desc className="h7">
      PRV holders can now join to vote for particular proposals created by others or directly create their own proposals
      for the ecosystem improvement. A minimum of {MINIMUM_PRV_HUMAN_AMOUNT_REQUIRE} PRV is required to submit
      proposals.
    </Desc>
  </Container>
);

export default ListProposal;
