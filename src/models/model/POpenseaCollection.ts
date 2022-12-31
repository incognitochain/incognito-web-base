/* eslint-disable @typescript-eslint/no-inferrable-types */
import { BigNumber } from 'bignumber.js';
import { get } from 'lodash';
import moment from 'moment';
import format from 'utils/format';

export class POpenseaCollection {
  primaryAssetContracts?: PrimaryAssetContract[];
  stats?: Stats;
  displayData?: DisplayData;
  fees?: Fees;
  editors?: string[];
  paymentTokens?: PaymentToken[];
  traits?: any;
  bannerImageUrl?: string;
  chatUrl?: string;
  createdDate?: string;
  defaultToFiat?: boolean;
  description?: string;
  devBuyerFeeBasisPoints?: string;
  devSellerFeeBasisPoints?: string;
  discordUrl?: string;
  externalUrl?: string;
  featured?: boolean;
  featuredImageUrl?: string;
  hidden?: boolean;
  safelistRequestStatus?: string;
  imageUrl?: string;
  isSubjectToWhitelist?: boolean;
  largeImageUrl?: string;
  mediumUsername?: string;
  name?: string;
  onlyProxiedTransfers?: boolean;
  openseaBuyerFeeBasisPoints?: string;
  openseaSellerFeeBasisPoints?: string;
  payoutAddress?: string;
  requireEmail?: boolean;
  shortDescription?: string;
  slug?: string;
  telegramUrl?: string;
  twitterUsername?: string;
  instagramUsername?: string;
  wikiUrl?: string;
  isNsfw?: boolean;
  isRarityEnabled?: boolean;

  getAssetContract() {
    return this.primaryAssetContracts && this.primaryAssetContracts.length > 0
      ? this.primaryAssetContracts[0]
      : undefined;
  }

  getCreatedDateWith(format?: string) {
    return this.createdDate ? moment(new Date(this.createdDate)).format(format) : '';
  }

  getBannerUrl(size: number = 2800) {
    return this.bannerImageUrl ? this.bannerImageUrl.replace('?w=500', `?w=${size}`) : undefined;
  }

  getTotalVolumnFormatAmount() {
    return format.amountVer2({
      originalAmount: new BigNumber(
        this.stats && this.stats.totalVolume ? this.stats.totalVolume.toFixed(0) : 0
      ).toNumber(),
      decimals: 0,
    });
  }

  getOndayVolumnFormatAmount() {
    return format.amountVer2({
      originalAmount: new BigNumber(
        this.stats && this.stats.oneDayVolume ? this.stats.oneDayVolume.toFixed(0) : 0
      ).toNumber(),
      decimals: 0,
    });
  }
}

export interface PaymentToken {
  id: number;
  symbol: string;
  address: string;
  imageUrl: string;
  name: string;
  decimals: number;
  ethPrice: number;
  usdPrice: number;
}

export interface DisplayData {
  cardDisplayStyle?: string;
  images?: any[];
}

export interface Fees {
  sellerFees?: any;
  openseaFees?: any;
}

export interface PrimaryAssetContract {
  address?: string;
  assetContractType?: string;
  createdDate?: string;
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

export interface Stats {
  oneHourVolume?: number;
  oneHourChange?: number;
  oneHourSales?: number;
  oneHourSalesChange?: number;
  oneHourAveragePrice?: number;
  oneHourDifference?: number;
  sixHourVolume?: number;
  sixHourChange?: number;
  sixHourSales?: number;
  sixHourSalesChange?: number;
  sixHourAveragePrice?: number;
  sixHourDifference?: number;
  oneDayVolume?: number;
  oneDayChange?: number;
  oneDaySales?: number;
  oneDaySalesChange?: number;
  oneDayAveragePrice?: number;
  oneDayDifference?: number;
  sevenDayVolume?: number;
  sevenDayChange?: number;
  sevenDaySales?: number;
  sevenDayAveragePrice?: number;
  sevenDayDifference?: number;
  thirtyDayVolume?: number;
  thirtyDayChange?: number;
  thirtyDaySales?: number;
  thirtyDayAveragePrice?: number;
  thirtyDayDifference?: number;
  totalVolume?: number;
  totalSales?: number;
  totalSupply?: number;
  count?: number;
  numOwners?: number;
  averagePrice?: number;
  numReports?: number;
  marketCap?: number;
  floorPrice?: number;
}

export class Convert {
  public static toPOpenseaCollection(json: any): POpenseaCollection {
    const collection = new POpenseaCollection();
    if (json && json.payment_tokens && json.payment_tokens.length > 0) {
      collection.paymentTokens = json.payment_tokens.map((item: any) => Convert.toPaymentToken(item));
    }
    if (json && json.primary_asset_contracts && json.primary_asset_contracts.length > 0) {
      collection.primaryAssetContracts = json.primary_asset_contracts.map((item: any) =>
        Convert.toPrimaryAssetContract(item)
      );
    }
    if (json && json.stats) {
      collection.stats = Convert.toStats(json.stats);
    }
    if (json && json.display_data) {
      collection.displayData = Convert.toDisplayData(json.display_data);
    }
    if (json && json.fees) {
      collection.fees = Convert.toFees(json.fees);
    }
    collection.editors = get(json, 'editors');
    collection.traits = get(json, 'traits');
    collection.bannerImageUrl = get(json, 'banner_image_url');
    collection.chatUrl = get(json, 'chat_url');
    collection.createdDate = get(json, 'created_date');
    collection.defaultToFiat = get(json, 'default_to_fiat');
    collection.description = get(json, 'description');
    collection.devBuyerFeeBasisPoints = get(json, 'dev_buyer_fee_basis_points');
    collection.devSellerFeeBasisPoints = get(json, 'dev_seller_fee_basis_points');
    collection.discordUrl = get(json, 'discord_url');
    collection.externalUrl = get(json, 'external_url');
    collection.featured = get(json, 'featured');
    collection.hidden = get(json, 'hidden');
    collection.safelistRequestStatus = get(json, 'safelist_request_status');
    collection.imageUrl = get(json, 'image_url');
    collection.isSubjectToWhitelist = get(json, 'is_subject_to_whitelist');
    collection.largeImageUrl = get(json, 'large_image_url');
    collection.mediumUsername = get(json, 'medium_username');
    collection.onlyProxiedTransfers = get(json, 'only_proxied_transfers');
    collection.name = get(json, 'name');
    collection.openseaBuyerFeeBasisPoints = get(json, 'opensea_buyer_fee_basis_points');
    collection.openseaSellerFeeBasisPoints = get(json, 'opensea_seller_fee_basis_points');
    collection.payoutAddress = get(json, 'payout_address');
    collection.requireEmail = get(json, 'require_email');
    collection.shortDescription = get(json, 'short_description');
    collection.telegramUrl = get(json, 'telegram_url');
    collection.twitterUsername = get(json, 'twitter_username');
    collection.instagramUsername = get(json, 'name');
    collection.wikiUrl = get(json, 'wiki_url');
    collection.isNsfw = get(json, 'is_nsfw');
    collection.isRarityEnabled = get(json, 'is_rarity_enabled');
    return collection;
  }

  public static toPaymentToken(json: any): PaymentToken {
    return {
      id: get(json, 'id'),
      symbol: get(json, 'symbol'),
      address: get(json, 'address'),
      imageUrl: get(json, 'imageUrl'),
      name: get(json, 'name'),
      decimals: get(json, 'decimals'),
      ethPrice: get(json, 'ethPrice'),
      usdPrice: get(json, 'usdPrice'),
    };
  }

  public static toPrimaryAssetContract(json: any): PrimaryAssetContract {
    return {
      address: get(json, 'address'),
      assetContractType: get(json, 'asset_contract_type'),
      createdDate: get(json, 'created_date'),
      name: get(json, 'name'),
      nftVersion: get(json, 'nft_version'),
      openseaVersion: get(json, 'opensea_version'),
      owner: get(json, 'owner'),
      schemaName: get(json, 'schema_name'),
      symbol: get(json, 'symbol'),
      totalSupply: get(json, 'total_supply'),
      description: get(json, 'description'),
      externalLink: get(json, 'external_link'),
      imageUrl: get(json, 'image_url'),
      defaultToFiat: get(json, 'default_to_fiat'),
      devBuyerFeeBasisPoints: get(json, 'dev_buyer_fee_basis_points'),
      devSellerFeeBasisPoints: get(json, 'dev_seller_fee_basis_points'),
      onlyProxiedTransfers: get(json, 'only_proxied_transfers'),
      openseaBuyerFeeBasisPoints: get(json, 'opensea_buyer_fee_basis_points'),
      openseaSellerFeeBasisPoints: get(json, 'opensea_seller_fee_basis_points'),
      buyerFeeBasisPoints: get(json, 'buyer_fee_basis_points'),
      sellerFeeBasisPoints: get(json, 'seller_fee_basis_points'),
      payoutAddress: get(json, 'payout_address'),
    };
  }

  public static toStats(json: any): Stats {
    return {
      oneHourVolume: get(json, 'one_hour_volume'),
      oneHourChange: get(json, 'one_hour_change'),
      oneHourSales: get(json, 'one_hour_sales'),
      oneHourSalesChange: get(json, 'one_hour_sales_change'),
      oneHourAveragePrice: get(json, 'one_hour_average_price'),
      oneHourDifference: get(json, 'one_hour_difference'),
      sixHourVolume: get(json, 'six_hour_volume'),
      sixHourChange: get(json, 'six_hour_change'),
      sixHourSales: get(json, 'six_hour_sales'),
      sixHourSalesChange: get(json, 'six_hour_sales_change'),
      sixHourAveragePrice: get(json, 'six_hour_average_price'),
      sixHourDifference: get(json, 'six_hour_difference'),
      oneDayVolume: get(json, 'one_day_volume'),
      oneDayChange: get(json, 'one_day_change'),
      oneDaySales: get(json, 'one_day_sales'),
      oneDaySalesChange: get(json, 'one_day_sales_change'),
      oneDayAveragePrice: get(json, 'one_day_average_price'),
      oneDayDifference: get(json, 'one_day_difference'),
      sevenDayVolume: get(json, 'seven_day_volume'),
      sevenDayAveragePrice: get(json, 'seven_day_average_price'),
      sevenDayChange: get(json, 'seven_day_change'),
      sevenDayDifference: get(json, 'seven_day_difference'),
      sevenDaySales: get(json, 'seven_day_sales'),
      thirtyDayVolume: get(json, 'thirty_day_volume'),
      thirtyDayChange: get(json, 'thirty_day_change'),
      thirtyDaySales: get(json, 'thirty_day_sales'),
      thirtyDayDifference: get(json, 'thirty_day_difference'),
      thirtyDayAveragePrice: get(json, 'thirty_day_average_price'),
      totalVolume: get(json, 'total_volume'),
      totalSales: get(json, 'total_sales'),
      totalSupply: get(json, 'total_supply'),
      averagePrice: get(json, 'average_price'),
      count: get(json, 'count'),
      numReports: get(json, 'num_reports'),
      marketCap: get(json, 'market_cap'),
      floorPrice: get(json, 'floor_price'),
      numOwners: get(json, 'num_owners'),
    };
  }

  public static toDisplayData(json: any): DisplayData {
    return {
      cardDisplayStyle: get(json, 'card_display_style'),
      images: get(json, 'images'),
    };
  }

  public static toFees(json: any): Fees {
    return {
      sellerFees: get(json, 'seller_fees'),
      openseaFees: get(json, 'opensea_fees'),
    };
  }
}
