import { createSelector } from 'reselect';
import { AppState } from 'state';

const blurSelector = createSelector(
  (state: AppState) => state.pBlur,
  (pBlur) => pBlur
);

export { blurSelector };
