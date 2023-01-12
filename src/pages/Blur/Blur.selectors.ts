import { formValueSelector, isValid } from 'redux-form';
import { createSelector } from 'reselect';
import { AppState } from 'state';
import store from 'state';

import { IBuyCollection } from './Blur.interface';
import { FORM_CONFIGS } from './features/CollectionDetail/CollectionDetail.constant';

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

const buyCollectionSelector = createSelector(selectedTokensSelector, (selectedItems): IBuyCollection => {
  const formSelector = formValueSelector(FORM_CONFIGS.formName);
  const valid = isValid(FORM_CONFIGS.formName)(store.getState());

  const inputAddress = formSelector(store.getState(), FORM_CONFIGS.address);

  console.log('SANG TEST: ', inputAddress);

  return {
    valid,
    inputAddress,
  };
});

export {
  blurSelector,
  buyCollectionSelector,
  collectionsSelector,
  lastTokenSelector,
  selectedTokensSelector,
  tokensSelector,
};
