import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { IRootState } from '@src/app-redux/interface';
import { camelCase } from 'lodash';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import * as rp from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
  blacklist: [''],
};

const getReducer = () => {
  // @ts-ignore
  const files = import.meta.globEager('../../src/**/*reducer.ts');
  const reducers: any = {};
  for (const key in files) {
    const name: any = key.match(/(\w{1,})(.reducer.ts)/);
    const reducerName: any = camelCase(name[1]);
    reducers[reducerName] = files[key].default;
  }
  return reducers;
};

const rootReducer = combineReducers({
  ...getReducer(),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          rp.FLUSH,
          rp.REHYDRATE,
          rp.PAUSE,
          rp.PERSIST,
          rp.PURGE,
          rp.REGISTER,
        ],
      },
    }).concat(logger),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
