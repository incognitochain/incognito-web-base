export interface IAmount {
  amount: string;
  amountNum: number;
  amountFormated: string;
  unit: string;
  displayText: string;
  color: string;
}

export interface ICollection {
  contractAddress: string;
  name: string;
  collectionSlug: string;
  imageUrl: string;

  totalSupply: number;
  totalSupplyFormated: string;

  dayChange: string;
  dayChangeNumb: number;

  weekChange: string;
  weekChangeNumb: number;

  numberOwners: number;
  numberOwnersFormated: string;
  numberOwnersPercent: string;

  floorPrice: IAmount;
  floorPriceOneDay: IAmount;
  floorPriceOneWeek: IAmount;

  volumeFifteenMinutes: IAmount;
  volumeOneDay: IAmount;
  volumeOneWeek: IAmount;

  bestCollectionBid: IAmount;
  totalCollectionBidValue: IAmount;
}

export interface ICost {
  amount: string;
  amountFormated: string;
  unit: string;
  listAt: string;
}

export enum IMarketPlaceType {
  BLUR = 'BLUR',
  OPENSEA = 'OPENSEA',
  LOOKSRARE = 'LOOKSRARE',
  X2Y2 = 'X2Y2',
}
export interface IPrice extends ICost {
  marketplace: string;
}

export interface IOwner {
  name: string;
  address: string;
}
export interface ITokenDetail {
  tokenId: string;
  highestBid?: ICost;
  imageUrl: string;
  isSuspicious: boolean;
  lastCostBasis: ICost;
  lastSale: ICost;
  name: string;
  numberOwnedByOwner: number;
  owner: IOwner;
  price: IPrice;
  rarityRank: number;
  rarityScore: number;
  traits: { [key: string]: string };
}

export interface IToken {
  isLoading: boolean;
  contractAddress: string;
  id: string;
  detail: ITokenDetail;
}
