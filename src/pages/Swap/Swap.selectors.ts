import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '../../state';

const swapSelectors = createSelector(
  (state: AppState) => state.swap,
  (swap) => swap
);

export default swapSelectors;
