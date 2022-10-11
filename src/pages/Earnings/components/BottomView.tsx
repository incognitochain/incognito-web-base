import { Button } from 'antd';
import phoneTokenList from 'assets/images/phone-token-list.png';
import SectionHead from 'components/Core/SectionHead';

import { Styled } from './BottomView.styled';
import HexagonAnimation from './HexagonAnimation';

const BottomView = () => {
  return (
    <Styled>
      <div className="row">
        <div className="left">
          <div className="animation-container">
            <HexagonAnimation />
          </div>
          <div className="image-wrapper">
            <img className="image-container" src={phoneTokenList} alt="phone-token-list" />
          </div>
        </div>
        <div className="space" />

        <div className="right">
          <div className="row-section-head">
            <SectionHead title="Privacy Exchange" className="section-head" />
            <div className="space" />
            <SectionHead title="Cross-chain" className="section-head" />
            <div className="space" />
            <SectionHead title="Permissionless" className="section-head section-head1" />
          </div>
          <div style={{ width: '100%' }}>
            <h1>Become a Liquidity Provider for DEX</h1>
          </div>
          <div className="description-container">
            <h6>
              A liquidity pool is used to facilitate trades between the assets on a decentralized exchange. Contribute
              liquidity and earn rewards for helping people trade anonymously.
            </h6>
          </div>

          <div className="row-button">
            <Button
              type="primary"
              shape="round"
              size="large"
              className="button1 btn-become-validator"
              onClick={() => {
                window.open('https://we.incognito.org/t/how-to-contribute-liquidity-and-earn-rewards/15254', '_blank');
              }}
            >
              {'Provide now'}
            </Button>

            <button
              onClick={() => {
                window.open('https://we.incognito.org/t/incognito-exchange-liquidity-mining/16083', '_blank');
              }}
            >
              <p className="more-detail-title description3 hover-opacity">More details</p>
            </button>
          </div>
        </div>
      </div>
    </Styled>
  );
};

export default BottomView;
