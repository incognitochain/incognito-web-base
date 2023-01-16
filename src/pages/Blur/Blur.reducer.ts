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
    collection: undefined,
    isEstimating: false,
    fee: undefined,
    selectedTokenIds: [],
    errorMsg: '',
    selectedPrivacyTokenID: '',
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
      const { tokens, collection } = action.payload;
      return {
        ...state,
        token: {
          ...state.token,
          list: tokens,
          collection,
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
    case BlurActionType.SET_SELECTED_TOKEN_ID: {
      return {
        ...state,
        token: {
          ...state.token,
          selectedTokenIds: state.token.selectedTokenIds.includes(action.payload)
            ? state.token.selectedTokenIds.filter((id) => id !== action.payload)
            : [...state.token.selectedTokenIds, action.payload],
          errorMsg: '',
        },
      };
    }
    case BlurActionType.CLEAR_SELECTED_TOKEN_IDS: {
      return {
        ...state,
        token: {
          ...state.token,
          selectedTokenIds: [],
        },
      };
    }
    case BlurActionType.SELECT_MAX_BUY_TOKENS: {
      return {
        ...state,
        token: {
          ...state.token,
          selectedTokenIds: state.token.list.slice(0, MAX_ITEM_BUY).map((item) => item.tokenId),
        },
      };
    }
    case BlurActionType.SET_ESTIMATED_FEE: {
      const { fee, isEstimating } = action.payload;
      return {
        ...state,
        token: {
          ...state.token,
          fee,
          isEstimating,
          errorMsg: '',
        },
      };
    }

    case BlurActionType.SET_ESTIMATED_FEE_ERROR: {
      const error = action.payload;
      return {
        ...state,
        token: {
          ...state.token,
          errorMsg: error,
          isEstimating: false,
        },
      };
    }
    case BlurActionType.SET_SELECTED_PRIVACY_TOKEN_ID: {
      const tokenID = action.payload;
      return {
        ...state,
        token: {
          ...state.token,
          selectedPrivacyTokenID: tokenID,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
