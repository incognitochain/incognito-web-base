// import 'react-toastify/scss/main.scss';
// eslint-disable-next-line no-restricted-imports
import 'antd/dist/antd.css';
import './reset.scss';

import ErrorBoundary from 'components/Core/ErrorBoundary';
import Header from 'components/Core/Header';
import IncognitoWalletProvider from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { useInternetConnnection } from 'components/Core/InternetConnection';
import Loader from 'components/Core/Loader';
import Popups from 'components/Core/Popups';
import MobileNotSuported from 'pages/MobileNotSuported/MobileNotSuported';
import { Suspense, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components/macro';
import { DarkModeQueryParamReader } from 'theme';
import { isMobile } from 'utils/userAgent';

import rpcMetric, { METRIC_TYPE } from '../services/rpcMetric';
import enhance from './App.enhance';
import Earnings from './Earnings';
import InternetDisconnected from './InternetDisconnected/InternetDisconnected';
import Market from './Market';
import PageNotFound from './PageNotFound/PageNotFound';
import PeggingApp from './PeggingApp';
import Policy from './Policy';
import Structure from './Structure';
import Swap, { RedirectToSwap } from './Swap';
import TermOfService from './TermOfService';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 120px 16px 0px 16px;
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

const Marginer = styled.div`
  margin-top: 5rem;
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInternetAlready]);

  useEffect(() => {
    updateMetric().then();
  }, []);

  const renderContent = () => {
    return (
      <Switch>
        {isMobile ? (
          <Route component={MobileNotSuported} />
        ) : (
          <>
            <Route exact path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact path="/swap" component={Swap} />
            <Route exact path="/page-not-found" component={PageNotFound} />
            <Route exact path="/internet-disconnected" component={InternetDisconnected} />
            <Route exact path="/" component={Market} />
            <Route exact path="/market" component={Market} />
            <Route exact path="/apps" component={PeggingApp} />
            <Route exact path="/infrastructure" component={Structure} />
            <Route exact path="/earnings" component={Earnings} />
            <Route exact path="/privacy-policy" component={Policy} />
            <Route exact path="/term-of-service" component={TermOfService} />
          </>
        )}
      </Switch>
    );
  };

  return (
    <ErrorBoundary>
      <Route component={DarkModeQueryParamReader} />
      <IncognitoWalletProvider>
        <AppWrapper>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <Popups />
            <Suspense fallback={<Loader />}>{renderContent()}</Suspense>
            <Marginer />
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
