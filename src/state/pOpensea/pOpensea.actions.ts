/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Convert, POpenseaCollection } from 'models/model/POpenseaCollection';
import { Convert as ConvertNFT, POpenseaNft } from 'models/model/POpenseaNFT';
import {
  getPOpeanseaCollectionDetail,
  getPOpeanseaCollections,
  getPOpeanseaNFTDetail,
  getPOpeanseaNFTs,
  postEstimateFee,
} from 'services/rpcPOpensea';

import { AppDispatch, AppState } from '../index';
import { POpenseaActionType } from './pOpensea.types';

const actionFetchingCollections = (payload: boolean) => ({
  type: POpenseaActionType.FETCHING,
  payload,
});

const actionSetCollections = (payload: POpenseaCollection[]) => ({
  type: POpenseaActionType.SET_COLLECTIONS,
  payload,
});

export const actionSetSelectedCollection = (payload: POpenseaCollection) => ({
  type: POpenseaActionType.SET_SELECTED_COLLECTION,
  payload,
});

const actionSetNFTs = (payload: POpenseaNft[]) => ({
  type: POpenseaActionType.SET_NFTS,
  payload,
});

export const actionSetSelectedNFT = (payload: POpenseaNft) => ({
  type: POpenseaActionType.SET_SELECTED_NFT,
  payload,
});

export const actionGetPOpenseaCollections = () => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    dispatch(actionFetchingCollections(true));
    const data = await getPOpeanseaCollections();

    if (data && data.length > 0) {
      const collections = data.map((item: any) => Convert.toPOpenseaCollection(item));
      dispatch(actionSetCollections(collections));
    }
  } catch (e) {
    console.log('GET POPENSEA COLLECTIONS WITH ERROR: ', e);
  } finally {
    dispatch(actionFetchingCollections(false));
  }
};

export const actionGetPOpenseaCollectionDetail =
  (contract: string) => async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      const data = await getPOpeanseaCollectionDetail(contract);
      if (data && data.Detail) {
        const collection = Convert.toPOpenseaCollection(data.Detail);
        dispatch(actionSetSelectedCollection(collection));
      }
    } catch (e) {
      console.log('GET POPENSEA COLLECTION DETAIL WITH ERROR: ', e);
    } finally {
    }
  };

export const actionGetPOpenseaNFTs = (contract: string) => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    let nfts: POpenseaNft[] = [];
    const data = await getPOpeanseaNFTs(contract);
    if (data && data.length > 0) {
      nfts = data.map((item: any) => ConvertNFT.toPOpenseaNft(item));
    }
    dispatch(actionSetNFTs(nfts));
  } catch (e) {
    console.log('GET POPENSEA NFTS WITH ERROR: ', e);
  } finally {
  }
};

export const actionGetPOpenseaNFTDetail =
  (contract: string, tokenId: string) => async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      const data = await retryGetPOpenseaNFTDetail(contract, tokenId);
      if (data) {
        const nft = ConvertNFT.toPOpenseaNft(data);
        dispatch(actionSetSelectedNFT(nft));
      }
    } catch (e) {
      console.log('GET POPENSEA NFTS WITH ERROR: ', e);
    } finally {
    }
  };

export const actionBuyNFTDetail =
  (contract: string, tokenId: string, burntoken: string, burnamount: string, recipient: string) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      const data = await postEstimateFee(contract, tokenId, burntoken, burnamount, recipient);
      console.log('RESPONSE: ', data);
    } catch (e) {
      console.log('BUY NFT WITH ERROR: ', e);
    } finally {
    }
  };

const retryGetPOpenseaNFTDetail = async (contract: string, tokenId: string, retries: number = 5) => {
  let count = retries;
  while (count > 0) {
    try {
      const data = await getPOpeanseaNFTDetail(contract, tokenId);
      if (data && data.id) {
        return data;
      } else {
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (error) {
      await new Promise((r) => setTimeout(r, 1000));
    }
    count -= 1;
  }
  return undefined;
};
