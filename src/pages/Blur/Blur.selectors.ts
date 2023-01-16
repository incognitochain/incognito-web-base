import { BigNumber } from 'bignumber.js';
import { formValueSelector, isValid } from 'redux-form';
import { createSelector } from 'reselect';
import { AppState } from 'state';

import { BIG_COINS } from '../../constants';
import SelectedPrivacy from '../../models/model/SelectedPrivacyModel';
import { getPrivacyByTokenIdentifySelectors, unshieldableTokens } from '../../state/token';
import convert from '../../utils/convert';
import format from '../../utils/format';
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

const selectedTokensSelector = createSelector(tokensSelector, (tokens) => tokens.filter((token) => token.isSelected));

const tokenCollectionSelector = createSelector(tokenSelector, (token) => token.collection);

const buyCollectionSelector = createSelector(
  (state: AppState) => state,
  tokenSelector,
  selectedTokensSelector,
  unshieldableTokens,
  getPrivacyByTokenIdentifySelectors,
  selectedTokensSelector,
  (state, token, selectedTokens, tokens, fnGetPrivacyByTokenIdentify, selectedItems): IBuyCollection => {
    const formSelector = formValueSelector(FORM_CONFIGS.formName);
    let valid = isValid(FORM_CONFIGS.formName)(state);

    const inputAddress = formSelector(state, FORM_CONFIGS.address);
    const { fee, isEstimating, errorMsg, selectedPrivacyTokenID } = token;

    tokens = tokens.filter((token) => token.isMainETH || token.tokenID === BIG_COINS.ETH_UNIFIED.tokenID);

    const selectedTokenPrivacy: SelectedPrivacy = fnGetPrivacyByTokenIdentify(selectedPrivacyTokenID);

    const getBuyAmount = () => {
      const amountNumb = (selectedItems || []).reduce((prev, curr) => {
        return new BigNumber(prev).plus(curr.detail.price.amount || 0).toNumber();
      }, 0);
      const originalAmount = convert.toOriginalAmount({
        humanAmount: amountNumb.toString(),
        decimals: selectedTokenPrivacy?.pDecimals || 9,
        round: true,
      });

      let totalAmountNumb = amountNumb;
      if (amountNumb && !!fee) {
        totalAmountNumb += fee.getFeeHumanAmount(selectedTokenPrivacy.pDecimals);
      }
      let totalAmountStr = format.amountVer2({ originalAmount: totalAmountNumb, decimals: 0 });
      let visibleStr = `${totalAmountStr} ${selectedTokenPrivacy?.symbol}`;

      return {
        amountNumb,
        originalAmount,
        visibleStr,
        totalAmountNumb,
      };
    };

    return {
      valid,
      inputAddress,
      isEstimating,
      fee,
      errorMsg,
      tokens,
      selectedTokenPrivacy,
      buyAmount: getBuyAmount(),
      selectedItems,
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
