import { createSelector } from '@reduxjs/toolkit';
import { AppState } from 'state';

export const tabsSelectors = createSelector(
  (state: AppState) => state.tabs,
  (tabs) => tabs
);

export const selectedTabSelector = createSelector(tabsSelectors, (tabs) => (rootTab: string) => tabs[rootTab]);
