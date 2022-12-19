import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GovernanceBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px 8px;
  background: #303030;
  border-radius: 4px;
`;

const ListProposal: React.FC = () => (
  <Container>
    <GovernanceBox>
      <p>Governance</p>
    </GovernanceBox>
    <h1>Incognito</h1>
  </Container>
);

export default ListProposal;
