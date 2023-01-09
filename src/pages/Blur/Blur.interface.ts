export interface IAmount {
  amount: string;
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

  numberOwners: number;
  numberOwnersFormated: string;

  floorPrice: IAmount;
  floorPriceOneDay: IAmount;
  floorPriceOneWeek: IAmount;
  volumeOneDay: IAmount;
  volumeOneWeek: IAmount;
  bestCollectionBid: IAmount;
  totalCollectionBidValue: IAmount;
}
