import { Reducer } from 'redux';

import { ISwapReducer, SwapActions, SwapActionType } from './Swap.types';

const initialState: ISwapReducer = {
  isFetching: false,
  networkFee: 100,
  unshieldFee: {
    tokenID: '',
    amount: 0,
  },
};

export const reducer: Reducer<ISwapReducer, SwapActions & any> = (
  state = initialState,
  action: SwapActions
): ISwapReducer => {
  switch (action.type) {
    case SwapActionType.FETCHING_UNSHIELD_FEE: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case SwapActionType.FETCHED_UNSHIELD_FEE: {
      const { unshieldFee } = action.payload;
      return {
        ...state,
        isFetching: false,
        unshieldFee,
      };
    }
    default:
      return state;
  }
};

export default reducer;
