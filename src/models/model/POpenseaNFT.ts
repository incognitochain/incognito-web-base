// To parse this data:
//
//   import { Convert, POpenseaNft } from "./file";
//
//   const pOpenseaNft = Convert.toPOpenseaNft(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

import { BigNumber } from 'bignumber.js';
import { get } from 'lodash';
import moment from 'moment';
import convert from 'utils/convert';
import format from 'utils/format';

import {
  Convert as ConvertCollection,
  PaymentToken,
  POpenseaCollection,
  PrimaryAssetContract,
} from './POpenseaCollection';

export class POpenseaNft {
  id?: number;
  assetContract?: PrimaryAssetContract;
  creator?: Creator;
  traits?: Trait[];
  topOwnerships?: TopOwnership[];
  collection?: POpenseaCollection;
  numSales?: number;
  backgroundColor?: string;
  imageUrl?: string;
  imagePreviewUrl?: string;
  imageThumbnailUrl?: string;
  imageOriginalUrl?: string;
  animationUrl?: string;
  animationOriginalUrl?: string;
  name?: string;
  description?: string;
  externalLink?: string;
  permalink?: string;
  decimals?: string;
  tokenMetadata?: string;
  isNsfw?: boolean;
  owner?: string;
  seaportSellOrders?: SeaportSellOrders[];
  lastSale?: LastSale;
  topBid?: string;
  listingDate?: string;
  supportsWyvern?: boolean;
  rarityData?: string;
  transferFee?: string;
  transferFeePaymentToken?: string;
  relatedAssets?: any[];
  orders?: string;
  auctions?: any[];
  ownership?: string;
  highestBuyerCommitment?: string;
  tokenId?: string;

  getOriginalName() {
    if (this.name && this.name.includes('#')) {
      return `${this.name}`;
    }
    return `${this.name ? this.name + ' #' : ''}${this.tokenId}`;
  }

  getSeaportSellOrder() {
    return this.seaportSellOrders && this.seaportSellOrders.length > 0 ? this.seaportSellOrders[0] : undefined;
  }
}

export class POpenseaBuyFee {
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

  getFeeAmountStr(pDecimals: number) {
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

  getFeeAmout() {
    return this.fee ? this.fee.feeAmount : 0;
  }

  getFeeAddressShardID() {
    return this.fee ? this.fee.feeAddressShardID : '';
  }
}

export class LastSale {
  asset?: Asset;
  assetBundle?: string;
  auctionType?: string;
  createdDate?: string;
  eventTimestamp?: string;
  eventType?: string;
  paymentToken?: PaymentToken;
  quantity?: string;
  totalPrice?: string;
  transaction?: Transaction;

  getLastSaleStr() {
    return this.totalPrice
      ? `Last sale: ${format.amountVer2({
          originalAmount: new BigNumber(this.totalPrice).toNumber(),
          decimals: this.paymentToken?.decimals || 18,
        })} ${this.paymentToken?.symbol}`
      : '';
  }
}

export interface Transaction {
  blockHash?: string;
  blockNumber?: string;
  fromAccount?: Creator;
  id?: number;
  timestamp?: string;
  toAccount?: Creator;
  transactionHash?: string;
  transactionIndex?: string;
}

export interface Asset {
  decimals?: string;
  tokenId?: string;
}

export interface AssetContract {
  address?: string;
  assetContractType?: string;
  createdDate?: Date;
  name?: string;
  nftVersion?: string;
  openseaVersion?: string;
  owner?: number;
  schemaName?: string;
  symbol?: string;
  totalSupply?: string;
  description?: string;
  externalLink?: string;
  imageUrl?: string;
  defaultToFiat?: boolean;
  devBuyerFeeBasisPoints?: number;
  devSellerFeeBasisPoints?: number;
  onlyProxiedTransfers?: boolean;
  openseaBuyerFeeBasisPoints?: number;
  openseaSellerFeeBasisPoints?: number;
  buyerFeeBasisPoints?: number;
  sellerFeeBasisPoints?: number;
  payoutAddress?: string;
}

export interface Creator {
  user?: { username?: string };
  profileImgUrl?: string;
  address?: string;
  config?: string;
}

export interface Maker {
  user?: number;
  profileImgUrl?: string;
  address?: string;
  config?: string;
}

export interface TopOwnership {
  owner?: Creator;
  quantity?: string;
  createdDate?: Date;
}

export interface Trait {
  traitType?: string;
  value?: string;
  displayType?: string;
  maxValue?: string;
  traitCount?: number;
  order?: string;
}

export interface Parameter {
  conduitKey: string;
  consideration: Consideration[];
  counter: number;
  endTime: string;
  offer: Offer;
  offerer: string;
  orderType: number;
  salt: string;
  startTime: string;
  totalOriginalConsiderationItems: number;
  zone: string;
  zoneHash: string;
}

export interface Consideration {
  endAmount: string;
  identifierOrCriteria: string;
  itemType: number;
  recipient: string;
  startAmount: string;
  token: string;
}

export interface Offer {
  endAmount: string;
  identifierOrCriteria: string;
  itemType: number;
  startAmount: string;
  token: string;
}
export class SeaportSellOrders {
  cancelled?: boolean;
  clientSignature?: string;
  closingDate?: string;
  createdDate?: string;
  criteriaProof?: string;
  currentPrice?: string;
  expirationTime?: string;
  finalized?: boolean;
  listingTime?: number;
  maker?: Maker;
  makerFees?: { account: Maker; basisPoints: string }[];
  markedInvalid?: boolean;
  orderHash?: string;
  orderType?: string;
  protocolAddress?: string;
  relayId?: string;
  side?: string;
  taker: any;
  taker_fees?: any[];
  protocol_data?: { parameters: Parameter; signature: string };

  getCurrentPrice() {
    return this.currentPrice ? this.currentPrice : '0';
  }

  getPricingAmountStr(decimals: number) {
    return format.amountVer2({
      originalAmount: new BigNumber(this.currentPrice || 0).toNumber(),
      decimals,
    });
  }

  getBurnOriginalAmount(decimals: number, pDecimals: number) {
    const burnHumanAmount = convert.toHumanAmount({
      originalAmount: new BigNumber(this.currentPrice || 0).toNumber(),
      decimals,
    });
    return convert.toOriginalAmount({
      humanAmount: new BigNumber(burnHumanAmount).toString(),
      decimals: pDecimals || 0,
      round: true,
    });
  }

  getSaleEnd() {
    return moment(this.closingDate).format('MMMM DD, YYYY [at] hh:mm AZ');
  }
}

export class Convert {
  public static toPOpenseaNft(json: any): POpenseaNft {
    const nft = new POpenseaNft();
    nft.id = get(json, 'id');
    if (json.asset_contract) {
      nft.assetContract = ConvertCollection.toPrimaryAssetContract(json.asset_contract);
    }
    if (json.collection) {
      nft.collection = ConvertCollection.toPOpenseaCollection(json.collection);
    }
    if (json.creator) {
      nft.creator = Convert.toCreator(json.creator);
    }
    if (json && json.top_ownerships && json.top_ownerships.length > 0) {
      nft.topOwnerships = json.top_ownerships.map((item: any) => Convert.toTopOwnership(item));
    }
    if (json && json.traits && json.traits.length > 0) {
      nft.traits = json.traits.map((item: any) => Convert.toTrait(item));
    }
    if (json && json.seaport_sell_orders && json.seaport_sell_orders.length > 0) {
      nft.seaportSellOrders = json.seaport_sell_orders.map((item: any) => Convert.toSeaportSellOrders(item));
    }
    if (json && json.last_sale) {
      nft.lastSale = Convert.toLastSale(json.last_sale);
    }
    nft.numSales = get(json, 'num_sales');
    nft.backgroundColor = get(json, 'background_color');
    nft.animationUrl = get(json, 'animation_url');
    nft.animationOriginalUrl = get(json, 'animation_original_url');
    nft.imagePreviewUrl = get(json, 'image_preview_url');
    nft.imageThumbnailUrl = get(json, 'image_thumbnail_url');
    nft.description = get(json, 'description');
    nft.imageOriginalUrl = get(json, 'image_original_url');
    nft.name = get(json, 'name');
    nft.externalLink = get(json, 'external_link');
    nft.permalink = get(json, 'permalink');
    nft.decimals = get(json, 'decimals');
    nft.tokenMetadata = get(json, 'token_metadata');
    nft.isNsfw = get(json, 'is_nsfw');
    nft.imageUrl = get(json, 'image_url');
    nft.owner = get(json, 'owner');
    nft.listingDate = get(json, 'listing_date');
    nft.supportsWyvern = get(json, 'supports_wyvern');
    nft.rarityData = get(json, 'rarity_data');
    nft.transferFee = get(json, 'transfer_fee');
    nft.transferFeePaymentToken = get(json, 'transfer_fee_payment_token');
    nft.relatedAssets = get(json, 'related_assets');
    nft.orders = get(json, 'orders');
    nft.auctions = get(json, 'auctions');
    nft.orders = get(json, 'orders');
    nft.topOwnerships = get(json, 'top_ownerships');
    nft.ownership = get(json, 'ownership');
    nft.highestBuyerCommitment = get(json, 'highest_buyer_commitment');
    nft.tokenId = get(json, 'token_id');
    return nft;
  }

  public static toSeaportSellOrders(json: any): SeaportSellOrders {
    let seaportSellOrders = new SeaportSellOrders();
    seaportSellOrders.cancelled = get(json, 'cancelled');
    seaportSellOrders.clientSignature = get(json, 'client_signature');
    seaportSellOrders.closingDate = get(json, 'closing_date');
    seaportSellOrders.createdDate = get(json, 'created_date');
    seaportSellOrders.criteriaProof = get(json, 'criteria_proof');
    seaportSellOrders.currentPrice = get(json, 'current_price');
    seaportSellOrders.expirationTime = get(json, 'expiration_time');
    seaportSellOrders.finalized = get(json, 'finalized');
    seaportSellOrders.maker = Convert.toMarker(json.maker);
    seaportSellOrders.listingTime = get(json, 'listing_time');
    seaportSellOrders.markedInvalid = get(json, 'marked_invalid');
    seaportSellOrders.orderHash = get(json, 'order_hash');
    seaportSellOrders.orderType = get(json, 'order_type');
    seaportSellOrders.protocolAddress = get(json, 'protocol_address');
    seaportSellOrders.relayId = get(json, 'relay_id');
    seaportSellOrders.side = get(json, 'side');
    seaportSellOrders.taker = get(json, 'taker');
    seaportSellOrders.taker_fees = get(json, 'taker_fees');
    seaportSellOrders.protocol_data = {
      parameters: Convert.toParameter(json.protocol_data.parameters),
      signature: json.protocol_data.signature,
    };
    seaportSellOrders.makerFees =
      json.maker_fees && json.maker_fees.length > 0
        ? json.maker_fees.map((item: any) => ({
            account: Convert.toMarker(item.account),
            basisPoints: item.basis_points,
          }))
        : [];
    return seaportSellOrders;
  }

  public static toParameter(json: any): Parameter {
    return {
      conduitKey: get(json, 'conduitKey'),
      consideration:
        json.consideration &&
        json.consideration.length > 0 &&
        json.consideration.map((item: any) => Convert.toConsideration(item)),
      counter: get(json, 'counter'),
      endTime: get(json, 'endTime'),
      offer: Convert.toOffer(json.offer),
      offerer: get(json, 'offerer'),
      orderType: get(json, 'orderType'),
      salt: get(json, 'salt'),
      startTime: get(json, 'startTime'),
      totalOriginalConsiderationItems: get(json, 'totalOriginalConsiderationItems'),
      zone: get(json, 'zone'),
      zoneHash: get(json, 'zoneHash'),
    };
  }

  public static toPOpenseaBuyFee(json: any): POpenseaBuyFee {
    const Fee = get(json, 'Fee');
    const buyFee = new POpenseaBuyFee();
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
  }

  public static toOffer(json: any): Offer {
    return {
      endAmount: get(json, 'endAmount'),
      identifierOrCriteria: get(json, 'identifierOrCriteria'),
      itemType: get(json, 'itemType'),
      startAmount: get(json, 'startAmount'),
      token: get(json, 'token'),
    };
  }

  public static toConsideration(json: any): Consideration {
    return {
      endAmount: get(json, 'endAmount'),
      identifierOrCriteria: get(json, 'identifierOrCriteria'),
      itemType: get(json, 'itemType'),
      recipient: get(json, 'recipient'),
      startAmount: get(json, 'startAmount'),
      token: get(json, 'token'),
    };
  }

  public static toLastSale(json: any): LastSale {
    let lastSale = new LastSale();
    lastSale.asset = json.asset ? Convert.toAsset(json.asset) : undefined;
    lastSale.assetBundle = get(json, 'asset_bundle');
    lastSale.paymentToken = json.payment_token ? ConvertCollection.toPaymentToken(json.payment_token) : undefined;
    lastSale.auctionType = get(json, 'auction_type');
    lastSale.createdDate = get(json, 'created_date');
    lastSale.eventTimestamp = get(json, 'event_timestamp');
    lastSale.eventType = get(json, 'event_type');
    lastSale.quantity = get(json, 'quantity');
    lastSale.totalPrice = get(json, 'total_price');
    lastSale.transaction = json.transaction ? Convert.toTransaction(json.transaction) : undefined;
    return lastSale;
  }

  public static toTransaction(json: any): Transaction {
    return {
      blockHash: get(json, 'block_hash'),
      blockNumber: get(json, 'block_number'),
      fromAccount: json.from_account ? Convert.toCreator(json.from_account) : undefined,
      id: get(json, 'id'),
      timestamp: get(json, 'timestamp'),
      toAccount: json.to_account ? Convert.toCreator(json.to_account) : undefined,
      transactionHash: get(json, 'transaction_hash'),
      transactionIndex: get(json, 'transaction_index'),
    };
  }

  public static toAsset(json: any): Asset {
    return {
      decimals: get(json, 'decimals'),
      tokenId: get(json, 'token_id'),
    };
  }

  public static toCreator(json: any): Creator {
    return {
      user: { username: get(json, 'user') ? get(json, 'user').username : '' },
      profileImgUrl: get(json, 'profile_img_url'),
      address: get(json, 'address'),
      config: get(json, 'config'),
    };
  }

  public static toMarker(json: any): Maker {
    return {
      user: get(json, 'user'),
      profileImgUrl: get(json, 'profile_img_url'),
      address: get(json, 'address'),
      config: get(json, 'config'),
    };
  }

  public static toTopOwnership(json: any): TopOwnership {
    return {
      owner: Convert.toCreator(json.owner),
      quantity: get(json, 'quantity'),
      createdDate: get(json, 'created_date'),
    };
  }

  public static toTrait(json: any): Trait {
    return {
      traitType: get(json, 'trait_type'),
      value: get(json, 'value'),
      displayType: get(json, 'display_type'),
      maxValue: get(json, 'max_value'),
      traitCount: get(json, 'trait_count'),
      order: get(json, 'order'),
    };
  }
}
