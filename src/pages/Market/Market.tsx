// import { Row } from 'antd';
import { Row } from 'antd';
import Swap from 'pages/Swap';
import React, { memo } from 'react';
import { isMobile } from 'react-device-detect';

import MarketAchieve from './features/Market.achieve';
import MarketBanner from './features/Market.banner';
import MarketCategory from './features/Market.category';
import Footer from './features/Market.footer';
import MarketTokens from './features/Market.token';
import { Styled } from './Market.styled';

const Home = () => {
  React.useEffect(() => {
    // console.log('DIMENSIONS::::', window.innerWidth, window.innerHeight);
  }, []);
  return (
    <Styled isMobile={isMobile}>
      <Row
        className="default-padding-horizontal market-header"
        style={{ display: 'flex', flexDirection: 'row' }}
        align="middle"
        justify="space-between"
      >
        <MarketBanner />
        {!isMobile ? <Swap /> : <MarketTokens />}
      </Row>
      <div className="default-padding-horizontal">
        <MarketCategory />
      </div>
      <MarketAchieve />
      <Footer />
    </Styled>
  );
};

export default memo(Home);
