import { Reducer } from 'redux';

import { IPoolReducer, PoolActionType } from './pool.types';

const initialState: IPoolReducer = {
  isFetching: false,
  pools: [],
  explores: [],
};

export const reducer: Reducer<IPoolReducer, any> = (state = initialState, action): IPoolReducer => {
  switch (action.type) {
    case PoolActionType.SET_POOLS: {
      const pools = action.payload;
      return {
        ...state,
        pools,
        isFetching: false,
      };
    }
    case PoolActionType.FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case PoolActionType.SET_EXPLORER: {
      return {
        ...state,
        explores: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
