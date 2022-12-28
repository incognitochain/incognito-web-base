// To parse this data:
//
//   import { Convert, POpenseaNft } from "./file";
//
//   const pOpenseaNft = Convert.toPOpenseaNft(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

import { get } from 'lodash';

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
}

export interface POpenseaBuyFee {
  calldata: string;
  callContract: string;
  receiveToken: string;
  fee: {
    feeAddress: string;
    feeAddressShardID: number;
    feeAmount: number;
    feeInUSD: number;
    privacyFee: number;
    tokenid: string;
  };
}

export interface LastSale {
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
export interface SeaportSellOrders {
  cancelled: boolean;
  clientSignature: string;
  closingDate: string;
  createdDate: string;
  criteriaProof: string;
  currentPrice: string;
  expirationTime: string;
  finalized: boolean;
  listingTime: number;
  maker: Maker;
  makerFees: { account: Maker; basisPoints: string }[];
  markedInvalid: boolean;
  orderHash: string;
  orderType: string;
  protocolAddress: string;
  relayId: string;
  side: string;
  taker: any;
  taker_fees: any[];
  protocol_data: { parameters: Parameter; signature: string };
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
    return {
      cancelled: get(json, 'cancelled'),
      clientSignature: get(json, 'client_signature'),
      closingDate: get(json, 'closing_date'),
      createdDate: get(json, 'created_date'),
      criteriaProof: get(json, 'criteria_proof'),
      currentPrice: get(json, 'current_price'),
      expirationTime: get(json, 'expiration_time'),
      finalized: get(json, 'finalized'),
      maker: Convert.toMarker(json.maker),
      listingTime: get(json, 'listing_time'),
      markedInvalid: get(json, 'marked_invalid'),
      orderHash: get(json, 'order_hash'),
      orderType: get(json, 'order_type'),
      protocolAddress: get(json, 'protocol_address'),
      relayId: get(json, 'relay_id'),
      side: get(json, 'side'),
      taker: get(json, 'taker'),
      taker_fees: get(json, 'taker_fees'),
      protocol_data: {
        parameters: Convert.toParameter(json.protocol_data.parameters),
        signature: json.protocol_data.signature,
      },
      makerFees:
        json.maker_fees && json.maker_fees.length > 0
          ? json.maker_fees.map((item: any) => ({
              account: Convert.toMarker(item.account),
              basisPoints: item.basis_points,
            }))
          : [],
    };
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
    return {
      calldata: get(json, 'Calldata'),
      callContract: get(json, 'CallContract'),
      receiveToken: get(json, 'ReceiveToken'),
      fee: {
        feeAddress: get(Fee, 'feeAddress'),
        feeAddressShardID: get(Fee, 'feeAddressShardID'),
        feeAmount: get(Fee, 'feeAmount'),
        feeInUSD: get(Fee, 'feeInUSD'),
        privacyFee: get(Fee, 'privacyFee'),
        tokenid: get(Fee, 'tokenid'),
      },
    };
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
    return {
      asset: json.asset ? Convert.toAsset(json.asset) : undefined,
      assetBundle: get(json, 'asset_bundle'),
      paymentToken: json.payment_token ? ConvertCollection.toPaymentToken(json.payment_token) : undefined,
      auctionType: get(json, 'auction_type'),
      createdDate: get(json, 'created_date'),
      eventTimestamp: get(json, 'event_timestamp'),
      eventType: get(json, 'event_type'),
      quantity: get(json, 'quantity'),
      totalPrice: get(json, 'total_price'),
      transaction: json.transaction ? Convert.toTransaction(json.transaction) : undefined,
    };
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
