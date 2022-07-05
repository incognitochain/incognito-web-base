import { createSelector } from '@reduxjs/toolkit';
import { swapSelector } from 'pages/Swap';
import { AppState } from 'state';
import { getDepositTokenDataSelector, getPrivacyByTokenIDSelectors } from 'state/token';

import { getDepositData, IDepositData } from './FormDeposit.utils';

export const formDepositSelectors = createSelector(swapSelector, (swap) => swap.fromDeposit);

export const isFetchingSelectors = createSelector(formDepositSelectors, (fromDeposit) => fromDeposit.isFetching);

export const depositDataSelector = createSelector(
  formDepositSelectors,
  getPrivacyByTokenIDSelectors,
  getDepositTokenDataSelector,
  (state: AppState) => state,
  (deposit, getDataByTokenID, getDepositTokenData, state): IDepositData =>
    getDepositData({
      deposit,
      getDataByTokenID,
      getDepositTokenData,
      state,
    })
);
