import uniqueBy from 'lodash/uniqBy';
import Storage from 'storage';

const KEY = 'INC-POPENSEA-OFFERS-MADE-1';

export interface IPOpenseaOfferStorage {
  txHash: string;
  signerAddress: string;
  createTime: number;
  appName: string;

  offerTokenID: string;
  offerAmountText: string;
  offerTime: number;
  offerFloorPrice: string;

  nftTokenId: string;
  nftContract: string;
  nftName: string;
  nftImg: string;
  nftAnimationUrl?: string;
}

const getLocalPOpenseaOffers = (): IPOpenseaOfferStorage[] => {
  const offers = Storage.getItem(KEY);
  if (!offers) return [];
  return offers;
};

const setLocalPOpenseaOffers = (props: IPOpenseaOfferStorage) => {
  let offers: IPOpenseaOfferStorage[] = Storage.getItem(KEY) || [];
  offers.push(props);
  offers = uniqueBy(offers, 'txHash');
  Storage.setItem(KEY, offers);
};

export { getLocalPOpenseaOffers, setLocalPOpenseaOffers };
