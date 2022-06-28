import '@reach/dialog/styles.css';
import 'inter-ui';
import 'polyfills';

import Web3Provider from 'components/Web3Provider';
import { BlockNumberProvider } from 'lib/hooks/useBlockNumber';
import { MulticallUpdater } from 'lib/state/multicall';
import App from 'pages/App';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from 'state';
import ApplicationUpdater from 'state/application/updater';
import ListsUpdater from 'state/lists/updater';
import LogsUpdater from 'state/logs/updater';
import TransactionUpdater from 'state/transactions/updater';
import UserUpdater from 'state/user/updater';
import { RadialGradientByChainUpdater, ThemedGlobalStyle, ThemeProvider } from 'theme';

import { LanguageProvider } from './i18n';

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

function Updaters() {
  return (
    <>
      <RadialGradientByChainUpdater />
      <ListsUpdater />
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
      <LogsUpdater />
    </>
  );
}

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <LanguageProvider>
          <Web3Provider>
            <BlockNumberProvider>
              <Updaters />
              <ThemeProvider>
                <ThemedGlobalStyle />
                <App />
              </ThemeProvider>
            </BlockNumberProvider>
          </Web3Provider>
        </LanguageProvider>
      </HashRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
