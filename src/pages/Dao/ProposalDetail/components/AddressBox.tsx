/* eslint-disable react/no-children-prop */

import { Progress, Row } from 'antd';
import styled from 'styled-components/macro';

interface AddressBoxProps {
  leftTitle: string | number;
  rightTitle: string | number;
  color: string;
  addresses: string[];
}

const AddressWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Container = styled.div`
  border: 1px solid #363636;
  border-radius: 16px;
  padding: 24px;
  flex: 1;
`;

const AddressText = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  color: #ffffff;
  margin-left: 16px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AddressItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const DescText = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  color: #757575;
`;

const Box2Container = styled.div`
  border: 1px solid #363636;
  border-radius: 16px;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 26px;
`;

const HeaderBoxTitle = styled.p`
  font-size: 18px;
  line-height: 140%;
`;

const DescriptionBox = styled.div``;

const AddressBox = (props: AddressBoxProps) => {
  const { leftTitle, rightTitle, color, addresses } = props;

  return (
    <Container>
      <Row align="middle" justify="space-between">
        <HeaderBoxTitle style={{ color }}>{leftTitle}</HeaderBoxTitle>
        <HeaderBoxTitle style={{ color }}>{rightTitle}</HeaderBoxTitle>
      </Row>
      <Progress percent={80} showInfo={false} strokeWidth={6} trailColor={'#404040'} strokeColor={color} />
      <div style={{ marginTop: 16 }}>
        {addresses?.map((item, i) => {
          return (
            <AddressItemContainer key={i}>
              <div style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: 'orange' }}></div>
              <AddressText>{item}</AddressText>
            </AddressItemContainer>
          );
        })}
      </div>
    </Container>
  );
};
export default AddressBox;
