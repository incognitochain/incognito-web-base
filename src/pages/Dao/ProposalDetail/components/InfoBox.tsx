/* eslint-disable react/no-children-prop */

import styled from 'styled-components/macro';

interface InfoBoxProps {
  leftTitle: string;
  rightTitle: string;
  rightValue: string;
}

const AddressWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
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

const InfoBox = (props: InfoBoxProps) => {
  const { leftTitle, rightTitle, rightValue } = props;

  return (
    <Box2Container>
      <DescText>{leftTitle}</DescText>
      <div>
        <p>{rightTitle}</p>
        <p>{rightValue}</p>
      </div>
    </Box2Container>
  );
};
export default InfoBox;
