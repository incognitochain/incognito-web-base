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

const selectedTokensSelector = createSelector(tokensSelector, (tokens) => tokens.filter((token) => token.isSelected));

export { blurSelector, collectionsSelector, lastTokenSelector, selectedTokensSelector, tokensSelector };
