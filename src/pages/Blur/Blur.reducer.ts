import uniqBy from 'lodash/uniqBy';
import { Reducer } from 'redux';

import { BlurActions, BlurActionType, IBlurReducer } from './Blur.types';

const initialState: IBlurReducer = {
  isFetching: false,
  collection: {
    list: [],
    isFetching: false,
  },
  resToken: undefined,
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
      const newCollections = action.payload;
      const oldCollections = state.collection.list;
      const newList = uniqBy([...oldCollections, ...newCollections], 'id');
      console.log('LOGS SET_COLLECTIONS: ', {
        newCollections: newCollections.length,
        oldCollections: oldCollections.length,
        newList: newList.length,
      });
      return {
        ...state,
        collection: {
          list: newList,
          isFetching: false,
        },
      };
    }
    case BlurActionType.SET_RES_TOKEN: {
      return {
        ...state,
        resToken: action.payload,
      };
    }
    case BlurActionType.SET_MORE_TOKENS: {
      if (state.resToken) {
        return {
          ...state,
          resToken: {
            ...state.resToken,
            tokens: [...state.resToken.tokens.filter((token) => !token.isLoading), ...action.payload],
          },
        };
      }
      return state;
    }
    case BlurActionType.SET_MORE_LOADING_TOKENS: {
      return {
        ...state,
        resToken: state.resToken
          ? {
              ...state.resToken,
              tokens: [...state.resToken.tokens, ...action.payload],
            }
          : {
              contractAddress: '',
              success: false,
              totalCount: 0,
              tokens: action.payload,
            },
      };
    }
    default:
      return state;
  }
};

export default reducer;
