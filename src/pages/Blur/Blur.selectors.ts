import { createSelector } from 'reselect';
import { AppState } from 'state';

const blurSelector = createSelector(
  (state: AppState) => state.pBlur,
  (pBlur) => pBlur
);

const collectionsSelector = createSelector(blurSelector, (pBlur) => pBlur.collection);

const tokenSelector = createSelector(blurSelector, (pBlur) => pBlur.token);

const tokensSelector = createSelector(tokenSelector, (token) => token.list);

const lastTokenSelector = createSelector(tokensSelector, (tokens) =>
  tokens && tokens.length > 0 ? tokens[tokens.length - 1] : undefined
);

export { blurSelector, collectionsSelector, lastTokenSelector, tokensSelector };
