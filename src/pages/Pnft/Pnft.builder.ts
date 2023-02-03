import { BigNumber } from 'bignumber.js';
import { get } from 'lodash';
import { camelCaseKeys } from 'utils/camelcase';
import format from 'utils/format';

import {
  IAmount,
  ICollection,
  ICost,
  IMapTokens,
  IMarketPlaceType,
  INFT,
  IPrice,
  IToken,
  PnftBuyFee,
} from './Pnft.interface';

const convertToFormatAmount = (value: string | number) => {
  return format.amountVer2({
    originalAmount: new BigNumber(value || 0).toNumber(),
    decimals: 0,
  });
};

const convertToAmount = (amount: string): IAmount => {
  amount = amount || '0';
  const amountNum = new BigNumber(amount).toNumber();
  const amountFormated = convertToFormatAmount(amount);
  const text = amountNum && Number.isFinite(amountNum) ? amountFormated : '-';
  return {
    amountFormated,
    amount,
    unit: 'ETH',
    amountNum,
    displayText: text,
    color: '',
  };
};

const mapperCollections = (resp: any[]): ICollection[] => {
  if (!Array.isArray(resp)) return [];
  return resp.map((data: any): ICollection => {
    const {
      id,

      contractAddress,
      name,
      collectionSlug,
      imageUrl,
      totalSupply,
      numberOwners,
      floorPrice,
      floorPriceOneDay,
      floorPriceOneWeek,

      volumeFifteenMinutes,
      volumeOneDay,
      volumeOneWeek,

      bestCollectionBid,
      totalCollectionBidValue,
    } = camelCaseKeys(data);

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

    const numberOwnersPercent = Math.floor(
      new BigNumber(numberOwners).div(totalSupply).multipliedBy(100).toNumber()
    ).toString();

    return {
      id,
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
      numberOwnersPercent,

      floorPrice: _floorPrice,

      floorPriceOneDay: _floorPriceOneDay,
      floorPriceOneWeek: _floorPriceOneWeek,

      volumeFifteenMinutes: convertToAmount(volumeFifteenMinutes),
      volumeOneDay: convertToAmount(volumeOneDay),
      volumeOneWeek: convertToAmount(volumeOneWeek),

      bestCollectionBid: convertToAmount(bestCollectionBid),
      totalCollectionBidValue: convertToAmount(totalCollectionBidValue),
    };
  });
};

const convertToCost = (data: any): ICost => {
  const amount = data?.amount || '0';
  return {
    amountFormated: convertToFormatAmount(amount),
    amount,
    unit: data?.unit || 'ETH',
    listAt: data?.listedAt || '',
  };
};

const convertToPrice = (data: any): IPrice => {
  return {
    ...convertToCost(data),
    marketplace: data.marketplace
      ? IMarketPlaceType[data.marketplace as keyof typeof IMarketPlaceType]
      : IMarketPlaceType.BLUR,
  };
};

const mapperTokens = (resp: any): IMapTokens => {
  const respTokens = get(resp, 'tokens') || [];
  const respCollection = get(resp, 'collection');
  if (!Array.isArray(respTokens) || !respCollection) return { tokens: [], collection: undefined };

  const tokensMapper = respTokens.map((data: any): IToken => {
    const {
      tokenId,
      highestBid,
      imageUrl,
      isSuspicious,
      lastCostBasis,
      lastSale,
      name,
      numberOwnedByOwner,
      owner,
      price,
      rarityRank,
      rarityScore,
      traits,
    } = camelCaseKeys(data.Detail);

    return {
      isLoading: false,
      contractAddress: data.ContractAddress,
      id: data.id,
      tokenId: data.TokenID,
      detail: {
        tokenId,
        highestBid,
        imageUrl,
        isSuspicious,
        lastCostBasis: convertToCost(lastCostBasis),
        lastSale: convertToCost(lastSale),
        name,
        numberOwnedByOwner,
        owner,
        price: convertToPrice(price),
        rarityRank,
        rarityScore,
        traits,
      },
    };
  });
  const collectionMapper = respCollection ? mapperCollections([respCollection])[0] : undefined;
  return {
    tokens: tokensMapper,
    collection: collectionMapper,
  };
};

const convertBlurFee = (json: any) => {
  const Fee = get(json, 'Fee');
  const buyFee = new PnftBuyFee();
  buyFee.calldata = get(json, 'Calldata');
  buyFee.callContract = get(json, 'CallContract');
  buyFee.receiveToken = get(json, 'ReceiveToken');
  buyFee.fee = {
    feeAddress: get(Fee, 'feeAddress'),
    feeAddressShardID: get(Fee, 'feeAddressShardID'),
    feeAmount: get(Fee, 'feeAmount'),
    feeInUSD: get(Fee, 'feeInUSD'),
    privacyFee: get(Fee, 'privacyFee'),
    tokenid: get(Fee, 'tokenid'),
  };
  return buyFee;
};

const mapperNFTs = (resp: any): INFT[] => {
  if (!Array.isArray(resp)) return [];

  const nftsMapper = resp.map((data: any): INFT => {
    return camelCaseKeys(data);
  });
  return nftsMapper;
};

export { convertBlurFee, mapperCollections, mapperNFTs, mapperTokens };
