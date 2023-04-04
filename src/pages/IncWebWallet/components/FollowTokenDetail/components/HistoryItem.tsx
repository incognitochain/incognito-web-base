import React from 'react';
import styled from 'styled-components/macro';

import { IHistory } from '../TxsHistory.interfaces';

const Container = styled.div`
  padding: 12px 0px;
  border-bottom: 1px solid #363636;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.white};
`;

const Desc = styled.p`
  font-size: 13px;
  color: #9c9c9c;
`;

const StatusText = styled.p`
  font-size: 14px;
`;

export const HistoryItem = React.memo(({ history, onClick }: { history: IHistory; onClick?: () => void }) => {
  return (
    <Container onClick={onClick}>
      <Row>
        <Title>{history.txTypeStr}</Title>
        <Title>{history.amountStr}</Title>
      </Row>
      <div style={{ height: 8 }} />
      <Row>
        <Desc>{history.timeStr}</Desc>
        <StatusText style={{ color: history.statusColor }}>{history.statusStr}</StatusText>
      </Row>
    </Container>
  );
});
