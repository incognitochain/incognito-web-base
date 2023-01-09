import { Reducer } from 'redux';

import { BlurActions, BlurActionType, IBlurReducer } from './Blur.types';

const initialState: IBlurReducer = {
  isFetching: false,
};

export const reducer: Reducer<IBlurReducer, BlurActions & any> = (
  state = initialState,
  action: BlurActions
): IBlurReducer => {
  switch (action.type) {
    case BlurActionType.SET_COLLECTIONS: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default reducer;
