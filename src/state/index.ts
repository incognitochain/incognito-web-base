import { configureStore } from '@reduxjs/toolkit';
import { reducer as tabs } from 'components/Core/Tabs';
import multicall from 'lib/state/multicall';
import { reducer as pBlur } from 'pages/Blur';
import swap from 'pages/Swap/Swap.reducer';
import { reducer as form } from 'redux-form';
import { load, save } from 'redux-localstorage-simple';
import logger from 'redux-logger';

import { isMainnet } from '../config';
import application from './application/reducer';
import dao from './dao';
import { updateVersion } from './global/actions';
import incognitoWallet from './incognitoWallet/incognitoWallet.reducer';
import lists from './lists/reducer';
import logs from './logs/slice';
import pool from './pools/pool.reducer';
import pOpensea from './pOpensea/pOpensea.reducer';
import { routingApi } from './routing/slice';
// import swap from './swap/reducer';
import token from './token/token.reducer';
import transactions from './transactions/reducer';
import user from './user/reducer';
import wallet from './wallet/reducer';

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists'];

const store = configureStore({
  reducer: {
    application,
    user,
    wallet,
    transactions,
    swap,
    multicall: multicall.reducer,
    lists,
    logs,
    token,
    pool,
    dao,
    [routingApi.reducerPath]: routingApi.reducer,
    tabs,
    form,
    incognitoWallet,
    pOpensea,
    pBlur,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(routingApi.middleware)
      .concat(!isMainnet ? [] : [logger])
      .concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: process.env.NODE_ENV === 'test' }),
});

store.dispatch(updateVersion());

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppGetState = () => AppState;

export default store;
