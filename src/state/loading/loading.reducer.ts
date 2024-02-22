import { Reducer } from 'redux';

import { LoadingActionType, LoadingReducer } from './loading.types';

export const initialState: LoadingReducer = {
  isLoading: false,
  message: undefined,
};

export const reducer: Reducer<LoadingReducer, any> = (state = initialState, action): LoadingReducer => {
  switch (action.type) {
    case LoadingActionType.SET_LOADING: {
      const { flag, message } = action.payload;
      return {
        ...state,
        isLoading: flag,
        message,
      };
    }

    default:
      return state;
  }
};

export default reducer;
