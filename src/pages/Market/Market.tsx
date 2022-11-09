// import { Row } from 'antd';
import { Row } from 'antd';
import animationData from 'assets/scroll-animation.json';
import Swap from 'pages/Swap';
import React, { memo } from 'react';
import { isMobile } from 'react-device-detect';
import Lottie from 'react-lottie';
import { ThemedText } from 'theme';

import MarketAchieve from './features/Market.achieve';
import MarketBanner from './features/Market.banner';
import MarketCategory from './features/Market.category';
import MarketQuestions from './features/Market.questions';
import MarketTokens from './features/Market.token';
import { Styled } from './Market.styled';

const Home = () => {
  React.useEffect(() => {
    // console.log('DIMENSIONS::::', window.innerWidth, window.innerHeight);
  }, []);

  return (
    <Styled isMobile={isMobile}>
      <div style={{ minHeight: '80vh' }}>
        <ThemedText.LargeHeader fontWeight={500} fontSize={34} color="text1" textAlign={'center'}>
          The privacy marketplace for crypto assets.
        </ThemedText.LargeHeader>
        <Row
          className="default-padding-horizontal market-header"
          style={{ display: 'flex', flexDirection: 'row' }}
          align="middle"
          justify="center"
        >
          {isMobile && <MarketBanner />}
          {!isMobile ? <Swap /> : <MarketTokens />}
        </Row>
        {!isMobile && (
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData,
            }}
            height={60}
          />
        )}
      </div>
      <div className="default-padding-horizontal">{isMobile ? <MarketCategory /> : <MarketQuestions />}</div>
      <MarketAchieve />
    </Styled>
  );
};

export default memo(Home);
