import { createSelector } from '@reduxjs/toolkit';
import { AppState } from 'state';

import { TAB_LIST } from './Tabs.constant';

export const tabsSelectors = createSelector(
  (state: AppState) => state.tabs,
  (tabs) => tabs
);

export const selectedTabSelector = createSelector(tabsSelectors, (tabs) => (rootTab: string) => tabs[rootTab]);

export const selectedTabIndexSelector = createSelector(selectedTabSelector, (getSelectedTab) => (rootTab: string) => {
  const selectedTab = getSelectedTab(rootTab);
  return (TAB_LIST[rootTab]?.tabNames || []).findIndex((name) => selectedTab === name);
});
