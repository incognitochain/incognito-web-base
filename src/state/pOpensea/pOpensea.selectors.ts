import { createSelector } from '@reduxjs/toolkit';
import { POpenseaCollection } from 'models/model/POpenseaCollection';
import { POpenseaNft } from 'models/model/POpenseaNFT';
import { SortNftType } from 'pages/POpenseaDetail/components/POpenseaDetail.listNFT';
import { AppState } from 'state';

export const pOpenseaSelectors = createSelector(
  (state: AppState) => state.pOpensea,
  (pOpensea) => pOpensea
);

export const isFetchingPOpenseaSelectors = createSelector(pOpenseaSelectors, (pOpensea) => pOpensea.isFetching);

export const networkFeePOpenseaSelectors = createSelector(pOpenseaSelectors, (pOpensea) => pOpensea.networkFee);

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

export const pOpenseaFilterNFTsSelectors = createSelector(
  pOpenseaNFTsSelectors,
  (nfts) => (sort: SortNftType, search?: string) => {
    const sortedNfts = nfts.sort((a: POpenseaNft, b: POpenseaNft) => {
      if (
        a.seaportSellOrders &&
        b.seaportSellOrders &&
        a.seaportSellOrders.length > 0 &&
        b.seaportSellOrders.length > 0
      ) {
        const priceA = a.seaportSellOrders[0].currentPrice;
        const priceB = b.seaportSellOrders[0].currentPrice;
        if (sort === SortNftType.PriceLowToHigh) {
          return parseFloat(priceA) - parseFloat(priceB);
        } else if (sort === SortNftType.PriceHighToLow) {
          return parseFloat(priceB) - parseFloat(priceA);
        }
      }
      return 0;
    });
    return search ? sortedNfts.filter((nft) => nft.name?.toLowerCase().includes(search.toLowerCase())) : sortedNfts;
  }
);
