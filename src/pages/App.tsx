import ErrorBoundary from 'components/Core/ErrorBoundary';
import Header from 'components/Core/Header';
import Polling from 'components/Core/Header/Polling';
import Loader from 'components/Core/Loader';
import Popups from 'components/Core/Popups';
import TopLevelModals from 'components/TopLevelModals';
import Swap, { RedirectPathToSwapOnly, RedirectToSwap } from 'pages/Swap';
import { Suspense } from 'react';
import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { DarkModeQueryParamReader } from 'theme';

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

export default function App() {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <ErrorBoundary>
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
          <Popups />
          <Polling />
          <TopLevelModals />
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
              <Route exact strict path="/swap" component={Swap} />
              <Route component={RedirectPathToSwapOnly} />
            </Switch>
          </Suspense>
          <Marginer />
        </BodyWrapper>
      </AppWrapper>
    </ErrorBoundary>
  );
}
