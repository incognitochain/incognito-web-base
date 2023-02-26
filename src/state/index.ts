import { configureStore } from '@reduxjs/toolkit';
import { reducer as tabs } from 'components/Core/Tabs';
import multicall from 'lib/state/multicall';
import swap from 'pages/Swap/Swap.reducer';
import { AnyAction } from 'redux';
import { $CombinedState, combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { load, save } from 'redux-localstorage-simple';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { isMainnet } from '../config';
import { reducer as account } from './account/account.reducer';
import application from './application/reducer';
import dao from './dao';
import { updateVersion } from './global/actions';
import incognitoWallet from './incognitoWallet/incognitoWallet.reducer';
import lists from './lists/reducer';
import logs from './logs/slice';
import { reducer as masterKey } from './masterKey/masterKey.reducer';
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
const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists'];

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
});

export const clearReduxStore = () => ({
  type: 'CLEAR_STORE',
});

const rootReducers = (state: any, action: any) => {
  if (action.type === 'CLEAR_STORE') state = undefined;
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
      .concat(isMainnet ? [] : [logger])
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
