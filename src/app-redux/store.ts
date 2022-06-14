import themeReducer from '@theme/Theme.reducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';

export interface IConfigStore {
  store: any;
  persistor: any;
}

export const configStore = (preloadedState: any = {}) => {
  const isMainnet = false;

  const rootReducers = combineReducers({
    theme: themeReducer,
  });

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: [],
    blacklist: [''],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducers);
  const middlewareEnhancer = isMainnet
    ? applyMiddleware(thunk)
    : applyMiddleware(thunk, logger);
  const store: any = createStore(persistedReducer, preloadedState, middlewareEnhancer);
  const persistor = persistStore(store);
  return { store, persistor };
};
