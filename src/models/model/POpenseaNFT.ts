// To parse this data:
//
//   import { Convert, POpenseaNft } from "./file";
//
//   const pOpenseaNft = Convert.toPOpenseaNft(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

import { get } from 'lodash';

import { Convert as ConvertCollection, POpenseaCollection, PrimaryAssetContract } from './POpenseaCollection';

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
  seaportSellOrders?: string;
  lastSale?: string;
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

export class Convert {
  public static toPOpenseaNft(json: any): POpenseaNft {
    const nft = new POpenseaNft();
    nft.id = get(json, 'id');
    if (json.asset_ontract) {
      nft.assetContract = ConvertCollection.toPrimaryAssetContract(json.asset_ontract);
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
    nft.numSales = get(json, 'num_sales');
    nft.backgroundColor = get(json, 'background_color');
    nft.imageUrl = get(json, 'image_url');
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
    nft.seaportSellOrders = get(json, 'seaport_sell_orders');
    nft.lastSale = get(json, 'last_sale');
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

  public static toCreator(json: any): Creator {
    return {
      user: { username: get(json, 'user').username },
      profileImgUrl: get(json, 'profile_img_url'),
      address: get(json, 'address'),
      config: get(json, 'config'),
    };
  }

  public static toTopOwnership(json: any): TopOwnership {
    return {
      owner: get(json, 'owner'),
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
