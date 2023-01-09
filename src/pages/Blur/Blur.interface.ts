export interface IAmount {
  amount: string;
  amountNum: number;
  amountFormated: string;
  unit: string;
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

  floorPrice: IAmount;
  floorPriceOneDay: IAmount;
  floorPriceOneWeek: IAmount;

  volumeFifteenMinutes: IAmount;
  volumeOneDay: IAmount;
  volumeOneWeek: IAmount;

  bestCollectionBid: IAmount;
  totalCollectionBidValue: IAmount;
}
