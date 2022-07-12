import { createSelector } from '@reduxjs/toolkit';
import swapSelector from 'pages/Swap/Swap.selectors';
import { AppState } from 'state';
import { getDepositTokenDataSelector, getPrivacyByTokenIDSelectors } from 'state/token';

import { getUnshieldData, IUnshieldData } from './FormUnshield.utils';

export const formUnshieldSelectors = createSelector(swapSelector, (swap) => swap.fromUnshield);

export const unshieldDataSelector = createSelector(
  formUnshieldSelectors,
  getPrivacyByTokenIDSelectors,
  getDepositTokenDataSelector,
  (state: AppState) => state,
  (unshield, getDataByTokenID, getDepositTokenData, state): IUnshieldData =>
    getUnshieldData({
      unshield,
      getDataByTokenID,
      getDepositTokenData,
      state,
    })
);
