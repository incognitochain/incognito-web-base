import { Col } from 'antd';
import apk from 'assets/images/install/apk.png';
import appstore from 'assets/images/install/appstore.png';
import ggplay from 'assets/images/install/play.png';
import logoStrokeImg from 'assets/images/logo-stroke.png';
import React from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
const Styled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .wrap-logo {
    border: 1px solid ${({ theme }) => theme.white};
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
  }
  .logo {
    width: 88px;
    height: 88px;
  }
  .footer-title {
    font-weight: 500;
    letter-spacing: 0.015em;
    color: ${({ theme }) => theme.text1};
    margin-top: 40px;
    text-align: center;
  }
  .banner-wrap-content {
    right: 0;
    left: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .wrap-app-link {
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .app-link {
    width: 100%;
  }
  .footer-item {
    padding-right: 8px;
    padding-left: 8px;
  }
  .ant-col:first-child {
  }
  .banner-sub-title {
    margin-top: 24px;
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        .wrap-logo {
          height: 100px;
          width: 100px;
        }
        .logo {
            width: 73px;
            height: 73px;
        }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        padding-top: 40px;
        padding-bottom: 40px;
        .wrap-app-link {
          width: 100%;
        }
        .logo {
            width: 53px;
            height: 53px;
        }
        .wrap-logo {
            width: 72px;
            height: 72px;
        }
        .app-link-center {
          margin-left: 0px;
          margin-right: 0px;
          margin-top: 16px;
          margin-bottom: 16px;      
        }
        .footer-title {
          text-align: center;
          letter-spacing: 0.01em;
          max-width: 185px;
          margin-top: 16px;
        }
        .ant-col {
          padding-right: 4px;
          padding-left: 4px;
        }
        .wrap-app-link {
          margin-top: 24px;
        }
    `}
`;

const Footer = React.memo(() => {
  // Get started in a few minutes.
  return (
    <Styled className="default-padding-horizontal default-padding-vertical">
      <div className="wrap-logo">
        <img src={logoStrokeImg} className="logo" alt="logo" />
      </div>
      <p className="main-title-text footer-title">Get started in a few minutes.</p>
      <Col xs={24} xl={11} xxl={9} className="banner-wrap-content">
        <Col xs={24} xl={22} xxl={23} className="wrap-app-link">
          <Col className="footer-item" xs={8} lg={8} xxl={6}>
            <a href="https://apps.apple.com/us/app/incognito-crypto-wallet/id1475631606?ls=1">
              <img className="app-link" src={appstore} alt="appstore" />
            </a>
          </Col>
          <Col className="footer-item" xs={8} lg={8} xxl={6}>
            <a href="https://play.google.com/store/apps/details?id=com.incognito.wallet">
              <img className="app-link" src={ggplay} alt="ggplay" />
            </a>
          </Col>
          <Col className="footer-item" xs={8} lg={8} xxl={6}>
            <a href="https://github.com/incognitochain/incognito-wallet/releases">
              <img className="app-link" src={apk} alt="apk" />
            </a>
          </Col>
        </Col>
      </Col>
    </Styled>
  );
});

export default Footer;
