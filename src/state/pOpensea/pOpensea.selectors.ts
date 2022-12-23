import { createSelector } from '@reduxjs/toolkit';
import { POpenseaCollection } from 'models/model/POpenseaCollection';
import { POpenseaNft } from 'models/model/POpenseaNFT';
import { AppState } from 'state';

export const pOpenseaSelectors = createSelector(
  (state: AppState) => state.pOpensea,
  (pOpensea) => pOpensea
);

export const isFetchingPOpenseaSelectors = createSelector(pOpenseaSelectors, (pOpensea) => pOpensea.isFetching);

export const pOpenseaCollectionsSelectors = createSelector(pOpenseaSelectors, (pOpensea) => pOpensea.collections);

export const selectedpOpenseaCollectionSelector = createSelector(
  pOpenseaSelectors,
  (pOpensea) => pOpensea.selectedCollection || new POpenseaCollection()
);

export const pOpenseaNFTsSelectors = createSelector(pOpenseaSelectors, (pOpensea) => pOpensea.nfts);

export const selectedpOpenseaNFTSelector = createSelector(
  pOpenseaSelectors,
  (pOpensea) => pOpensea.seletedNFT || new POpenseaNft()
);
