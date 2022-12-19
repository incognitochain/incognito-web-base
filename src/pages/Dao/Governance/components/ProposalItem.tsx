import { Row } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

interface ProposalItemProps {
  id: number;
  title: string;
  status: any;
  expired?: any;
}

const Container = styled.div`
  width: 100%;
  padding: 18px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #363636;
  border-radius: 12px;
  margin-bottom: 16px;
  :hover {
    cursor: pointer;
    background: #303030;
    border: 1px solid #363636;
  }
`;

const Number = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  color: #757575;
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  color: #ffffff;
  margin-left: 40px;
`;

const Label = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 116%;
  text-align: center;
  color: #757575;
`;

const StatusBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  background: #757575;
  border-radius: 6px;
  margin-left: 16px;
`;

const StatusText = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 116%;
  color: #ffffff;
`;

const ProposalItem = (props: ProposalItemProps) => {
  const { title, id, expired, status } = props;
  const history = useHistory();

  const getStatusColor = () => {
    if (status === 'active') return '#03A66D';
    if (status === 'cancelled') return '#757575';
    if (status === 'executed') return '#6BA0FB';
    if (status === 'defeated') return '#CF304A';
  };

  const renderStatusBox = (status: 'active' | 'cancelled' | 'executed' | 'defeated') => {
    return (
      <StatusBoxContainer style={{ backgroundColor: getStatusColor() }}>
        <StatusText>Defeated</StatusText>
      </StatusBoxContainer>
    );
  };

  const goToDetail = () => {
    history.push(`vote/${id}`);
  };

  return (
    <Container onClick={goToDetail}>
      <Row align="middle">
        <Number>{id}</Number>
        <Title>{title}</Title>
      </Row>
      <Row align="middle">
        {expired && <Label>Ends in {expired} days</Label>}
        {renderStatusBox('active')}
      </Row>
    </Container>
  );
};

export default ProposalItem;
