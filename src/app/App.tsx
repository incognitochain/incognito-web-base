import Web3Provider from '@connections/Web3Provider';
import MainRoute from '@modules/MainRoute/MainRoute';
import withApp from '@src/app/App.enhance';
import { ThemedGlobalStyle, ThemeProvider } from '@src/theme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FunctionComponent = () => {
  return (
    <Web3Provider>
      <ThemeProvider>
        <ThemedGlobalStyle />
        <Router>
          <MainRoute />
        </Router>
      </ThemeProvider>
    </Web3Provider>
  );
};

export default withApp(React.memo(App));
