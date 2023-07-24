export enum InscriptionsActionType {
  FETCHING = 'INSCRIPTION/FETCHING',
  SET_INSCRIPTIONS = 'INSCRIPTION/SET_INSCRIPTIONS',
}

export type Inscirption = {
  token_id: string;
  index: number;
  minted_at: string;
  minted_at_block: string;
  content_type: string;
};

export type InscirptionListApiResponse = {
  data: Inscirption[];
};

export interface InscriptionsReducer {
  inscriptionList: Inscirption[];
  fetching: boolean;
}
