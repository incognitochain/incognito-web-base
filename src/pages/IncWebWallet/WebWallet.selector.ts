import { createSelector } from 'reselect';

export const pDexV3Selector = createSelector(
  (state: any) => state.pDexV3,
  (pDexV3: any) => pDexV3
);
