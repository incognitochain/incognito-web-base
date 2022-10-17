import { memo } from 'react';
import { useHistory } from 'react-router-dom';

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
    <Styled className="default-padding-horizontal default-margin-bottom">
      <ValidatorsSubRoute />
      <ValidatorsJoinNetwork />
      <ValidatorRewardEstimation />
      {/* <ValidatorStackingOptions /> */}
      {/* <ValidatorTextSlide /> */}
      <ValidatorHowToStack />
      <ValidatorAskedQuestion />
      <ValidatorTutorial />
    </Styled>
  );
};

export default memo(Validators);
