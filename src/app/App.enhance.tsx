// import { configStore, IConfigStore } from '@src/app-redux';
import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import styled from 'styled-components';

import { persistor, store } from '../app-redux';

const Wrapper = styled.div``;

const enhance = (WrappedComponent: FunctionComponent) => (props: any) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>...</div>} persistor={persistor}>
        <Wrapper>{!!store && <WrappedComponent {...props} />}</Wrapper>
      </PersistGate>
    </Provider>
  );
};

export default enhance;
