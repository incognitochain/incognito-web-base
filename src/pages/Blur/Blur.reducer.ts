import { Reducer } from 'redux';

import { BlurActions, BlurActionType, IBlurReducer } from './Blur.types';

const initialState: IBlurReducer = {
  isFetching: false,
  collection: {
    list: [],
    isFetching: false,
  },
  token: {
    list: [],
  },
};

export const reducer: Reducer<IBlurReducer, BlurActions & any> = (
  state = initialState,
  action: BlurActions
): IBlurReducer => {
  switch (action.type) {
    case BlurActionType.SET_FETCHING_COLLECTION: {
      const { isFetching } = action.payload;
      return {
        ...state,
        collection: {
          ...state.collection,
          isFetching,
        },
      };
    }
    case BlurActionType.SET_COLLECTIONS: {
      return {
        ...state,
        collection: {
          list: action.payload,
          isFetching: false,
        },
      };
    }
    case BlurActionType.SET_TOKENS: {
      return {
        ...state,
        token: {
          list: action.payload,
        },
      };
    }
    case BlurActionType.SET_MORE_TOKENS: {
      if (state.token) {
        return {
          ...state,
          token: {
            ...state.token,
            list: [...state.token.list.filter((token) => !token.isLoading), ...action.payload],
          },
        };
      }
      return state;
    }
    case BlurActionType.SET_MORE_LOADING_TOKENS: {
      return {
        ...state,
        token: state.token
          ? {
              list: [...state.token.list, ...action.payload],
            }
          : {
              list: action.payload,
            },
      };
    }
    default:
      return state;
  }
};

export default reducer;
