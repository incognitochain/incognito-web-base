import { Col, Dropdown, Menu, Row } from 'antd';
import downImg from 'assets/images/down-icon.png';
import apk from 'assets/images/install/apk.png';
import appstore from 'assets/images/install/appstore.png';
import ggplay from 'assets/images/install/play.png';
import { MenuDropdown } from 'components/Core/Header/Header.styled';
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

const moreItem = [
  {
    name: 'Explorer',
    path: 'https://explorer.incognito.org',
    sub: 'The network',
  },
  {
    name: 'White Paper',
    path: 'https://we.incognito.org/t/incognito-whitepaper-incognito-mode-for-cryptonetworks/168',
    sub: 'The Incognito mode',
  },
  {
    name: 'Roadmap',
    path: 'https://we.incognito.org/t/incognito-2022-technical-roadmap/15002',
    sub: 'The development',
  },

  {
    name: 'Community',
    path: 'https://we.incognito.org/t/about-the-incognito-community/373',
    sub: 'The Community',
  },
];

const MoreMenu = () => (
  <MenuDropdown className="sub-menu-header" style={{ width: 200, paddingTop: 16, paddingLeft: 24, paddingRight: 10 }}>
    {moreItem.map((item) => {
      return (
        <Menu.Item
          className="dropdown-menu-item"
          key={item.name}
          style={{ marginBottom: 16 }}
          onClick={() => window.open(item.path, '_blank')}
        >
          <Row align="middle">
            <p className="fs-medium">{item.name}</p>
            <div className="logo" />
          </Row>
          <p className="text2 fs-small">{item.sub}</p>
        </Menu.Item>
      );
    })}
  </MenuDropdown>
);

const MarketBanner = () => {
  const marketTrs = useSelector(marketTranslateSelector);
  return (
    <Styled xs={24} xl={11} xxl={9} className={`${isMobile ? '' : ''}`}>
      <SectionHead title="Privacy Markets" className="section-head" />
      <h1 className="text1 special-main-title-text banner-title">{marketTrs.mainTitle}</h1>
      <p className="text2 sub-title-text banner-sub-title">
        {`Here, your coins are privacy coins. Trade them cross-chain. `}
        {!isMobile && (
          <span className="text3 link-text">
            <Dropdown
              overlayStyle={{ width: 120 }}
              overlay={MoreMenu}
              placement="bottomRight"
              className="more-dropdown"
            >
              <span className="text1 sub-menu-text button-hover">
                Dive in
                <img className="logo" alt="" src={downImg} style={{ width: 14, height: 14, marginLeft: 10 }} />
              </span>
            </Dropdown>
          </span>
        )}
      </p>
      {isMobile && (
        <>
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
        </>
      )}
    </Styled>
  );
};

export default React.memo(MarketBanner);
