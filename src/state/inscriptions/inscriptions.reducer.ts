import { Reducer } from 'redux';

import { InscriptionsActionType, InscriptionsReducer } from './inscriptions.types';

const initialState: InscriptionsReducer = {
  inscriptionList: [],
  fetching: false,
  hasLoadMore: false,

  myInscriptionList: [],

  //Query
  query: {
    limit: 10,
    asc: false, //true: 0 --> 10 , 10 is lasted. If false so get data from 10 -> 0
    desc: undefined,
    from: undefined, //Default get lasted
  },

  isSearching: false,
  NFTUnspentCoinsList: [],

  filterPage: 'All',
  keySearch: '',
};

export const reducer: Reducer<InscriptionsReducer, any> = (state = initialState, action): InscriptionsReducer => {
  switch (action.type) {
    case InscriptionsActionType.FETCHING: {
      const fetching = action.payload;
      return {
        ...state,
        fetching,
      };
    }

    case InscriptionsActionType.LOAD_MORE: {
      const hasLoadMore = action.payload;
      return {
        ...state,
        hasLoadMore,
      };
    }
    case InscriptionsActionType.SET_SEARCHING: {
      return {
        ...state,
        isSearching: action.payload,
      };
    }

    case InscriptionsActionType.SET_INSCRIPTIONS: {
      const inscriptionList = action.payload;
      return {
        ...state,
        inscriptionList,
      };
    }

    case InscriptionsActionType.SET_SORT_BY: {
      const asc = action.payload || false;
      return {
        ...state,
        query: {
          ...state.query,
          asc,
        },
      };
    }

    case InscriptionsActionType.SET_MY_INSCRIPTIONS: {
      return {
        ...state,
        myInscriptionList: action.payload,
      };
    }

    case InscriptionsActionType.SET_NFT_UNSPENT_COINS: {
      return {
        ...state,
        NFTUnspentCoinsList: action.payload,
      };
    }

    case InscriptionsActionType.SET_FILTER_PAGE: {
      return {
        ...state,
        filterPage: action.payload,
      };
    }

    case InscriptionsActionType.SET_KEY_SEARCH: {
      return {
        ...state,
        keySearch: action.payload,
      };
    }

    case InscriptionsActionType.RESET_SEARCH_STATE: {
      return {
        ...state,
        inscriptionList: [],
        fetching: false,
        hasLoadMore: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
