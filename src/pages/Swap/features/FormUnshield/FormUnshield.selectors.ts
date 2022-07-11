import { createSelector } from '@reduxjs/toolkit';
import { swapSelector } from 'pages/Swap';

export const formUnshieldSelectors = createSelector(swapSelector, (swap) => swap.fromDeposit);
