import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'state/index';

import { Inscription } from './inscriptions.types';

export const reducerSelector = createSelector(
  (state: RootState) => state.inscriptionsReducer,
  (inscriptionsReducer) => inscriptionsReducer
);

export const getInscriptionListSelector = createSelector(
  reducerSelector,
  (inscriptionReducer) => inscriptionReducer.inscriptionList || []
);

export const getHasLoadMoreSelector = createSelector(
  reducerSelector,
  (inscriptionReducer) => inscriptionReducer.hasLoadMore
);

export const getQueryInfoSelector = createSelector(reducerSelector, (inscriptionReducer) => {
  return inscriptionReducer.query;
});

export const getSortBySelector = createSelector(getQueryInfoSelector, (queryInfo) => {
  let sortByStr = 'Latest';
  if (queryInfo && queryInfo.asc === true) {
    sortByStr = 'Oldest';
  }
  return sortByStr;
});

export const getLastItemSelector = createSelector(
  getInscriptionListSelector,
  (inscriptionList): Inscription | undefined => {
    return inscriptionList?.slice(-1).pop() || undefined;
  }
);

export const getMyInscriptionList = createSelector(reducerSelector, (inscriptionReducer) => {
  return inscriptionReducer.myInscriptionList || [];
});

export const getMyInscriptionSortedList = createSelector(getMyInscriptionList, (list) => {
  let sortList = list.sort((a, b) => b.index - a.index); //Desc
  return sortList;
});

export const getInscriptionTokenIDsListSelector = createSelector(getMyInscriptionList, (inscriptions) => {
  if (!inscriptions || inscriptions.length < 1) return [];
  return inscriptions.map((item) => item.token_id);
});
