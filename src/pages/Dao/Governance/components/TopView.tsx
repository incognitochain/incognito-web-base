import React from 'react';
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
  margin-top: 24px;
  line-height: 140%;
  text-align: center;
`;

const ListProposal: React.FC = () => (
  <Container>
    <GovernanceBox>
      <p>Governance</p>
    </GovernanceBox>
    <h1>Incognito DAO</h1>
    <Desc>
      PRV holders can now join to vote for particular proposals created by others or directly create their own proposals
      for the ecosystem improvement. A minimum of 62,500 PRV is required to submit proposals.
    </Desc>
  </Container>
);

export default ListProposal;
