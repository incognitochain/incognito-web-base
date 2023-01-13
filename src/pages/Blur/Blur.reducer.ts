import { ArrayHelper } from 'helpers/ArrayHelper';
import uniqBy from 'lodash/uniqBy';
import { Reducer } from 'redux';

import { BlurActions, BlurActionType, IBlurReducer } from './Blur.types';

export const MAX_ITEM_BUY = 10;
export const MAX_GET_ITEM = 100;

const initialState: IBlurReducer = {
  isFetching: false,
  collection: {
    hasError: false,
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
          hasError: false,
        },
      };
    }
    case BlurActionType.SET_TOKENS: {
      return {
        ...state,
        token: {
          ...state.token,
          list: action.payload,
        },
      };
    }
    case BlurActionType.APPEND_TOKENS: {
      if (state.token) {
        return {
          ...state,
          token: {
            ...state.token,
            list: uniqBy([...state.token.list.filter((token) => !token.isLoading), ...action.payload], 'tokenId'),
          },
        };
      }
      return state;
    }
    case BlurActionType.APPEND_LOADING_TOKENS: {
      return {
        ...state,
        token: {
          ...state.token,
          list: [...state.token.list, ...action.payload],
        },
      };
    }
    case BlurActionType.UPDATE_TOKEN: {
      return {
        ...state,
        token: {
          ...state.token,
          list: ArrayHelper.update('id', action.payload, state.token.list),
        },
      };
    }
    case BlurActionType.CLEAR_SELECTED_TOKENS: {
      return {
        ...state,
        token: {
          ...state.token,
          list: state.token.list.map((item) => ({ ...item, isSelected: false })),
        },
      };
    }
    case BlurActionType.SELECT_MAX_BUY_TOKENS: {
      return {
        ...state,
        token: {
          ...state.token,
          list: state.token.list.map((item, index) => ({ ...item, isSelected: index < MAX_ITEM_BUY })),
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
