import uniqueBy from 'lodash/uniqBy';
import Storage from 'storage';

const KEY = 'INC-POPENSEA-OFFERS-MADE-1';

export interface IPOpenseaOfferStorage {
  txHash: string;
  incAddress?: string;
  time: number;
  appName: string;
  offerTokenID: string;
  offerAmountText: string;
  offerTime: string;

  nftTokenId: string;
  nftContract: string;
  nftName: string;
  nftImg: string;
}

const getPOpenseaOffers = (): IPOpenseaOfferStorage[] => {
  const offers = Storage.getItem(KEY);
  if (!offers) return [];
  return offers;
};

const setPOpenseaOffers = (props: IPOpenseaOfferStorage) => {
  let offers: IPOpenseaOfferStorage[] = Storage.getItem(KEY) || [];
  offers.push(props);
  offers = uniqueBy(offers, 'txHash');
  Storage.setItem(KEY, offers);
};

export { getPOpenseaOffers, setPOpenseaOffers };
