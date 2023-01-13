import { BigNumber } from 'bignumber.js';
import format from 'utils/format';

import convert from '../../utils/convert';

export interface IAmount {
  amount: string;
  amountNum: number;
  amountFormated: string;
  unit: string;
  displayText: string;
  color: string;
}

export interface ICollection {
  id: string;
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

export interface ITrait {
  key: string;
  value: string;
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
  traits: ITrait[];
}

export interface IToken {
  isLoading: boolean;
  isSelected: boolean;
  contractAddress: string;
  id: string;
  tokenId: string;
  detail: ITokenDetail;
}

export interface IBuyCollection {
  valid: boolean;
  inputAddress: string;

  isEstimating: boolean;
  fee?: PBlurBuyFee;
}

export class PBlurBuyFee {
  calldata?: string;
  callContract!: string;
  receiveToken?: string;
  fee?: {
    feeAddress: string;
    feeAddressShardID: number;
    feeAmount: number;
    feeInUSD: number;
    privacyFee: number;
    tokenid: string;
  };

  getFeeFormatAmount(pDecimals: number) {
    return format.amountVer2({
      originalAmount: new BigNumber(this.fee && this.fee.feeAmount ? this.fee.feeAmount : 0).toNumber(),
      decimals: pDecimals,
    });
  }

  getFeeUsdStr() {
    return this.fee && this.fee.feeInUSD
      ? format.amountVer2({
          originalAmount: this.fee.feeInUSD,
          decimals: 0,
        })
      : '';
  }

  getFeeAmount() {
    return this.fee ? this.fee.feeAmount : 0;
  }

  getFeeHumanAmount(decimals: number) {
    const originalAmount = this.fee ? this.fee.feeAmount : 0;
    return convert.toHumanAmount({
      originalAmount,
      decimals,
    });
  }

  getFeeAddressShardID() {
    return this.fee ? this.fee.feeAddressShardID : '';
  }
}
