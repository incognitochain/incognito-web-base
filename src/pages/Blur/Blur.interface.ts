export interface FloorPrice {
  amount: string;
  unit: string;
}

export interface FloorPriceOneDay {
  amount: string;
  unit: string;
}

export interface FloorPriceOneWeek {
  amount: string;
  unit: string;
}

export interface VolumeOneDay {
  amount: string;
  unit: string;
}

export interface VolumeOneWeek {
  amount: string;
  unit: string;
}

export interface BestCollectionBid {
  amount: string;
  unit: string;
}

export interface TotalCollectionBidValue {
  amount: string;
  unit: string;
}

export interface ICollection {
  contractAddress: string;
  name: string;
  collectionSlug: string;
  imageUrl: string;
  totalSupply: number;
  numberOwners: number;
  floorPrice: FloorPrice;
  floorPriceOneDay: FloorPriceOneDay;
  floorPriceOneWeek: FloorPriceOneWeek;
  volumeOneDay: VolumeOneDay;
  volumeOneWeek: VolumeOneWeek;
  bestCollectionBid: BestCollectionBid;
  totalCollectionBidValue: TotalCollectionBidValue;
}
