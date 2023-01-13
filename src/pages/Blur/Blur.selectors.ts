import { formValueSelector, isValid } from 'redux-form';
import { createSelector } from 'reselect';
import { AppState } from 'state';

import { IBuyCollection } from './Blur.interface';
import { FORM_CONFIGS } from './features/CollectionDetail/CollectionDetail.constant';

const blurSelector = createSelector(
  (state: AppState) => state.pBlur,
  (pBlur) => pBlur
);

const collectionsSelector = createSelector(blurSelector, (pBlur) => pBlur.collection);

const tokenSelector = createSelector(blurSelector, (pBlur) => pBlur.token);

const selectedTokenIdsSelector = createSelector(tokenSelector, (token) => token.selectedTokenIds);

const tokensSelector = createSelector(tokenSelector, selectedTokenIdsSelector, (token, selectedTokenIds) =>
  token.list.map((token) => ({ ...token, isSelected: selectedTokenIds.includes(token.tokenId) }))
);

const lastTokenSelector = createSelector(tokensSelector, (tokens) =>
  tokens && tokens.length > 0 ? tokens[tokens.length - 1] : undefined
);

const selectedTokensSelector = createSelector(tokensSelector, selectedTokenIdsSelector, (tokens, selectedTokenIds) =>
  tokens.filter((token) => selectedTokenIds.includes(token.tokenId))
);
const tokenCollectionSelector = createSelector(tokenSelector, (token) => token.collection);

const buyCollectionSelector = createSelector(
  (state: AppState) => state,
  tokenSelector,
  selectedTokensSelector,
  (state, token, selectedTokens): IBuyCollection => {
    const formSelector = formValueSelector(FORM_CONFIGS.formName);
    let valid = isValid(FORM_CONFIGS.formName)(state);

    const inputAddress = formSelector(state, FORM_CONFIGS.address);
    const { fee, isEstimating } = token;
    return {
      valid,
      inputAddress,
      isEstimating,
      fee,
    };
  }
);

export {
  blurSelector,
  buyCollectionSelector,
  collectionsSelector,
  lastTokenSelector,
  selectedTokensSelector,
  tokenCollectionSelector,
  tokensSelector,
};
