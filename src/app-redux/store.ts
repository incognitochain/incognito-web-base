import themeReducer from '@theme/Theme.reducer';
import { camelCase } from 'lodash';
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

  // @ts-ignore
  const files = import.meta.globEager('../../src/**/*reducer.ts');
  const reducers: any = {};
  for (const key in files) {
    const name: any = key.match(/(\w{1,})(.reducer.ts)/);
    const reducerName: any = camelCase(name[1]);
    reducers[reducerName] = files[key].default;
  }

  const rootReducers = combineReducers({
    ...reducers,
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
