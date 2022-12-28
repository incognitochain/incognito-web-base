/* eslint-disable react/no-children-prop */

import { Skeleton } from 'antd';
import styled from 'styled-components/macro';

interface InfoBoxProps {
  leftTitle?: string;
  rightTitle?: any;
  rightValue?: string | number;
  isLoading?: boolean;
}

const DescText = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  color: #757575;
  margin-right: 16px;
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

const RightLabel = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  text-align: right;
  color: #757575;
`;

const RightLabelValue = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  text-align: right;
  color: #ffffff;
  margin-top: 4px;
`;

const InfoBox = (props: InfoBoxProps) => {
  const { leftTitle, rightTitle, rightValue, isLoading } = props;

  return (
    <Box2Container>
      <DescText>{leftTitle}</DescText>
      {isLoading ? (
        <div>
          <Skeleton.Input active size="large" />
        </div>
      ) : (
        <div>
          <RightLabel>{rightTitle}</RightLabel>
          <RightLabelValue>{rightValue}</RightLabelValue>
        </div>
      )}
    </Box2Container>
  );
};
export default InfoBox;
