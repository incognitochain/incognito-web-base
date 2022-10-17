import { Button, Col } from 'antd';
import cakeImg from 'assets/images/cake-logo.png';
import SectionHead from 'components/Core/SectionHead';
import SectionLink from 'components/Core/SectionLink';
import { peggingAppTranslateSelector } from 'config/Configs.selector';
import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';

import PeggingListApps from './features/PeggingApp.apps';
import PeggingCategory from './features/PeggingApp.category';
import { Styled } from './PeggingApp.styled';

const renderSectionBottom = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const peggingTrs = useSelector(peggingAppTranslateSelector);
  return (
    <div className="default-padding-horizontal default-margin-top">
      <PeggingCategory />
      <div className="section-2 default-margin-top">
        <h1 className="title">{peggingTrs.privacyApp}</h1>
        {/*<p className="text3 fw-medium sub-title">{peggingTrs.coming}</p>*/}
      </div>
      <PeggingListApps />
    </div>
  );
};

const Home = () => {
  const peggingTrs = useSelector(peggingAppTranslateSelector);
  return (
    <Styled>
      <div className="section-1 default-padding-horizontal default-margin-top">
        <Col style={{ flexDirection: 'column' }}>
          <SectionHead title="Privacy apps" className="section-head" />
          <p className="fw-medium main-title-text title">{peggingTrs.mainTitle}</p>
          <p className="text2 sub-title sub-title-text">
            {isMobile
              ? `Get privacy for any decentralized application on Ethereum, BNB Chain, Polygon and Fantom. Solana and Near coming soon.`
              : `Get privacy for any decentralized application on Ethereum, \nBNB Chain, Polygon and Fantom. Solana and Near coming soon.`}
          </p>
          <Button
            type="primary"
            shape="round"
            size="large"
            className="button1 btn-how-work"
            onClick={() => {
              window.open('https://we.incognito.org/t/pethereum-specifications/1688', '_blank');
            }}
          >
            {peggingTrs.howWork}
          </Button>
          <SectionLink
            title="Want privacy for your app?"
            subTitle="Try it out"
            link="https://we.incognito.org/t/how-to-trade-with-ppancake/15567"
          />
        </Col>
        <img src={cakeImg} alt="cake-logo" className="cake-img" />
      </div>
      {renderSectionBottom()}
    </Styled>
  );
};

export default memo(Home);
