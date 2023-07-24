import http2 from 'pages/IncWebWallet/services/http2';
import { AppGetState, AppThunkDispatch } from 'state';

import { InscriptionsActionType } from './inscriptions.types';

const setFetchingAction = (payload: boolean) => ({
  type: InscriptionsActionType.FETCHING,
  payload,
});

const setInscriptionList = (payload: any[]) => ({
  type: InscriptionsActionType.SET_INSCRIPTIONS,
  payload,
});

// Async Actions

type GetInscriptionListAPIParams = {
  from: number;
  limit: number;
  order: 'asc' | 'desc';
};

const getInscriptionListAPI =
  (params: GetInscriptionListAPIParams) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      console.log('[getInscriptionListAPI] START: ');
      const { from = 0, limit = 100, order } = params;

      const queryBuilder = [];
      from && queryBuilder.push(`from=${from}`);
      limit && queryBuilder.push(`limit=${limit}`);
      order && queryBuilder.push(order === 'asc' ? 'asc=true' : 'desc=true');

      await dispatch(setFetchingAction(true));
      const data = http2.get(`inscriptions?${queryBuilder.join('&')}`).then((respone: any) => {
        console.log('[getInscriptionListAPI] respone ==> ', respone);
      });
      console.log('[getInscriptionListAPI] DONE: ');
      return data;
    } catch (e) {
      console.log('[getInscriptionListAPI] ERROR: ', e);
    }
  };

type GetInscriptionContentParams = {
  id: string;
};

const getInscriptionContentAPI =
  (params: GetInscriptionContentParams) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      console.log('[getInscriptionContentAPI] START: ');
      const { id } = params;
      const data = http2.get(`inscription-content?id=${id}`).then((respone: any) => {
        console.log('[getInscriptionContentAPI] respone ==> ', respone);
      });
      console.log('[getInscriptionContentAPI] DONE: ');
      return data;
    } catch (e) {
      console.log('[getInscriptionContentAPI] ERROR: ', e);
    }
  };

type GetInscriptionInfoParams = {
  token_ids: string[];
};

const getInscriptionInfoAPI =
  (params: GetInscriptionInfoParams) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      console.log('[getInscriptionInfoAPI] START: ');
      const { token_ids } = params;
      const data = http2
        .post(
          `inscription-info`,
          JSON.stringify({
            token_ids,
          })
        )
        .then((respone: any) => {
          console.log('[getInscriptionInfoAPI] respone ==> ', respone);
        });
      console.log('[getInscriptionInfoAPI] DONE: ');
      return data;
    } catch (e) {
      console.log('[getInscriptionInfoAPI] ERROR: ', e);
    }
  };

export {
  getInscriptionContentAPI,
  getInscriptionInfoAPI,
  getInscriptionListAPI,
  setFetchingAction,
  setInscriptionList,
};
