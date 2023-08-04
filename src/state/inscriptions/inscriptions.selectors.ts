/* eslint-disable array-callback-return */
import { createSelector } from '@reduxjs/toolkit';
import uniq from 'lodash/uniq';
import { RootState } from 'state/index';

import { Inscription, NFTCoin } from './inscriptions.types';

export const reducerSelector = createSelector(
  (state: RootState) => state.inscriptionsReducer,
  (inscriptionsReducer) => inscriptionsReducer
);

export const getInscriptionListSelector = createSelector(
  reducerSelector,
  (inscriptionReducer) => inscriptionReducer.inscriptionList || []
);

export const getHasLoadMoreSelector = createSelector(
  reducerSelector,
  (inscriptionReducer) => inscriptionReducer.hasLoadMore
);

export const getQueryInfoSelector = createSelector(reducerSelector, (inscriptionReducer) => {
  return inscriptionReducer.query;
});

export const getSearchingSelector = createSelector(reducerSelector, (inscriptionReducer) => {
  return inscriptionReducer.isSearching || false;
});

export const getSortBySelector = createSelector(getQueryInfoSelector, (queryInfo) => {
  let sortByStr = 'Latest';
  if (queryInfo && queryInfo.asc === true) {
    sortByStr = 'Oldest';
  }
  return sortByStr;
});

export const getLastItemSelector = createSelector(
  getInscriptionListSelector,
  (inscriptionList): Inscription | undefined => {
    return inscriptionList?.slice(-1).pop() || undefined;
  }
);

export const getMyInscriptionList = createSelector(reducerSelector, (inscriptionReducer) => {
  return inscriptionReducer.myInscriptionList.filter((item) => !!item) || [];
});

export const getMyInscriptionSortedList = createSelector(getMyInscriptionList, (list) => {
  let sortList = list.sort((a, b) => b.index - a.index); //Desc
  return sortList;
});

export const getInscriptionTokenIDsListSelector = createSelector(getMyInscriptionList, (inscriptions) => {
  if (!inscriptions || inscriptions.length < 1) return [];
  return inscriptions.map((item) => item.token_id);
});

//NFT

export const getNFTCoinsSelector = createSelector(
  reducerSelector,
  (inscriptionReducer) => inscriptionReducer.NFTUnspentCoinsList || []
);

export const getNFTCoinsInforSelector = createSelector(getNFTCoinsSelector, (nftCoins: NFTCoin[]) => {
  if (!nftCoins || nftCoins.length < 1) return {};

  let assetTagList: string[] = [];
  let tokenIdsList: string[] = [];

  if (nftCoins && nftCoins.length > 0) {
    nftCoins.map((coin) => {
      assetTagList.push(coin.AssetTag);
      if (coin.RawAssetTag === '' || coin.RawAssetTag === undefined) {
        tokenIdsList.push(coin.TokenID);
      } else {
        assetTagList.push(coin.RawAssetTag);
      }
    });
  }

  assetTagList = uniq(assetTagList);
  tokenIdsList = uniq(tokenIdsList);

  return {
    assetTagList,
    tokenIdsList,
  };
});
