import { POpenseaCollection } from 'models/model/POpenseaCollection';
import { POpenseaNft } from 'models/model/POpenseaNFT';
import { Reducer } from 'redux';

import { POpenseaActionType } from './pOpensea.types';
const { ACCOUNT_CONSTANT } = require('incognito-chain-web-js/build/wallet');

export interface IPOpenseaReducer {
  isFetching: boolean;
  collections: POpenseaCollection[];
  selectedCollection?: POpenseaCollection;
  nfts: POpenseaNft[];
  filterNfts: POpenseaNft[];
  seletedNFT?: POpenseaNft;
  networkFee: number;
}

const initialState: IPOpenseaReducer = {
  isFetching: false,
  collections: [],
  selectedCollection: undefined,
  nfts: [],
  filterNfts: [],
  seletedNFT: undefined,
  networkFee: ACCOUNT_CONSTANT.MAX_FEE_PER_TX,
};

export const reducer: Reducer<IPOpenseaReducer, any> = (state = initialState, action): IPOpenseaReducer => {
  switch (action.type) {
    case POpenseaActionType.SET_COLLECTIONS: {
      const collections = action.payload;
      return {
        ...state,
        collections,
      };
    }
    case POpenseaActionType.FETCHING: {
      const isFetching = action.payload;
      return {
        ...state,
        isFetching,
      };
    }
    case POpenseaActionType.SET_SELECTED_COLLECTION: {
      const selectedCollection = action.payload;
      return {
        ...state,
        nfts: [],
        selectedCollection,
      };
    }
    case POpenseaActionType.SET_NFTS: {
      const nfts = action.payload;
      return {
        ...state,
        nfts,
      };
    }
    case POpenseaActionType.SET_SELECTED_NFT: {
      const seletedNFT = action.payload;
      return {
        ...state,
        seletedNFT,
      };
    }
    default:
      return state;
  }
};

export default reducer;
