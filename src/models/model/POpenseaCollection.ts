export interface POpenseaCollection {
  primary_asset_contracts: PrimaryAssetContract[];
  traits: Traits;
  stats: Stats;
  banner_image_url: any;
  chat_url: any;
  created_date: string;
  default_to_fiat: boolean;
  description: any;
  dev_buyer_fee_basis_points: string;
  dev_seller_fee_basis_points: string;
  discord_url: any;
  display_data: DisplayData;
  external_url: any;
  featured: boolean;
  featured_image_url: any;
  hidden: boolean;
  safelist_request_status: string;
  image_url: any;
  is_subject_to_whitelist: boolean;
  large_image_url: any;
  medium_username: any;
  name: string;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: string;
  opensea_seller_fee_basis_points: string;
  payout_address: any;
  require_email: boolean;
  short_description: any;
  slug: string;
  telegram_url: any;
  twitter_username: any;
  instagram_username: any;
  wiki_url: any;
  is_nsfw: boolean;
  fees: Fees;
  is_rarity_enabled: boolean;
}

export interface PrimaryAssetContract {
  address: string;
  asset_contract_type: string;
  created_date: string;
  name: string;
  nft_version: any;
  opensea_version: any;
  owner: number;
  schema_name: string;
  symbol: string;
  total_supply: string;
  description: any;
  external_link: any;
  image_url: any;
  default_to_fiat: boolean;
  dev_buyer_fee_basis_points: number;
  dev_seller_fee_basis_points: number;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: number;
  opensea_seller_fee_basis_points: number;
  buyer_fee_basis_points: number;
  seller_fee_basis_points: number;
  payout_address: any;
}

export interface Traits {}

export interface Stats {
  one_hour_volume: number;
  one_hour_change: number;
  one_hour_sales: number;
  one_hour_sales_change: number;
  one_hour_average_price: number;
  one_hour_difference: number;
  six_hour_volume: number;
  six_hour_change: number;
  six_hour_sales: number;
  six_hour_sales_change: number;
  six_hour_average_price: number;
  six_hour_difference: number;
  one_day_volume: number;
  one_day_change: number;
  one_day_sales: number;
  one_day_sales_change: number;
  one_day_average_price: number;
  one_day_difference: number;
  seven_day_volume: number;
  seven_day_change: number;
  seven_day_sales: number;
  seven_day_average_price: number;
  seven_day_difference: number;
  thirty_day_volume: number;
  thirty_day_change: number;
  thirty_day_sales: number;
  thirty_day_average_price: number;
  thirty_day_difference: number;
  total_volume: number;
  total_sales: number;
  total_supply: number;
  count: number;
  num_owners: number;
  average_price: number;
  num_reports: number;
  market_cap: number;
  floor_price: number;
}

export interface DisplayData {
  card_display_style: string;
  images: any[];
}

export interface Fees {
  seller_fees: SellerFees;
  opensea_fees: OpenseaFees;
}

export interface SellerFees {}

export interface OpenseaFees {
  '0x0000a26b00c1f0df003000390027140000faa719': number;
}
