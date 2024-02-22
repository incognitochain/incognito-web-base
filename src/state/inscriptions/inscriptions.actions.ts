import { flattenDeep, uniqBy } from 'lodash';
import http2 from 'pages/IncWebWallet/services/http2';
import { AppGetState, AppThunkDispatch } from 'state';

import { getInscriptionListSelector, getLastItemSelector, getQueryInfoSelector } from './inscriptions.selectors';
import { Inscription, InscriptionsActionType, NFTCoin } from './inscriptions.types';

const setKeySearch = (payload: string) => ({
  type: InscriptionsActionType.SET_KEY_SEARCH,
  payload,
});

const setFilterPage = (payload: string) => ({
  type: InscriptionsActionType.SET_FILTER_PAGE,
  payload,
});

const setFetchingAction = (payload: boolean) => ({
  type: InscriptionsActionType.FETCHING,
  payload,
});

const setSearching = (payload: boolean) => ({
  type: InscriptionsActionType.SET_SEARCHING,
  payload,
});

const resetSearchState = () => ({
  type: InscriptionsActionType.RESET_SEARCH_STATE,
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

const setNFTUnspentCoins = (payload: NFTCoin[]) => ({
  type: InscriptionsActionType.SET_NFT_UNSPENT_COINS,
  payload,
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
    } else {
      dispatch(setInscriptionList([]));
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
      const data = http2.get(`inscription-content?id=${id}`).then((respone: any) => {});
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

const fetchMyInscriptionListAPI =
  (params: GetMyInscriptionListAPI) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    let myInscriptionList: Inscription[] = [];
    try {
      const { assetTagList = [], tokenIdsList = [] } = params;
      // console.log('[fetchMyInscriptionListAPI] PARAMS: ', {
      //   assetTagList,
      //   tokenIdsList,
      // });

      let taskAPIList: any[] = [];

      if (tokenIdsList && Array.isArray(tokenIdsList) && tokenIdsList.length > 0) {
        taskAPIList.push(
          http2.post(
            `inscriptions-info`,
            JSON.stringify({
              token_ids: tokenIdsList,
            })
          )
        );
      }

      if (assetTagList && Array.isArray(assetTagList) && assetTagList.length > 0) {
        taskAPIList.push(
          http2.post(
            `inscriptions-info`,
            JSON.stringify({
              asset_tags: assetTagList,
            })
          )
        );
      }

      const listData = await Promise.all(taskAPIList);
      // console.log('[fetchMyInscriptionListAPI] listData : ', listData);
      myInscriptionList = uniqBy(flattenDeep(listData), 'token_id');
      // console.log('[fetchMyInscriptionListAPI] RESULT : ', myInscriptionList);
    } catch (e) {
      console.log('[fetchMyInscriptionListAPI] ERROR: ', e);
      myInscriptionList = [];
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
  } catch (e) {
    console.log('[queryWithTokenIdAPI] ERROR: ', e);
    inscriptionListFetched = [];
  } finally {
    dispatch(setFetchingAction(false));
    if (inscriptionListFetched && inscriptionListFetched.length > 0) {
      dispatch(setInscriptionList([inscriptionListFetched[0]]));
    } else {
      dispatch(setInscriptionList([]));
    }
    return inscriptionListFetched;
  }
};

const reportInscriptionById = (tokenId: string) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  let result;
  try {
    result = await http2.get(`report?id=${tokenId}`);
  } catch (e) {
    console.log('[reportInscriptionById] ERROR: ', e);
    result = false;
  } finally {
    return result;
  }
};

export {
  fetchMyInscriptionListAPI,
  getInscriptionContentAPI,
  getInscriptionInfoAPI,
  getInscriptionListAPI,
  queryWithIndexAPI,
  queryWithTokenIdAPI,
  reportInscriptionById,
  resetSearchState,
  setFetchingAction,
  setFilterPage,
  setInscriptionList,
  setKeySearch,
  setLoadMore,
  setMyInscriptionList,
  setNFTUnspentCoins,
  setSearching,
  setSortBy,
};
