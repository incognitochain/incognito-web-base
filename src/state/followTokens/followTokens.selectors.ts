import { createSelector } from 'reselect';
import { RootState } from 'state/index';

export const getFollowTokenList = createSelector(
  (state: RootState) => state,
  (state) => state.followTokensReducer
);

export const getPTokenList = createSelector(
  (state: RootState) => state.followTokensReducer,
  (followTokensReducer) => followTokensReducer.pTokens
);

export default {
  getFollowTokenList,
  getPTokenList,
};
