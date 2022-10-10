import { Col } from 'antd';
import apk from 'assets/images/install/apk.png';
import appstore from 'assets/images/install/appstore.png';
import ggplay from 'assets/images/install/play.png';
import SectionHead from 'components/Core/SectionHead';
import SectionLink from 'components/Core/SectionLink';
import { marketTranslateSelector } from 'config/Configs.selector';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
// eslint-disable-next-line no-restricted-imports
import styled, { DefaultTheme } from 'styled-components/macro';
export const Styled = styled(Col)`
  display: flex;
  flex-direction: column;
  .wrap-app-link {
    display: flex;
    margin-top: 50px;
  }
  .app-link {
    width: 100%;
  }
  .ant-col {
    padding-right: 16px;
  }
  .ant-col:first-child {
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
      .wrap-app-link {
        margin-top: 32px;
      }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        padding-bottom: 48px;
        .banner-title {
          text-align: center;
        }
        .banner-sub-title {
          text-align: center;          
        }
        .wrap-app-link {
          margin-top: 24px;
        }
        .ant-col {
          padding-right: 4px;
          padding-left: 4px;
        }
        .section-head {
            margin: auto;
            margin-bottom: 16px
        }
        .section-link {
            margin: auto;
        }
    `}
`;

const MarketBanner = () => {
  const marketTrs = useSelector(marketTranslateSelector);
  return (
    <Styled xs={24} xl={11} xxl={9} className={`${isMobile ? '' : ''}`}>
      <SectionHead title="Privacy Markets" className="section-head" />
      <h1 className="text1 special-main-title-text banner-title">{marketTrs.mainTitle}</h1>
      <Col xs={24} lg={22}>
        <p className="text2 sub-title-text banner-sub-title">
          {`Here, your coins are privacy coins. Trade them cross-chain, commission-free.`}
        </p>
      </Col>
      <Col xs={24} xl={22} xxl={23} className="wrap-app-link">
        <Col xs={8} lg={8} xxl={6}>
          <a href="https://apps.apple.com/us/app/incognito-crypto-wallet/id1475631606?ls=1">
            <img className="app-link" src={appstore} alt="appstore" />
          </a>
        </Col>
        <Col xs={8} lg={8} xxl={6}>
          <a href="https://play.google.com/store/apps/details?id=com.incognito.wallet">
            <img className="app-link" src={ggplay} alt="ggplay" />
          </a>
        </Col>
        <Col xs={8} lg={8} xxl={6}>
          <a href="https://github.com/incognitochain/incognito-wallet/releases">
            <img className="app-link" src={apk} alt="apk" />
          </a>
        </Col>
      </Col>
      <SectionLink className="section-link" />
    </Styled>
  );
};

export default React.memo(MarketBanner);
