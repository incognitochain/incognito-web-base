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
    amountFormated: convertToFormatAmount(amount).replace(',', ''),
    amount,
    unit: data?.unit || 'ETH',
    amountNum: new BigNumber(amount).toNumber(),
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

    const _floorPrice = convertToAmount(floorPrice);

    const _floorPriceOneDay = convertToAmount(floorPriceOneDay);
    const _floorPriceOneWeek = convertToAmount(floorPriceOneWeek);

    const dayChangeNumb = new BigNumber(_floorPrice.amount)
      .minus(_floorPriceOneDay.amount)
      .div(_floorPriceOneDay.amount)
      .multipliedBy(100);

    const dayChange = dayChangeNumb.toFormat(2).toString();

    const weekChangeNumb = new BigNumber(_floorPrice.amount)
      .minus(_floorPriceOneWeek.amount)
      .div(_floorPriceOneWeek.amount)
      .multipliedBy(100);
    const weekChange = weekChangeNumb.toFormat(2);

    return {
      contractAddress,
      name,
      collectionSlug,
      imageUrl,

      totalSupply,
      totalSupplyFormated: convertToFormatAmount(totalSupply),

      dayChange,
      dayChangeNumb: dayChangeNumb.toNumber(),

      weekChange,
      weekChangeNumb: weekChangeNumb.toNumber(),

      numberOwners,
      numberOwnersFormated: convertToFormatAmount(numberOwners),

      floorPrice: _floorPrice,

      floorPriceOneDay: _floorPriceOneDay,
      floorPriceOneWeek: _floorPriceOneWeek,

      volumeOneDay: convertToAmount(volumeOneDay),
      volumeOneWeek: convertToAmount(volumeOneWeek),

      bestCollectionBid: convertToAmount(bestCollectionBid),
      totalCollectionBidValue: convertToAmount(totalCollectionBidValue),
    };
  });
};

export { mapperCollections };
