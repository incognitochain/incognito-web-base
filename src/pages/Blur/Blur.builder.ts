import { BigNumber } from 'bignumber.js';
import format from 'utils/format';

import { IAmount, ICollection } from './Blur.interface';

const convertToFormatAmount = (value: string | number) => {
  return format.amountVer2({
    originalAmount: new BigNumber(value || 0).toNumber(),
    decimals: 0,
  });
};

const convertToAmount = (data: any): IAmount => {
  const amount = data?.amount || '0';
  return {
    amountFormated: convertToFormatAmount(amount),
    amount,
    unit: data?.unit || 'ETH',
  };
};

const mapperCollections = (resp: any): ICollection[] => {
  if (!Array.isArray(resp)) return [];
  return resp.map((data: ICollection): ICollection => {
    const {
      contractAddress,
      name,
      collectionSlug,
      imageUrl,
      totalSupply,
      numberOwners,
      floorPrice,
      floorPriceOneDay,
      floorPriceOneWeek,

      volumeOneDay,
      volumeOneWeek,

      bestCollectionBid,
      totalCollectionBidValue,
    } = data;

    return {
      contractAddress,
      name,
      collectionSlug,
      imageUrl,

      totalSupply,
      totalSupplyFormated: convertToFormatAmount(totalSupply),

      numberOwners,
      numberOwnersFormated: convertToFormatAmount(numberOwners),

      floorPrice: convertToAmount(floorPrice),

      floorPriceOneDay: convertToAmount(floorPriceOneDay),
      floorPriceOneWeek: convertToAmount(floorPriceOneWeek),

      volumeOneDay: convertToAmount(volumeOneDay),
      volumeOneWeek: convertToAmount(volumeOneWeek),

      bestCollectionBid: convertToAmount(bestCollectionBid),
      totalCollectionBidValue: convertToAmount(totalCollectionBidValue),
    };
  });
};

export { mapperCollections };
