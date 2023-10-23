import useScrollPosition from '@react-hook/window-scroll';
import { Col, Dropdown, Menu, Row } from 'antd';
import closeIcon from 'assets/images/close.png';
import downImg from 'assets/images/down-icon.png';
import apk from 'assets/images/install/apk.png';
import appstore from 'assets/images/install/appstore.png';
import ggplay from 'assets/images/install/play.png';
import logo from 'assets/images/logo.png';
import menuBarIcon from 'assets/images/menu-bar.png';
import { ReactComponent as MoreIcon } from 'assets/images/more.svg';
import { ReactComponent as Logo } from 'assets/svg/logo.svg';
import { useInternetConnnection } from 'components/Core/InternetConnection';
import { INCOGNITO_LANDING_PAGE } from 'constants/routing';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import useTheme from 'hooks/useTheme';
import { routeInscription, routePeggingApps } from 'pages';
import React from 'react';
// import { ReactComponent as Logo } from 'assets/svg/logo.svg';
import { useSelector } from 'react-redux';
// import Web3Status from 'components/Core/Web3Status';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Link } from 'rebass';
import { METRIC_TYPE, METRIC_UNIQ, updateMetric } from 'services/rpcMetric';
import { defaultAccountSelector } from 'state/account/account.selectors';
import { poolsSelectors } from 'state/pools';
import { useDarkModeManager } from 'state/user/hooks';
import styled from 'styled-components/macro';
import { isMobile } from 'utils/userAgent';

import WebWallet from '../../../pages/IncWebWallet/components/WebWallet';
import { actionFreeSwapForm } from '../../../pages/Swap/features/FormUnshield/FormUnshield.actions';
import { useAppDispatch } from '../../../state/hooks';
import IncognitoWallet from '../IncognitoWallet';
import { useIncognitoWallet } from '../IncognitoWallet/IncongitoWallet.useContext';
// import IncognitoWallet from '../IncognitoWallet';
import { DrawerStyled, MenuDropdown, Styled } from './Header.styled';
// import NetworkSelector from './NetworkSelector';

interface MenuItemProps {
  name: string;
  path: string;
  isLink?: string | boolean;
  target?: string;
  metric?: number;
  uniqMetric?: number;
  isHide?: boolean;
}

let MenuItemList: MenuItemProps[] = [
  // {
  //   name: 'Markets',
  //   path: routeMarket,
  // },
  {
    name: 'PRV',
    path: '/get-prv',
    metric: METRIC_TYPE.HEADER_PRV,
    uniqMetric: METRIC_UNIQ.HEADER_PRV_UNIQ,
    isHide: false,
  },
  {
    name: 'Mine',
    path: '/mine/validator',
    metric: METRIC_TYPE.HEADER_MINE,
    uniqMetric: METRIC_UNIQ.HEADER_MINE_UNIQ,
    isHide: false,
  },
  {
    name: 'Use',
    path: routePeggingApps,
    metric: METRIC_TYPE.HEADER_PAPPS,
    uniqMetric: METRIC_UNIQ.HEADER_PAPPS_UNIQ,
    isHide: false,
  },
  // {
  //   name: 'Community',
  //   path: 'https://we.incognito.org/t/about-the-incognito-community/373',
  //   target: '_blank',
  //   isLink: true,
  // },
  {
    name: 'Inscriptions',
    path: routeInscription,
    metric: METRIC_TYPE.HEADER_INSCRIPTION,
    uniqMetric: METRIC_UNIQ.HEADER_INSCRIPTION_UNIQ,
    isHide: false,
  },
  {
    name: 'Forum',
    path: 'https://we.incognito.org/',
    target: '_blank',
    isLink: true,
    isHide: false,
  },
  // {
  //   name: 'Earning',
  //   path: routeEarnings,
  // },
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

  .navigation-list {
    align-items: center;
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: center;
    .wrap-inc-waller {
      position: absolute;
      right: 70px;
    }
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    align-items: center;
  `};
`;

const EarningBox = styled.div`
  background-color: #0ecb81;
  padding: 0px 4px;
  border-radius: 4px;
  margin-left: 8px;
  .content {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #ffffff;

    &__container {
      font-weight: 600;
      overflow: hidden;
      height: 16px;

      &__list {
        margin-top: 0;
        text-align: left;
        list-style: none;

        -webkit-animation-name: change;
        -webkit-animation-duration: 10s;
        -webkit-animation-iteration-count: infinite;
        animation-name: change;
        animation-duration: 10s;
        animation-iteration-count: infinite;

        &__item {
          line-height: 16px;
          margin: 0;
          font-weight: 600;
          font-size: 12px;
          color: #ffffff;
          text-align: center;
        }
      }
    }
  }

  @-webkit-keyframes opacity {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }

  @-webkit-keyframes change {
    0%,
    12.66%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    16.66%,
    29.32% {
      transform: translate3d(0, -25%, 0);
    }
    33.32%,
    45.98% {
      transform: translate3d(0, -50%, 0);
    }
    49.98%,
    62.64% {
      transform: translate3d(0, -75%, 0);
    }
    66.64%,
    79.3% {
      transform: translate3d(0, -50%, 0);
    }
    83.3%,
    95.96% {
      transform: translate3d(0, -25%, 0);
    }
  }

  @-o-keyframes opacity {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }

  @-o-keyframes change {
    0%,
    12.66%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    16.66%,
    29.32% {
      transform: translate3d(0, -25%, 0);
    }
    33.32%,
    45.98% {
      transform: translate3d(0, -50%, 0);
    }
    49.98%,
    62.64% {
      transform: translate3d(0, -75%, 0);
    }
    66.64%,
    79.3% {
      transform: translate3d(0, -50%, 0);
    }
    83.3%,
    95.96% {
      transform: translate3d(0, -25%, 0);
    }
  }

  @-moz-keyframes opacity {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }

  @-moz-keyframes change {
    0%,
    12.66%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    16.66%,
    29.32% {
      transform: translate3d(0, -25%, 0);
    }
    33.32%,
    45.98% {
      transform: translate3d(0, -50%, 0);
    }
    49.98%,
    62.64% {
      transform: translate3d(0, -75%, 0);
    }
    66.64%,
    79.3% {
      transform: translate3d(0, -50%, 0);
    }
    83.3%,
    95.96% {
      transform: translate3d(0, -25%, 0);
    }
  }

  @keyframes opacity {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes change {
    0%,
    12.66%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    16.66%,
    29.32% {
      transform: translate3d(0, -25%, 0);
    }
    33.32%,
    45.98% {
      transform: translate3d(0, -50%, 0);
    }
    49.98%,
    62.64% {
      transform: translate3d(0, -75%, 0);
    }
    66.64%,
    79.3% {
      transform: translate3d(0, -50%, 0);
    }
    83.3%,
    95.96% {
      transform: translate3d(0, -25%, 0);
    }
  }
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
  const currentAccount = useSelector(defaultAccountSelector);
  const [darkMode] = useDarkModeManager();
  const { white, black } = useTheme();
  const isInternetAlready = useInternetConnnection();
  const scrollY = useScrollPosition();
  const dispatch = useAppDispatch();

  const { isIncognitoInstalled } = useIncognitoWallet();

  const [pathName, setPathName] = React.useState<string>('');
  const [visible, setVisible] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  const listPool = useSelector(poolsSelectors);

  const openMenu = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const menuItem = React.useMemo(() => MenuItemList.filter((item) => !item.isHide), []);

  React.useEffect(() => {
    const menuName = (menuItem.find((item: any) => item.path === history.location.pathname) as any)?.name;
    if (menuName) {
      setPathName(menuName);
    } else {
      setPathName('');
    }
  }, [window.location.pathname, menuItem]);

  // React.useEffect(() => {
  //   const { pathname = '' } = location;
  //   if (pathname === ValidatorRoute) {
  //     setPathName(menuItem[3].name);
  //   }
  // }, [location]);

  const MoreMenu = (type: 'diveIn' | 'download') => {
    if (type === 'download') {
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
                <img
                  src={item?.image}
                  alt={item?.name}
                  style={{ width: 140, height: 40, alignItems: 'center' }}
                  className="button-hover"
                />
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
              style={{ marginBottom: 16, paddingLeft: 16, paddingRight: 16 }}
              onClick={() => window.open(item.path, '_blank')}
            >
              <Row align="middle">
                <p className="fs-medium">{item.name}</p>
                <div className="logo" />
              </Row>
              <p className="text2 fs-small" style={{ textAlign: 'left' }}>
                {item.sub}
              </p>
            </Menu.Item>
          );
        })}
      </MenuDropdown>
    );
  };

  const renderEarningBox = () => {
    if (!listPool?.length) return;
    return (
      <EarningBox>
        <div className="content">
          <div className="content__container">
            <ul className="content__container__list">
              <li className="content__container__list__item">Up to</li>
              <li className="content__container__list__item">{listPool[0].apy}%</li>
              <li className="content__container__list__item">Up to</li>
              <li className="content__container__list__item">{listPool[0].apy}%</li>
            </ul>
          </div>
        </div>
      </EarningBox>
    );
  };

  // if (!isEmpty(currentAccount) && !menuItem.find((item: any) => item?.name === 'Account')) {
  //   menuItem.push({
  //     name: 'Account',
  //     path: '/wallet/account',
  //   });
  // }

  // if (!isEmpty(currentAccount) && !menuItem.find((item: any) => item?.name === 'Settings')) {
  //   menuItem.push({
  //     name: 'Settings',
  //     path: '/wallet/settings',
  //   });
  // }

  const renderContent = () => {
    const hrefLink = !isInternetAlready || !isMobile ? '.' : INCOGNITO_LANDING_PAGE;

    return (
      <>
        <Title onClick={() => history.replace('/')}>
          <IncognitoIcon>
            <Logo fill={darkMode ? white : black} width="142" height="100%" title="logo" />
          </IncognitoIcon>
        </Title>
        {/*<HeaderElement>*/}
        {/*  <NetworkSelector />*/}
        {/*</HeaderElement>*/}
        <HeaderElement>
          {/* <Menu /> */}
          <div className="navigation-list default-padding-horizontal">
            <div className="wrap-menu-desktop center">
              {menuItem.map((item) => {
                const isActive = item.name === pathName;
                return (
                  <div
                    className="menuItem"
                    onClick={() => {
                      if (item.metric && item.uniqMetric) {
                        updateMetric({ metric: item.metric, uniqMetric: item.uniqMetric });
                      }
                      setPathName(item.name);
                    }}
                    key={item.name}
                  >
                    {item?.isLink ? (
                      <Link href={item.path} target="_blank" rel="noopener noreferrer" className={'color-white'}>
                        {item.name}
                      </Link>
                    ) : (
                      <NavLink
                        target={item.target}
                        to={item.path}
                        onClick={() => {
                          if (item.path === '/swap') {
                            dispatch(actionFreeSwapForm());
                          }
                        }}
                        className={`${isActive ? 'color-blue' : 'color-white'}`}
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        {item.name}
                        {item.name === 'Earning' && renderEarningBox()}
                      </NavLink>
                    )}
                  </div>
                );
              })}
              {/*<Dropdown*/}
              {/*  overlayStyle={{ width: 120 }}*/}
              {/*  overlay={MoreMenu(isMobile ? 'diveIn' : 'download')}*/}
              {/*  placement="bottomRight"*/}
              {/*  className="more-dropdown"*/}
              {/*>*/}
              {/*  <Row align="middle" className="button-hover">*/}
              {/*    <p className="sub-menu-text">{isMobile ? 'Dive in' : 'Download'}</p>*/}
              {/*    <img className="logo" alt="" src={downImg} style={{ width: 14, height: 14, marginLeft: 10 }} />*/}
              {/*  </Row>*/}
              {/*</Dropdown>*/}
            </div>
          </div>
        </HeaderElement>

        {!isMobile && (
          <>
            <HeaderElement>
              {/*<AccountElement active={!!account}>*/}
              {/*  <Web3Status />*/}
              {/*</AccountElement>*/}
              <Dropdown
                overlayStyle={{ width: 120 }}
                overlay={MoreMenu('download')}
                placement="bottomRight"
                className="more-dropdown"
              >
                <Row align="middle" className="button-hover">
                  <MoreIcon style={{ marginRight: 16 }} />
                </Row>
              </Dropdown>
              {isIncognitoInstalled() ? <IncognitoWallet /> : <WebWallet />}
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
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
          </div>
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
              {/*{isMobile ? 'Dive in' : 'Download'}*/}
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
          {expand && (
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
          {/*{expand && isMobile && (*/}
          {/*  <Col style={{ marginTop: 24 }}>*/}
          {/*    {moreItem.map((item) => (*/}
          {/*      <div className="wrap-drawer-sub-item padding padding-horizontal" key={item.name}>*/}
          {/*        <Link href={item.path} target="_blank" rel="noopener noreferrer" className="padding-horizontal">*/}
          {/*          <Row align="middle">*/}
          {/*            <p className="drawer-sub-item-label">{item.name}</p>*/}
          {/*            <div className="logo" />*/}
          {/*          </Row>*/}
          {/*          <p className="drawer-sub-item-desc-label">{item.sub}</p>*/}
          {/*        </Link>*/}
          {/*      </div>*/}
          {/*    ))}*/}
          {/*  </Col>*/}
          {/*)}*/}
        </DrawerStyled>
      </>
    );
  };

  return <Styled className="default-max-width">{renderContent()}</Styled>;
}
