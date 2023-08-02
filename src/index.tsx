/* eslint-disable no-restricted-imports */
import '@reach/dialog/styles.css';
import 'inter-ui';
import 'polyfills';
import 'preprocessor';
import './wallet';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './reset.scss';

import AppSpinner from 'components/AppSpinner';
import Web3Provider from 'components/Core/Web3Provider';
import { ModalProvider } from 'components/Modal';
import { BlockNumberProvider } from 'lib/hooks/useBlockNumber';
import { MulticallUpdater } from 'lib/state/multicall';
import App from 'pages/App';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'state';
import ApplicationUpdater from 'state/application/updater';
import ListsUpdater from 'state/lists/updater';
import LogsUpdater from 'state/logs/updater';
import TransactionUpdater from 'state/transactions/updater';
import UserUpdater from 'state/user/updater';
import { RadialGradientByChainUpdater, ThemedGlobalStyle, ThemeProvider } from 'theme';

import { LanguageProvider } from './i18n';
import useWalletController from './pages/IncWebWallet/hooks/useWalletController';

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

function WalletDectector() {
  useWalletController();
  return <></>;
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
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <WalletDectector />
          <LanguageProvider>
            <Web3Provider>
              <BlockNumberProvider>
                <Updaters />
                <ThemeProvider>
                  <ThemedGlobalStyle />
                  <ModalProvider>
                    <App />
                  </ModalProvider>
                  <AppSpinner />
                </ThemeProvider>
              </BlockNumberProvider>
            </Web3Provider>
          </LanguageProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
