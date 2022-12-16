import { memo } from 'react';
import { useHistory } from 'react-router-dom';

import { HeaderNode } from '../../../Structure/Structure';
import ValidatorHowToStack from './Validators.howToStack';
import ValidatorsJoinNetwork from './Validators.joinValidatorNetwork';
import ValidatorAskedQuestion from './Validators.requentlyAskQuestion';
import ValidatorRewardEstimation from './Validators.rewardEstimation';
import { Styled } from './Validators.styled';
import ValidatorsSubRoute from './Validators.subRoute';
import ValidatorTutorial from './Validators.tutorial';

const Validators = () => {
  const history = useHistory();
  return (
    <div style={{ width: '100%' }}>
      <HeaderNode />
      <Styled className="default-max-width default-margin-bottom">
        <ValidatorsSubRoute />
        <ValidatorsJoinNetwork />
        <ValidatorRewardEstimation />
        {/* <ValidatorStackingOptions /> */}
        {/* <ValidatorTextSlide /> */}
        <ValidatorHowToStack />
        <ValidatorAskedQuestion />
        <ValidatorTutorial />
      </Styled>
    </div>
  );
};

export default memo(Validators);
