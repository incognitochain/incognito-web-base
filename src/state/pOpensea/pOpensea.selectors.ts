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
      if (sort === SortNftType.HighestLastSale) {
        if (a.lastSale && b.lastSale && a.lastSale.totalPrice && b.lastSale.totalPrice) {
          return parseFloat(b.lastSale.totalPrice) - parseFloat(a.lastSale.totalPrice) > 0 ? 1 : -1;
        }
        return a.lastSale && a.lastSale.totalPrice ? -1 : b.lastSale && b.lastSale.totalPrice ? 1 : 0;
      } else {
        const aSeaportSell = a.getSeaportSellOrder();
        const bSeaportSell = a.getSeaportSellOrder();
        if (aSeaportSell && bSeaportSell) {
          const priceA = aSeaportSell.getCurrentPrice();
          const priceB = bSeaportSell.getCurrentPrice();
          if (sort === SortNftType.PriceLowToHigh) {
            return parseFloat(priceA) - parseFloat(priceB);
          } else if (sort === SortNftType.PriceHighToLow) {
            return parseFloat(priceB) - parseFloat(priceA);
          }
        }
      }
      return 0;
    });
    return search
      ? sortedNfts.filter((nft) => `${nft.name?.toLowerCase()} ${nft.id?.toString()}`.includes(search.toLowerCase()))
      : sortedNfts;
  }
);
