import MainRoute from '@modules/MainRoute/MainRoute';
import withApp from '@src/app/App.enhance';
import { ThemedGlobalStyle, ThemeProvider } from '@src/theme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider>
      <ThemedGlobalStyle />
      <Router>
        <MainRoute />
      </Router>
    </ThemeProvider>
  );
};

export default withApp(React.memo(App));
