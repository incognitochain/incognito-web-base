import { createSelector } from '@reduxjs/toolkit';
import { AppState } from 'state';

export const inscriptionListSelector = createSelector(
  (state: AppState) => state.inscriptionsReducer,
  (inscriptionsReducer) => inscriptionsReducer.inscriptionList || []
);
