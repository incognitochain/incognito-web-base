import uniq from 'lodash/uniq';
import { PRV_ID } from 'pages/IncWebWallet/constants/common';
import { createSelector } from 'reselect';
import { RootState } from 'state/index';

export const followed = (state: RootState) => state?.webToken?.followed || [];
export const isGettingBalance = (state: RootState) => state?.webToken?.isGettingBalance || [];
export const pTokens = (state: RootState) => state?.webToken?.pTokens || [];
export const internalTokens = (state: RootState) => state?.webToken?.internalTokens || [];
export const tokensFollowedSelector = createSelector(followed, (tokens) => tokens);
export const pTokensSelector = createSelector(
  (state: RootState) => state?.webToken?.pTokens,
  (pTokens) => {
    return pTokens.map((token) => ({ ...token, tokenID: token?.tokenId })) || [];
  }
);

export const internalTokensSelector = createSelector(
  (state: RootState) => state?.webToken?.internalTokens,
  (internalTokens) => internalTokens.map((token) => ({ ...token, tokenID: token?.id })) || []
);

export const historyTokenSelector = createSelector(
  (state: RootState) => state?.webToken?.history,
  (history) => history
);

export const isTokenFollowedSelector = createSelector(
  tokensFollowedSelector,
  (tokens) => (tokenId: any) => tokens.find((token) => token?.id === tokenId)
);

export const toggleUnVerifiedTokensSelector = createSelector(
  (state: RootState) => state?.webToken?.toggleUnVerified,
  (toggleUnVerified) => toggleUnVerified
);

export const receiveHistorySelector = createSelector(
  (state: RootState) => state?.webToken?.receiveHistory,
  historyTokenSelector,
  (receiveHistory, history) => {
    const {
      oversize,
      refreshing: refreshingReceiveHistory,
      isFetched: isFetchedReceiveHistory,
      isFetching: isFetchingReceiveHistory,
      notEnoughData: notEnoughDataReceiveHistory,
    } = receiveHistory;
    const { histories, isFetched, isFetching, refreshing: refreshingHistory } = history;
    const refreshing = refreshingHistory || refreshingReceiveHistory;
    const notEnoughData =
      (histories?.length < 10 || notEnoughDataReceiveHistory) &&
      !isFetchingReceiveHistory &&
      isFetchedReceiveHistory &&
      !oversize;
    const showEmpty = histories?.length === 0 && isFetched && !isFetching && !notEnoughData && !oversize;
    const isLoadmore = !notEnoughData && !!receiveHistory?.isFetching && !receiveHistory?.refreshing && !oversize;
    return {
      ...receiveHistory,
      isLoadmore,
      refreshing,
      notEnoughData,
      showEmpty,
    };
  }
);

export const defaultPTokensIDsSelector = createSelector(pTokensSelector, (pTokens) =>
  pTokens.filter((token) => token?.default).map((token) => token?.tokenId)
);
// memoize(() => {
//   return pTokens.filter((token) => token.default).map((token) => webToken?.tokenId);
// }),

export const allTokensIDsSelector = createSelector(
  pTokensSelector,
  internalTokensSelector,
  (pTokens, internalTokens) => {
    let result =
      uniq(
        [{ tokenID: PRV_ID }, ...pTokens, ...internalTokens]
          .filter((token) => !!token?.tokenID)
          .map((token) => token?.tokenID)
      ) || [];
    return result;
  }
);

export default {
  followed,
  isGettingBalance,
  pTokens,
  internalTokens,
  tokensFollowedSelector,
  pTokensSelector,
  internalTokensSelector,
  historyTokenSelector,
  isTokenFollowedSelector,
  toggleUnVerifiedTokensSelector,
  receiveHistorySelector,
  defaultPTokensIDsSelector,
  allTokensIDsSelector,
};
