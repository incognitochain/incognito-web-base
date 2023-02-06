import { ArrayHelper } from 'helpers/ArrayHelper';
import uniqBy from 'lodash/uniqBy';
import { Reducer } from 'redux';

import { IPnftReducer, PnftActions, PnftActionType } from './Pnft.types';

export const MAX_ITEM_BUY = 10;
export const MAX_GET_ITEM = 100;

const initTokenState = {
  list: [],
  collection: undefined,
  isEstimating: false,
  fee: undefined,
  selectedTokenIds: [],
  errorMsg: '',
  selectedPrivacyTokenID: '',
};

const initAccountState = {
  address: '',
  isFetching: false,
  nfts: [],
  selectedNftIds: [],
};

const initialState: IPnftReducer = {
  isFetching: false,
  collection: {
    hasError: false,
    list: [],
    isFetching: false,
  },
  token: { ...initTokenState },
  account: { ...initAccountState },
};

export const reducer: Reducer<IPnftReducer, PnftActions & any> = (
  state = initialState,
  action: PnftActions
): IPnftReducer => {
  switch (action.type) {
    case PnftActionType.SET_FETCHING_COLLECTION: {
      const { isFetching } = action.payload;
      return {
        ...state,
        collection: {
          ...state.collection,
          isFetching,
        },
      };
    }
    case PnftActionType.SET_COLLECTIONS: {
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
    case PnftActionType.SET_TOKENS: {
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
    case PnftActionType.APPEND_TOKENS: {
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
    case PnftActionType.SET_LOADING_TOKENS: {
      return {
        ...state,
        token: {
          ...state.token,
          list: action.payload,
          selectedTokenIds: [],
        },
      };
    }
    case PnftActionType.APPEND_LOADING_TOKENS: {
      return {
        ...state,
        token: {
          ...state.token,
          list: [...state.token.list, ...action.payload],
        },
      };
    }
    case PnftActionType.UPDATE_TOKEN: {
      return {
        ...state,
        token: {
          ...state.token,
          list: ArrayHelper.update('id', action.payload, state.token.list),
        },
      };
    }
    case PnftActionType.SET_SELECTED_TOKEN_ID: {
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
    case PnftActionType.CLEAR_SELECTED_TOKEN_IDS: {
      return {
        ...state,
        token: {
          ...state.token,
          selectedTokenIds: [],
        },
      };
    }
    case PnftActionType.SELECT_MAX_BUY_TOKENS: {
      return {
        ...state,
        token: {
          ...state.token,
          selectedTokenIds: state.token.list.slice(0, MAX_ITEM_BUY).map((item) => item.tokenId),
        },
      };
    }
    case PnftActionType.SET_ESTIMATED_FEE: {
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

    case PnftActionType.SET_ESTIMATED_FEE_ERROR: {
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
    case PnftActionType.SET_SELECTED_PRIVACY_TOKEN_ID: {
      const tokenID = action.payload;
      return {
        ...state,
        token: {
          ...state.token,
          selectedPrivacyTokenID: tokenID,
        },
      };
    }
    case PnftActionType.CLEAR_TOKEN_STATE: {
      return {
        ...state,
        token: {
          ...initTokenState,
        },
      };
    }
    // Account
    case PnftActionType.SET_FETCHING_ACCOUNT_NFTS: {
      const { isFetching } = action.payload;
      return {
        ...state,
        account: {
          ...state.account,
          isFetching,
        },
      };
    }
    case PnftActionType.SET_ACCOUNT_NFTS: {
      return {
        ...state,
        account: {
          ...state.account,
          nfts: action.payload,
        },
      };
    }
    case PnftActionType.SET_SELECTED_ACCOUNT_NFT_ID: {
      return {
        ...state,
        account: {
          ...state.account,
          selectedNftIds: state.account.selectedNftIds.includes(action.payload)
            ? state.account.selectedNftIds.filter((id) => id !== action.payload)
            : [...state.account.selectedNftIds, action.payload],
        },
      };
    }
    case PnftActionType.CLEAR_SELECTED_ACOUNT_NFT_IDS: {
      return {
        ...state,
        account: {
          ...state.account,
          selectedNftIds: [],
        },
      };
    }
    case PnftActionType.SELECT_ALL_ACCOUNT_NFT_IDS: {
      return {
        ...state,
        account: {
          ...state.account,
          selectedNftIds: state.account.nfts.map((item) => item.tokenId),
        },
      };
    }
    case PnftActionType.SET_ACCOUNT_ADDRESS: {
      const address = action.payload;
      if (!address) {
        // clear account data
        return {
          ...state,
          account: {
            address,
            isFetching: false,
            nfts: [],
            selectedNftIds: [],
          },
        };
      }
      return {
        ...state,
        account: {
          ...state.account,
          address,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
