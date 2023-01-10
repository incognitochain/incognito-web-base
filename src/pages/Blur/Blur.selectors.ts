import { createSelector } from 'reselect';
import { AppState } from 'state';

const blurSelector = createSelector(
  (state: AppState) => state.pBlur,
  (pBlur) => pBlur
);

const collectionsSelector = createSelector(blurSelector, (pBlur) => pBlur.collection);

const resTokenSelector = createSelector(blurSelector, (pBlur) => pBlur.resToken);

const tokensSelector = createSelector(resTokenSelector, (resToken) => (resToken ? resToken.tokens : []));
const totalAmoutTokenSelector = createSelector(resTokenSelector, (resToken) => (resToken ? resToken.totalCount : 0));

const lastTokenSelector = createSelector(tokensSelector, (tokens) =>
  tokens && tokens.length > 0 ? tokens[tokens.length - 1] : undefined
);

export { blurSelector, collectionsSelector, lastTokenSelector, tokensSelector, totalAmoutTokenSelector };
