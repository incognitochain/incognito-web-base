import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import styled from 'styled-components';

import { persistor, store } from '../app-redux';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`;

const enhance = (WrappedComponent: FunctionComponent) => (props: any) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>...</div>} persistor={persistor}>
        <AppWrapper>{!!store && <WrappedComponent {...props} />}</AppWrapper>
      </PersistGate>
    </Provider>
  );
};

export default enhance;
