import { createSelector } from 'reselect';
import { AppState } from 'state';

const blurSelector = createSelector(
  (state: AppState) => state.pBlur,
  (pBlur) => pBlur
);

const collectionsSelector = createSelector(blurSelector, (pBlur) => pBlur.collections);

export { blurSelector, collectionsSelector };
