import useScrollPosition from '@react-hook/window-scroll';
import { Col, Dropdown, Menu, Row } from 'antd';
import closeIcon from 'assets/images/close.png';
import downImg from 'assets/images/down-icon.png';
import apk from 'assets/images/install/apk.png';
import appstore from 'assets/images/install/appstore.png';
import ggplay from 'assets/images/install/play.png';
// import { ReactComponent as Logo } from 'assets/svg/logo.svg';
import logo from 'assets/images/logo.png';
import menuBarIcon from 'assets/images/menu-bar.png';
import { ReactComponent as Logo } from 'assets/svg/logo.svg';
import { useInternetConnnection } from 'components/Core/InternetConnection';
// import Web3Status from 'components/Core/Web3Status';
import { INCOGNITO_LANDING_PAGE } from 'constants/routing';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import useTheme from 'hooks/useTheme';
import { routeEarnings, routeMarket, routePeggingApps, routeStructure } from 'pages';
import React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Link } from 'rebass';
import { useDarkModeManager } from 'state/user/hooks';
import styled from 'styled-components/macro';
import { isMobile } from 'utils/userAgent';

import IncognitoWallet from '../IncognitoWallet';
import Web3Status from '../Web3Status';
// import IncognitoWallet from '../IncognitoWallet';
import { DrawerStyled, MenuDropdown, Styled } from './Header.styled';
import NetworkSelector from './NetworkSelector';
// import NetworkSelector from './NetworkSelector';

interface MenuItemProps {
  name: string;
  path: string;
  isLink?: string;
  target?: string;
}

const menuItem: MenuItemProps[] = [
  {
    name: 'Markets',
    path: routeMarket,
  },
  {
    name: 'Apps',
    path: routePeggingApps,
  },
  {
    name: 'Infrastructure',
    path: routeStructure,
  },
  // {
  //   name: 'Community',
  //   path: 'https://we.incognito.org/t/about-the-incognito-community/373',
  //   target: '_blank',
  //   isLink: true,
  // },
  {
    name: 'Earnings',
    path: routeEarnings,
  },
];

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

const appStoreIcons = [
  {
    name: 'AppStore',
    image: appstore,
    path: 'https://apps.apple.com/us/app/incognito-crypto-wallet/id1475631606?ls=1',
  },
  {
    name: 'CHPlay',
    image: ggplay,
    path: 'https://play.google.com/store/apps/details?id=com.incognito.wallet',
  },
  {
    name: 'APK',
    image: apk,
    path: 'https://github.com/incognitochain/incognito-wallet/releases',
  },
];

const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: grid;
  grid-template-columns: 142px 120px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  z-index: 21;
  background-position: ${({ showBackground }) => (showBackground ? '0 -100%' : '0 0')};
  background-size: 100% 200%;
  background-blend-mode: hard-light;
  min-height: 72px;
  padding-left: 40px;
  padding-right: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.border1};
  background-color: ${({ theme }) => theme.bg2}; ;
`;

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`;

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-left: 0.5em;
  }

  /* addresses safaris lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: center;
  `};
`;

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  width: 100%;
  height: 40px;
`;

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`;

const IncognitoIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-1deg);
  }

  position: relative;
`;

export default function Header() {
  const { account } = useActiveWeb3React();
  const [darkMode] = useDarkModeManager();
  const { white, black } = useTheme();
  const isInternetAlready = useInternetConnnection();
  const scrollY = useScrollPosition();

  const [pathName, setPathName] = React.useState<string>('');
  const [visible, setVisible] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  const history = useHistory();
  const location = useLocation();
  const openMenu = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  React.useEffect(() => {
    const menuName = (menuItem.find((item: any) => item.path === history.location.pathname) as any)?.name;
    if (menuName) {
      setPathName(menuName);
    } else {
      setPathName('');
    }
  }, [window.location.pathname]);

  // React.useEffect(() => {
  //   const { pathname = '' } = location;
  //   if (pathname === ValidatorRoute) {
  //     setPathName(menuItem[3].name);
  //   }
  // }, [location]);

  const MoreMenu = () => {
    if (!isMobile) {
      return (
        <MenuDropdown
          className="sub-menu-header"
          style={{ width: 200, paddingTop: 16, alignItems: 'center', textAlign: 'center' }}
        >
          {appStoreIcons.map((item) => {
            return (
              <Menu.Item
                className="dropdown-menu-item"
                key={item.name}
                style={{ marginBottom: 16 }}
                onClick={() => window.open(item.path, '_blank')}
              >
                <img src={item?.image} alt={item?.name} style={{ width: 140, height: 40, alignItems: 'center' }} />
              </Menu.Item>
            );
          })}
        </MenuDropdown>
      );
    }

    return (
      <MenuDropdown
        className="sub-menu-header"
        style={{ width: 200, paddingTop: 16, alignItems: 'center', textAlign: 'center' }}
      >
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
  };

  const renderContent = () => {
    const hrefLink = !isInternetAlready || !isMobile ? '.' : INCOGNITO_LANDING_PAGE;
    return (
      <>
        <Title href={hrefLink}>
          <IncognitoIcon>
            <Logo fill={darkMode ? white : black} width="142" height="100%" title="logo" />
          </IncognitoIcon>
        </Title>
        <HeaderElement>
          <NetworkSelector />
        </HeaderElement>
        <HeaderElement>
          {/* <Menu /> */}
          <div style={{ alignItems: 'center', display: 'flex' }} className="default-padding-horizontal">
            <div className="wrap-menu-desktop center">
              {menuItem.map((item) => {
                const isActive = item.name === pathName ? true : false;
                return (
                  <div className="menuItem" onClick={() => setPathName(item.name)} key={item.name}>
                    {item?.isLink ? (
                      <Link href={item.path} target="_blank" rel="noopener noreferrer">
                        {item.name}
                      </Link>
                    ) : (
                      <NavLink
                        target={item.target}
                        to={item.path}
                        className={`${isActive ? 'color-blue' : 'color-white'}`}
                      >
                        {item.name}
                      </NavLink>
                    )}
                  </div>
                );
              })}
              <Dropdown
                overlayStyle={{ width: 120 }}
                overlay={MoreMenu}
                placement="bottomRight"
                className="more-dropdown"
              >
                <Row align="middle">
                  <p className="sub-menu-text">{isMobile ? 'Dive in' : 'Download'}</p>
                  <img className="logo" alt="" src={downImg} style={{ width: 14, height: 14, marginLeft: 10 }} />
                </Row>
              </Dropdown>
            </div>
          </div>
        </HeaderElement>

        {!isMobile && (
          <>
            <HeaderElement>
              <AccountElement active={!!account}>
                <Web3Status />
              </AccountElement>
              <IncognitoWallet />
            </HeaderElement>
          </>
        )}
        <div className="menu-mobile btn-round" onClick={openMenu}>
          <img src={menuBarIcon} style={{ width: 32, height: 32 }} alt="close-icon" />
        </div>
        <DrawerStyled
          placement="right"
          width="100%"
          closable
          visible={visible}
          key="right"
          onClose={onClose}
          drawerStyle={{ backgroundColor: '#1A1A1A', paddingTop: 0 }}
          headerStyle={{
            backgroundColor: '#1A1A1A',
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            height: 0,
            padding: 0,
          }}
        >
          <Row
            align="middle"
            justify="space-between"
            className="border-bottom"
            style={{ height: 76, marginBottom: 32 }}
          >
            <Row className="padding-horizontal" justify="space-between">
              <NavLink className="logo-mobile" to="/" onClick={onClose} style={{ width: 162 }}>
                <img className="app-logo" src={logo} alt="app-logo" style={{ width: 162 }} />
              </NavLink>
              <div onClick={onClose}>
                <img src={closeIcon} style={{ width: 32, height: 32 }} alt="close-icon" />
              </div>
            </Row>
          </Row>
          <Col>
            {menuItem.map((item) => {
              if (item.isLink) {
                return (
                  <Link
                    className="padding-horizontal"
                    style={{
                      color: 'white',
                      marginTop: 16,
                      fontWeight: 500,
                      fontSize: 34,
                    }}
                    href={item.path}
                    target="_blank"
                    key={item.name}
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </Link>
                );
              }
              return (
                <NavLink
                  className="padding-horizontal"
                  key={item.name}
                  style={{
                    color: 'white',
                    marginTop: 16,
                    fontSize: 34,
                  }}
                  to={item.path}
                  onClick={onClose}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </Col>
          <Row
            align="middle"
            className="padding-horizontal"
            style={{ paddingTop: 16 }}
            onClick={() => setExpand((expand) => !expand)}
          >
            <p
              className="sub-menu-text"
              style={{
                color: 'white',
                fontWeight: 500,
                fontSize: 34,
              }}
            >
              Download
            </p>
            <img
              className="dropdown-icon"
              alt=""
              src={downImg}
              style={{
                marginLeft: 10,
                marginTop: 3,
                transform: expand ? '' : 'rotate(180deg)',
                transition: 'transform 150ms ease',
              }}
            />
          </Row>
          {expand && !isMobile && (
            <Col style={{ marginTop: 24 }}>
              {appStoreIcons.map((item) => (
                <div className="wrap-drawer-sub-item" key={item.name}>
                  <Link href={item.path} target="_blank" rel="noopener noreferrer" className="padding-horizontal">
                    <img className="app-link" src={item.image} alt={item?.name} style={{ width: 200, height: 60 }} />
                  </Link>
                </div>
              ))}
            </Col>
          )}
          {expand && isMobile && (
            <Col style={{ marginTop: 24 }}>
              {moreItem.map((item) => (
                <div className="wrap-drawer-sub-item" key={item.name}>
                  <Link href={item.path} target="_blank" rel="noopener noreferrer" className="padding-horizontal">
                    <Row align="middle">
                      <p className="drawer-sub-item-label">{item.name}</p>
                      <div className="logo" />
                    </Row>
                    <p className="drawer-sub-item-desc-label">{item.sub}</p>
                  </Link>
                </div>
              ))}
            </Col>
          )}
        </DrawerStyled>
      </>
    );
  };

  return <Styled className="default-padding-horizontal">{renderContent()}</Styled>;
}
