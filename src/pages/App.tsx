// eslint-disable-next-line no-restricted-imports
import 'antd/dist/antd.css';
import './reset.scss';

import ErrorBoundary from 'components/Core/ErrorBoundary';
import Footer from 'components/Core/Footer';
import Header from 'components/Core/Header';
import IncognitoWalletProvider from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { useInternetConnnection } from 'components/Core/InternetConnection';
import Loader from 'components/Core/Loader';
import Popups from 'components/Core/Popups';
import React, { Suspense, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components/macro';
import { DarkModeQueryParamReader } from 'theme';

import rpcMetric, { METRIC_TYPE } from '../services/rpcMetric';
import enhance from './App.enhance';
import BuyNode from './BuyNode';
import Earnings from './Earnings';
import Validators from './Earnings/features/Validators/Validators';
import { GetPRV } from './GetPRV';
import Home from './Home';
import InternetDisconnected from './InternetDisconnected/InternetDisconnected';
import Market from './Market';
import Page404 from './Page404';
import PeggingApp from './PeggingApp';
import Policy from './Policy';
import POpensea from './POpensea';
import POpenseaDetail from './POpenseaDetail';
import POpenseaNFTDetail from './POpenseaNFTDetail';
import Structure from './Structure';
import DepositPage from './Swap/features/DepositPage';
import SwapExchange from './Swap/features/SwapExchange';
import TermOfService from './TermOfService';

export const HEADER_ID = 'HEADER_VIEW';
export const FOOTER_ID = 'FOOTER_VIEW';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 130px 0 0 0;
  align-items: center;
  flex: 1;
  z-index: 1;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 4rem 8px 16px 8px;
  `};
`;

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
  background-color: ${({ theme }) => theme.bg2};
`;

const SupportIcon = styled.img`
  height: 50px;
  width: 50px;
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const App = () => {
  const history = useHistory();
  const isInternetAlready = useInternetConnnection();

  const updateMetric = () => rpcMetric.updateMetric({ type: METRIC_TYPE.OPEN });

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  useEffect(() => {
    if (!isInternetAlready) {
      history.replace('/internet-disconnected');
    } else {
      // history.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInternetAlready]);

  useEffect(() => {
    updateMetric().then();
  }, []);

  const renderContent = () => {
    return (
      <Switch>
        <Route exact path="/internet-disconnected" component={InternetDisconnected} />
        <Route exact path="/" component={Home} />
        <Route exact path={['/wallet', '/mine', '/wallet.html']} component={Structure} />
        <Route exact path="/swap" component={Market} />
        <Route exact path="/papps/:id" component={SwapExchange} />
        <Route exact path="/papps" component={PeggingApp} />
        <Route exact path="/earnings" component={Earnings} />
        <Route exact path="/privacy-policy" component={Policy} />
        <Route exact path="/term-of-service" component={TermOfService} />
        <Route exact path="/mine/validator" component={Validators} />
        <Route exact path="/get-prv" component={GetPRV} />
        <Route exact path="/buy-node" component={BuyNode} />
        <Route exact path="/deposit" component={DepositPage} />
        <Route exact path="/popensea" component={POpensea} />
        <Route exact path="/papps/popensea/detail/:contract" component={POpenseaDetail} />
        <Route exact path="/papps/popensea/detail/:contract/:tokenId" component={POpenseaNFTDetail} />
        <Route exact path="/buy-node" component={BuyNode} />
        <Route exact path="/deposit" component={DepositPage} />
        <Route component={Page404} />
      </Switch>
    );
  };

  return (
    <ErrorBoundary>
      <Route component={DarkModeQueryParamReader} />
      <IncognitoWalletProvider>
        <AppWrapper>
          <HeaderWrapper id={HEADER_ID}>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <Popups />
            <Suspense fallback={<Loader />}>{renderContent()}</Suspense>
            <Footer />
            {/*{!isMobile && (*/}
            {/*  <div*/}
            {/*    style={{*/}
            {/*      position: 'fixed',*/}
            {/*      bottom: 24,*/}
            {/*      right: 24,*/}
            {/*      display: 'flex',*/}
            {/*      flexDirection: 'column',*/}
            {/*      zIndex: 3,*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <SupportIcon*/}
            {/*      onClick={() => {*/}
            {/*        window.open('https://we.incognito.org/g/Support', '_blank');*/}
            {/*      }}*/}
            {/*      src={messageIcon}*/}
            {/*    />*/}
            {/*    <div style={{ height: 16 }} />*/}
            {/*    <SupportIcon*/}
            {/*      onClick={() => {*/}
            {/*        window.open('https://t.me/incognitochain', '_blank');*/}
            {/*      }}*/}
            {/*      src={supportIcon}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*)}*/}
          </BodyWrapper>
        </AppWrapper>
      </IncognitoWalletProvider>
      <ToastContainer
        position="bottom-center"
        toastClassName="white-color"
        closeButton={<></>}
        toastStyle={{ backgroundColor: '#252525', borderColor: '#363636', borderWidth: 1 }}
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ErrorBoundary>
  );
};

export default enhance(App);
