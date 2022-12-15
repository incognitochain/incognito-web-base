// eslint-disable-next-line no-restricted-imports
import 'antd/dist/antd.css';
import './reset.scss';

import messageIcon from 'assets/svg/message.svg';
import supportIcon from 'assets/svg/support.svg';
import ErrorBoundary from 'components/Core/ErrorBoundary';
import Footer from 'components/Core/Footer';
import Header from 'components/Core/Header';
import IncognitoWalletProvider from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { useInternetConnnection } from 'components/Core/InternetConnection';
import Loader from 'components/Core/Loader';
import Popups from 'components/Core/Popups';
import React, { Suspense, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Route, Switch, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components/macro';
import { DarkModeQueryParamReader } from 'theme';

import rpcMetric, { METRIC_TYPE } from '../services/rpcMetric';
import enhance from './App.enhance';
import Earnings from './Earnings';
import Validators from './Earnings/features/Validators/Validators';
import Home from './Home';
import InternetDisconnected from './InternetDisconnected/InternetDisconnected';
import Market from './Market';
import PageNotFound from './PageNotFound/PageNotFound';
import PeggingApp from './PeggingApp';
import Policy from './Policy';
import Structure from './Structure';
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
        <>
          {/* <Route exact path="/swap/:outputCurrency" component={RedirectToSwap} /> */}
          <Route exact path="/page-not-found" component={PageNotFound} />
          <Route exact path="/internet-disconnected" component={InternetDisconnected} />
          {/*<Route exact path="/" component={Market} />*/}
          <Route exact path="/" component={Home} />
          <Route exact path="/swap" component={Market} />
          <Route exact path="/use" component={PeggingApp} />
          <Route exact path="/mine" component={Structure} />
          <Route exact path="/earnings" component={Earnings} />
          <Route exact path="/privacy-policy" component={Policy} />
          <Route exact path="/term-of-service" component={TermOfService} />
          <Route exact path="/mine/validator" component={Validators} />
        </>
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
            {!isMobile && (
              <div
                style={{
                  position: 'fixed',
                  bottom: 24,
                  right: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: 3,
                }}
              >
                <SupportIcon
                  onClick={() => {
                    window.open('https://we.incognito.org/g/Support', '_blank');
                  }}
                  src={messageIcon}
                />
                <div style={{ height: 16 }} />
                <SupportIcon
                  onClick={() => {
                    window.open('https://t.me/incognitochain', '_blank');
                  }}
                  src={supportIcon}
                />
              </div>
            )}
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
