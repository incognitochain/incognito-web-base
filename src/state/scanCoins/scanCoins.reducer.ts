import { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { ScanCoinsActionType } from 'state/scanCoins/scanCoins.constants';
import { IScanCoinsState, ScanCoinsActions } from 'state/scanCoins/scanCoins.types';

export const initialState: IScanCoinsState = {
  isFetching: false,
  scanStatus: {},
};

export const reducer: Reducer<IScanCoinsState, ScanCoinsActions> = (state = initialState, action: ScanCoinsActions) => {
  switch (action.type) {
    case ScanCoinsActionType.FETCHING: {
      // Scanning coins
      const { isFetching } = action.payload;
      return {
        ...state,
        isFetching,
      };
    }
    case ScanCoinsActionType.FIRST_TIME_SCAN_COINS: {
      // blocking popup when first time scan coins
      const { isScanning, otaKey } = action.payload;
      return {
        ...state,
        scanStatus: {
          ...state.scanStatus,
          [otaKey]: {
            isScanning,
            otaKey,
          },
        },
      };
    }
    case ScanCoinsActionType.RESCAN_COINS: {
      const { keyDefine } = action.payload;
      let scanStatus = state.scanStatus;
      if (scanStatus && scanStatus[keyDefine]) {
        delete scanStatus[keyDefine];
      }
      return {
        ...state,
        scanStatus: {
          ...scanStatus,
        },
      };
    }
    case ScanCoinsActionType.FREE_DATA: {
      return {
        isFetching: false,
        scanStatus: {},
      };
    }
    default:
      return state;
  }
};

const persistConfig: any = {
  key: 'scanCoinsReducer',
  storage,
  whitelist: ['scanStatus'],
  backlist: ['isFetching'],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, reducer);
