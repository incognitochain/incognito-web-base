import { Button } from 'antd';
// import phoneIncognitoValidator from '@images/phone-incognito-validator.png';
// import phoneTransactionHistory from '@images/phone-transaciton-history.png';
import validator from 'assets/images/validator.png';
import SectionHead from 'components/Core/SectionHead';
import { memo } from 'react';
import { useHistory } from 'react-router-dom';

import { route as ValidatorRoute } from '../features/Validators/Validators.route';
// import HexagonAnimation from './HexagonAnimation';
import { Styled } from './TopView.styled';
const TopView = () => {
  const history = useHistory();
  return (
    <Styled>
      <div className="row">
        <div className="right">
          <div className="row-section-head">
            <SectionHead title="Secure the network" className="section-head" />
            <div className="space" />
            <SectionHead title="earn profit" className="section-head" />
          </div>
          <h1 className="text-left">Become a Validator</h1>
          <div className="description-container">
            <h6>Incognito is a community-driven privacy project powered by thousands of decentralized validators.</h6>
          </div>

          <div className="row-button">
            <Button
              type="primary"
              shape="round"
              size="large"
              className="button1 btn-become-validator"
              onClick={() => {
                history.push({
                  pathname: ValidatorRoute,
                  state: {
                    activeScroll: true,
                  },
                });
              }}
            >
              {'Stake now'}
            </Button>

            <button
              onClick={() => {
                history.push(ValidatorRoute);
              }}
            >
              <p className="more-detail-title description3 hover-opacity">More details</p>
            </button>
          </div>
        </div>
        <div className="space" />
        <div className="left">
          <img className="img" src={validator} alt="phone-incognito-validator" />
          {/* <div className="animation-container">{<HexagonAnimation /> }</div> */}

          {/* <div className="image-wrapper">
            <img
              className="image-container"
              src={phoneTransactionHistory}
              alt="phone-transaction-history"
            />
            <img
              className="image-container-1"
              src={phoneIncognitoValidator}
              alt="phone-incognito-validator"
            />
          </div> */}
        </div>
      </div>
    </Styled>
  );
};

export default memo(TopView);
