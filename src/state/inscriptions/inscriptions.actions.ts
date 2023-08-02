import http2 from 'pages/IncWebWallet/services/http2';
import { AppGetState, AppThunkDispatch } from 'state';

import { getInscriptionListSelector, getLastItemSelector, getQueryInfoSelector } from './inscriptions.selectors';
import { Inscription, InscriptionsActionType } from './inscriptions.types';

const setFetchingAction = (payload: boolean) => ({
  type: InscriptionsActionType.FETCHING,
  payload,
});

const resetState = () => ({
  type: InscriptionsActionType.RESET_STATE,
});

const setLoadMore = (payload: boolean) => ({
  type: InscriptionsActionType.LOAD_MORE,
  payload,
});

const setInscriptionList = (payload: Inscription[]) => ({
  type: InscriptionsActionType.SET_INSCRIPTIONS,
  payload,
});

const setMyInscriptionList = (payload: Inscription[]) => ({
  type: InscriptionsActionType.SET_MY_INSCRIPTIONS,
  payload,
});

const setSortBy = (payload: { asc: boolean }) => ({
  type: InscriptionsActionType.SET_SORT_BY,
  payload: payload.asc,
});

type GetInscriptionListAPIParams = {
  from?: number;
  limit?: number;
  asc?: boolean;
};

const getInscriptionListAPI =
  (params?: GetInscriptionListAPIParams) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    const rootState = getState();
    const queryInfo = getQueryInfoSelector(rootState);
    const currentInscriptionList = getInscriptionListSelector(rootState);
    const lastItem: Inscription | undefined = getLastItemSelector(rootState);

    const { limit, asc } = queryInfo;
    let inscriptionListFetched: Inscription[] = [];

    try {
      dispatch(setFetchingAction(true));

      let from;

      if (asc === false) {
        from = (lastItem && lastItem.index - 1) ?? undefined;
        if (from === 0) {
          dispatch(setLoadMore(false));
          return;
        }
      } else {
        from = (lastItem && lastItem.index + 1) ?? 0;
      }

      const queryBuilder = [];

      from && queryBuilder.push(`from=${from}`);
      queryBuilder.push(`limit=${limit}`);
      queryBuilder.push(`asc=${asc}`);

      const queryPath = `${queryBuilder.join('&')}`;

      // console.log('[getInscriptionListAPI] queryPath: ', queryPath);

      inscriptionListFetched = (await http2.get(`inscriptions?${queryPath}`)) || [];
    } catch (e) {
      console.log('[getInscriptionListAPI] ERROR: ', e);
      inscriptionListFetched = [];
    } finally {
      dispatch(setFetchingAction(false));
      if (inscriptionListFetched && inscriptionListFetched.length > 0) {
        dispatch(setInscriptionList([...currentInscriptionList, ...inscriptionListFetched]));
      }

      if (inscriptionListFetched && inscriptionListFetched.length < limit) {
        dispatch(setLoadMore(false));
      } else {
        dispatch(setLoadMore(true));
      }

      console.log('PHAT inscriptionListFetched ', inscriptionListFetched);
      return inscriptionListFetched;
    }
  };

const queryWithIndexAPI = (from: number) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  // const rootState = getState();

  let inscriptionListFetched: Inscription[] = [];
  try {
    const queryBuilder = [];
    queryBuilder.push(`from=${from}`);
    queryBuilder.push(`limit=${1}`);
    queryBuilder.push(`asc=true`);

    const queryPath = `${queryBuilder.join('&')}`;

    // console.log('[getInscriptionListAPI] queryPath: ', queryPath);

    inscriptionListFetched = (await http2.get(`inscriptions?${queryPath}`)) || undefined;
  } catch (e) {
    console.log('[getInscriptionListAPI] ERROR: ', e);
    inscriptionListFetched = [];
  } finally {
    dispatch(setFetchingAction(false));
    if (inscriptionListFetched && inscriptionListFetched.length > 0) {
      dispatch(setInscriptionList([inscriptionListFetched[0]]));
    }
    return inscriptionListFetched;
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
      const data: Inscription = await http2.post(
        `inscriptions-info`,
        JSON.stringify({
          token_ids,
        })
      );

      console.log('[getInscriptionInfoAPI] DONE: ', data);
      return data;
    } catch (e) {
      console.log('[getInscriptionInfoAPI] ERROR: ', e);
      return undefined;
    }
  };

type GetMyInscriptionListAPI = {
  assetTagList?: string[];
  tokenIdsList?: string[];
};

const getMyInscriptionListAPI =
  (params: GetMyInscriptionListAPI) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    let myInscriptionList: Inscription[] = [];
    try {
      console.log('[getMyInscriptionListAPI] START: ');
      const { assetTagList = [], tokenIdsList = [] } = params;

      if (assetTagList && Array.isArray(assetTagList) && assetTagList.length > 0) {
        const data: Inscription[] = await http2.post(`inscriptions-info`, {
          asset_tags: assetTagList,
        });
        myInscriptionList = [...data];
      } else if (tokenIdsList && Array.isArray(tokenIdsList) && tokenIdsList.length > 0) {
        const data: Inscription[] = await http2.post(`inscriptions-info`, {
          tokenIdsList,
        });
        myInscriptionList = [...data];
      }

      console.log('[getMyInscriptionListAPI] DONE: ', myInscriptionList);
    } catch (e) {
      console.log('[getMyInscriptionListAPI] ERROR: ', e);
    } finally {
      dispatch(setMyInscriptionList(myInscriptionList));
    }
  };

const queryWithTokenIdAPI = (tokenId: string) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  let inscriptionListFetched: Inscription[] = [];
  try {
    console.log('[queryWithTokenIdAPI] START: ');
    inscriptionListFetched = await http2.post(
      `inscriptions-info`,
      JSON.stringify({
        token_ids: [tokenId],
      })
    );
    console.log('[queryWithTokenIdAPI] DONE inscriptionListFetched: ', inscriptionListFetched);
  } catch (e) {
    console.log('[queryWithTokenIdAPI] ERROR: ', e);
    inscriptionListFetched = [];
  } finally {
    dispatch(setFetchingAction(false));
    if (inscriptionListFetched && inscriptionListFetched.length > 0) {
      dispatch(setInscriptionList([inscriptionListFetched[0]]));
    }
    return inscriptionListFetched;
  }
};

export {
  getInscriptionContentAPI,
  getInscriptionInfoAPI,
  getInscriptionListAPI,
  getMyInscriptionListAPI,
  queryWithIndexAPI,
  queryWithTokenIdAPI,
  resetState,
  setFetchingAction,
  setInscriptionList,
  setLoadMore,
  setMyInscriptionList,
  setSortBy,
};
