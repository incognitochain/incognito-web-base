import { Row } from 'antd';
import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid #363636;
  border-radius: 16px;
  margin-top: 40px;
`;

const LeftContainer = styled.div`
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DescText = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #9c9c9c;
`;

const Line = styled.div`
  width: 1px;
  height: 100%;
  background-color: #363636;
`;

const TextValue1 = styled.p`
  font-weight: 600;
  font-size: 24px;
  line-height: 140%;
  color: #ffffff;
`;

const TextValue2 = styled.p`
  font-weight: 600;
  font-size: 24px;
  line-height: 140%;
  color: #757575;
`;

const TreasuryBox: React.FC = () => (
  <Container>
    <LeftContainer>
      <DescText>Treasury</DescText>
      <Row align="middle" style={{ marginTop: 8 }}>
        <TextValue1>28,267 ETH</TextValue1>
        <TextValue2>= $33,181,889.99</TextValue2>
      </Row>
    </LeftContainer>
    <Line />
    <LeftContainer>
      <DescText>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Lorem ipsum dolor sit amet.
      </DescText>
    </LeftContainer>
  </Container>
);

export default TreasuryBox;
