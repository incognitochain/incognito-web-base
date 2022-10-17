import { memo } from 'react';

import BottomView from './components/BottomView';
import SpaceView from './components/SpaceView';
import TopView from './components/TopView';
import { Styled } from './Earnings.styled';

const Earnings = () => {
  return (
    <Styled className="default-padding-horizontal default-margin-top default-margin-bottom">
      <TopView />
      <SpaceView />
      <BottomView />
    </Styled>
  );
};

export default memo(Earnings);
