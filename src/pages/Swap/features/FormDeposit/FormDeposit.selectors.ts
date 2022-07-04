import { createSelector } from '@reduxjs/toolkit';
import { swapSelector } from 'pages/Swap';

export const formDepositSelectors = createSelector(swapSelector, (swap) => swap.fromDeposit);

export const isFetchingSelectors = createSelector(formDepositSelectors, (fromDeposit) => fromDeposit.isFetching);
