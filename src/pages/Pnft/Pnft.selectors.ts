/* eslint-disable array-callback-return */
import { BigNumber } from 'bignumber.js';
import { formValueSelector, isValid } from 'redux-form';
import { createSelector } from 'reselect';
import { AppState } from 'state';

import { BIG_COINS, PRV } from '../../constants';
import SelectedPrivacy from '../../models/model/SelectedPrivacyModel';
import { getPrivacyByTokenIdentifySelectors, unshieldableTokens } from '../../state/token';
import convert from '../../utils/convert';
import format from '../../utils/format';
import { FORM_CONFIGS } from './features/CollectionDetail/CollectionDetail.constant';
import { IBuyCollection, IToken } from './Pnft.interface';
const { ACCOUNT_CONSTANT } = require('incognito-chain-web-js/build/wallet');

const pNftSelector = createSelector(
  (state: AppState) => state.pNft,
  (pNft) => pNft
);

const collectionsSelector = createSelector(pNftSelector, (pNft) => pNft.collection);

const tokenSelector = createSelector(pNftSelector, (pNft) => pNft.token);

const selectedTokenIdsSelector = createSelector(tokenSelector, (token) => token.selectedTokenIds);

const tokensSelector = createSelector(tokenSelector, (token) => token.list);

const lastTokenSelector = createSelector(tokensSelector, (tokens) =>
  tokens && tokens.length > 0 ? tokens[tokens.length - 1] : undefined
);

const selectedTokensSelector = createSelector(tokensSelector, selectedTokenIdsSelector, (tokens, selectedTokenIds) => {
  let selectedTokens: IToken[] = [];
  for (const tokenId of selectedTokenIds) {
    const findToken = tokens.find((token) => token.tokenId === tokenId);
    if (findToken) {
      selectedTokens = [...selectedTokens, findToken];
    }
  }
  return selectedTokens;
});

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
    const nativeToken: SelectedPrivacy = fnGetPrivacyByTokenIdentify(PRV.identify);
    const incToken = selectedTokenPrivacy.isUnified
      ? selectedTokenPrivacy.listUnifiedToken.find((token) => token.networkID === 1)
      : selectedTokenPrivacy;

    const getBuyAmount = () => {
      const amountNumb = (selectedItems || []).reduce((prev, curr) => {
        return new BigNumber(prev).plus(curr.detail.price.amount || 0).toNumber();
      }, 0);
      const originalAmount = convert.toOriginalAmount({
        humanAmount: amountNumb.toString(),
        decimals: selectedTokenPrivacy?.pDecimals || 9,
        round: true,
      });
      const outchainOriginalAmount = convert.toOriginalAmount({
        humanAmount: amountNumb.toString(),
        decimals: incToken?.decimals || 18,
        round: true,
      });

      let totalAmountNumb = amountNumb;
      if (amountNumb && !!fee) {
        totalAmountNumb += fee.getFeeHumanAmount(selectedTokenPrivacy.pDecimals);
      }
      const totalOriginalAmount = convert.toOriginalAmount({
        humanAmount: totalAmountNumb.toString(),
        decimals: selectedTokenPrivacy.pDecimals,
        round: true,
      });
      let totalAmountStr = format.amountVer2({
        originalAmount: totalOriginalAmount,
        decimals: selectedTokenPrivacy.pDecimals,
      });
      let visibleStr = `${totalAmountStr} ${selectedTokenPrivacy?.symbol}`;
      const burnFormatAmount = format.amountVer2({
        originalAmount: amountNumb,
        decimals: 0,
      });

      return {
        amountNumb,
        originalAmount,
        visibleStr,
        totalAmountNumb,
        totalOriginalAmount,
        burnFormatAmount,
        outchainOriginalAmount,
      };
    };
    const buyAmount = getBuyAmount();

    const isValidNetworkFee = (nativeToken.amount || 0) > ACCOUNT_CONSTANT.MAX_FEE_PER_TX;
    const isValidAmount =
      !!buyAmount.totalAmountNumb && new BigNumber(buyAmount.totalOriginalAmount).lt(selectedTokenPrivacy.amount || 0);

    let validateErr = '';
    let showDeposit = false;
    if (errorMsg) {
      validateErr = errorMsg;
    } else if (!isValidNetworkFee) {
      validateErr = 'Incognito collects a small network fee of 0.1 PRV to pay the miners who help power the network.';
    } else if (!isValidAmount) {
      validateErr = 'Your balance is insufficient.';
      showDeposit = true;
    }

    return {
      valid,
      isValidNetworkFee,
      isValidAmount,
      isEstimating,
      showDeposit,

      apiError: errorMsg,
      validateErr,

      inputAddress,
      fee,
      tokens,
      selectedTokenPrivacy,
      buyAmount,
      selectedItems,
    };
  }
);

const accountSelector = createSelector(pNftSelector, (pNft) => pNft.account);

const tokensAccountSelector = createSelector(accountSelector, (account) => account.tokens);

const selectedTokenIdsAccountSelector = createSelector(accountSelector, (account) => account.selectedTokenIds);

export {
  accountSelector,
  buyCollectionSelector,
  collectionsSelector,
  lastTokenSelector,
  pNftSelector,
  selectedTokenIdsAccountSelector,
  selectedTokenIdsSelector,
  selectedTokensSelector,
  tokenCollectionSelector,
  tokensAccountSelector,
  tokensSelector,
};
