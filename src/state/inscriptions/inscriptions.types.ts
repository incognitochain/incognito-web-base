export enum InscriptionsActionType {
  FETCHING = 'INSCRIPTION/FETCHING',
  LOAD_MORE = 'INSCRIPTION/LOAD_MORE',
  SET_INSCRIPTIONS = 'INSCRIPTION/SET_INSCRIPTIONS',
  SET_SORT_BY = 'INSCRIPTION/SET_SORT_BY',
  RESET_STATE = 'INSCRIPTION/RESET_STATE',
  SET_MY_INSCRIPTIONS = 'INSCRIPTION/SET_MY_INSCRIPTIONS',
}

export type Inscription = {
  token_id: string;
  index: number;
  minted_at: number;
  minted_at_block: string;
  content_type: string;
  size: number;
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
  TokenID?: string;
};

export interface InscriptionsReducer {
  inscriptionList: Inscription[];
  fetching: boolean;
  hasLoadMore: boolean;

  //Query
  query: QueryInscription;

  myInscriptionList: Inscription[];

  NFTUnspentCoinsList: NFTCoin[];
}
