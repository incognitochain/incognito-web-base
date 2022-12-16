import { peggingAppTranslateSelector } from 'config/Configs.selector';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import PeggingListApps from './features/PeggingApp.apps';
import { Styled, WrapperContent } from './PeggingApp.styled';

const renderSectionBottom = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const peggingTrs = useSelector(peggingAppTranslateSelector);
  return (
    <WrapperContent className="default-padding-horizontal">
      {/*<PeggingCategory />*/}
      {/*<div className="section-2 default-margin-top">*/}
      {/*  <h1 className="title">{peggingTrs.privacyApp}</h1>*/}
      {/*  /!*<p className="text3 fw-medium sub-title">{peggingTrs.coming}</p>*!/*/}
      {/*</div>*/}
      <div className="header-menu">
        <div>Anonymous</div>
        <div>Permissionless</div>
        <div>Trustless</div>
      </div>
      <h3 className="fw-bold" style={{ textAlign: 'center' }}>
        {peggingTrs.mainTitle}
      </h3>
      {/*<Row className="sub-menu">*/}
      {/*  <Row className="wrap-item watch-item">*/}
      {/*    <WatchIcon />*/}
      {/*    <p className="h8">See how it works</p>*/}
      {/*  </Row>*/}
      {/*</Row>*/}
      <PeggingListApps />
    </WrapperContent>
  );
};

const Home = () => {
  // const peggingTrs = useSelector(peggingAppTranslateSelector);
  return (
    <Styled className="default-max-width">
      {/*<div className="section-1 default-padding-horizontal default-margin-top">*/}
      {/*  <Col style={{ flexDirection: 'column' }}>*/}
      {/*    <SectionHead title="Privacy apps" className="section-head" />*/}
      {/*    <p className="fw-medium main-title-text title">{peggingTrs.mainTitle}</p>*/}
      {/*    <p className="text2 sub-title sub-title-text">*/}
      {/*      {isMobile*/}
      {/*        ? `Get privacy for any decentralized application on Ethereum, BNB Chain, Polygon and Fantom. Solana and Near coming soon.`*/}
      {/*        : `Get privacy for any decentralized application on Ethereum, \nBNB Chain, Polygon and Fantom. Solana and Near coming soon.`}*/}
      {/*    </p>*/}
      {/*    <Button*/}
      {/*      type="primary"*/}
      {/*      shape="round"*/}
      {/*      size="large"*/}
      {/*      className="button1 btn-how-work"*/}
      {/*      onClick={() => {*/}
      {/*        window.open('https://we.incognito.org/t/pethereum-specifications/1688', '_blank');*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      {peggingTrs.howWork}*/}
      {/*    </Button>*/}
      {/*    <SectionLink*/}
      {/*      title="Want privacy for your app?"*/}
      {/*      subTitle="Try it out"*/}
      {/*      link="https://we.incognito.org/t/how-to-trade-with-ppancake/15567"*/}
      {/*    />*/}
      {/*  </Col>*/}
      {/*  <img src={groupLogosImg} alt="cake-logo" className="group-img" />*/}
      {/*</div>*/}
      {renderSectionBottom()}
    </Styled>
  );
};

export default memo(Home);
