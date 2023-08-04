import { configureStore } from '@reduxjs/toolkit';
import { reducer as tabs } from 'components/Core/Tabs';
import multicall from 'lib/state/multicall';
import { reducer as followTokenSelectedReducer } from 'pages/IncWebWallet/state/followTokenSelected.reducer';
import swap from 'pages/Swap/Swap.reducer';
// import webWalletReducer from 'pages/IncWebWallet/WebWallet.reducer';
import { $CombinedState, AnyAction, combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { load, save } from 'redux-localstorage-simple';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { isDevelopment, isMainnet } from '../config';
import { reducer as account } from './account/account.reducer';
import application from './application/reducer';
import dao from './dao';
import { reducer as followTokensReducer } from './followTokens/followTokens.reducer';
import { updateVersion } from './global/actions';
import incognitoWallet from './incognitoWallet/incognitoWallet.reducer';
import inscriptionsReducer from './inscriptions/inscriptions.reducer';
import lists from './lists/reducer';
import loadingReducer from './loading/loading.reducer';
import logs from './logs/slice';
import masterKey from './masterKey/masterKey.reducer';
import { reducer as networkReducer } from './network/network.reducer';
import pool from './pools/pool.reducer';
import pOpensea from './pOpensea/pOpensea.reducer';
import { routingApi } from './routing/slice';
import scanCoinsReducer from './scanCoins/scanCoins.reducer';
// import swap from './swap/reducer';
import token from './token/token.reducer';
import transactions from './transactions/reducer';
import user from './user/reducer';
import wallet from './wallet/reducer';
import { reducer as webToken } from './webToken/webToken.reducer';
import { reducer as webWallet } from './webWallet/webWallet.reducer';

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists', 'scanCoinsReducer.scanStatus', 'masterKeyReducer'];

const appReducers = combineReducers({
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
  webWallet,
  account,
  masterKey,
  webToken,
  scanCoinsReducer,
  networkReducer,
  followTokensReducer,
  followTokenSelectedReducer,
  // webWalletReducer,
  inscriptionsReducer,
  loadingReducer,
});

export const clearReduxStore = () => ({
  type: 'CLEAR_STORE',
});

const rootReducers = (state: any, action: any) => {
  if (action.type === 'CLEAR_STORE') {
    state = {
      ...state,
      webWallet: undefined,
      account: undefined,
      masterKey: undefined,
      webToken: undefined,
      scanCoinsReducer: undefined,
      networkReducer: undefined,
      followTokensReducer: undefined,
    };
  }
  return appReducers(state, action);
};

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(routingApi.middleware)
      .concat(isMainnet || isDevelopment ? [] : [logger])
      .concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: process.env.NODE_ENV === 'test' }),
});

export const persistor = persistStore(store);
store.dispatch(updateVersion());

export type RootState = ReturnType<typeof rootReducers> & {
  readonly [$CombinedState]?: undefined;
};

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppGetState = () => AppState;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export default store;
