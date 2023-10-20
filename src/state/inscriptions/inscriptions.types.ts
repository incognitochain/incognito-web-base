export enum InscriptionsActionType {
  FETCHING = 'INSCRIPTION/FETCHING',
  LOAD_MORE = 'INSCRIPTION/LOAD_MORE',
  SET_INSCRIPTIONS = 'INSCRIPTION/SET_INSCRIPTIONS',
  SET_SORT_BY = 'INSCRIPTION/SET_SORT_BY',
  SET_SEARCHING = 'INSCRIPTION/SET_SEARCHING',
  RESET_SEARCH_STATE = 'INSCRIPTION/RESET_SEARCH_STATE',
  SET_MY_INSCRIPTIONS = 'INSCRIPTION/SET_MY_INSCRIPTIONS',
  SET_NFT_UNSPENT_COINS = 'INSCRIPTION/SET_NFT_UNSPENT_COINS',

  SET_FILTER_PAGE = 'INSCRIPTION/SET_FILTER_PAGE',
  SET_KEY_SEARCH = 'INSCRIPTION/SET_KEY_SEARCH',
}

export type Inscription = {
  token_id: string;
  index: number;
  minted_at: number; //epochTime, timestampe = epochTime * 1000
  minted_at_block: string;
  content_type: string;
  size: number;
  hide: boolean;
};

export type QueryInscription = {
  limit: number;
  asc: boolean;
  desc?: boolean;
  from?: number;
};

export type InscirptionListApiResponse = {
  data: Inscription[];
};

export type NFTCoin = {
  Version?: string;
  Info?: string;
  Index?: string;
  PublicKey?: string;
  Commitment?: string;
  KeyImage?: string;
  SharedRandom?: string;
  SharedConcealRandom?: string;
  TxRandom?: string;
  Randomness?: string;
  Value?: string;
  CoinDetailsEncrypted?: string;
  SNDerivator?: string;
  AssetTag: string;
  RawAssetTag: string;
  TokenID: string;
};

export interface InscriptionsReducer {
  inscriptionList: Inscription[];
  fetching: boolean;
  hasLoadMore: boolean;
  isSearching: boolean;

  //Query
  query: QueryInscription;

  myInscriptionList: Inscription[];

  NFTUnspentCoinsList: NFTCoin[];

  filterPage: 'All' | 'My Inscriptions';

  keySearch: string | undefined;
}
