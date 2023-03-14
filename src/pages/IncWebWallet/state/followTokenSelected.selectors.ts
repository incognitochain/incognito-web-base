import { createSelector } from 'reselect';

const getStateSelector = createSelector(
  (rootState: any) => rootState.followTokenSelectedReducer,
  (state) => state
);

export const getFollowTokenSelectedIDSelector = createSelector(getStateSelector, (state) => state.tokenID);
export const getFollowTokenSelectedTokenSelector = createSelector(getStateSelector, (state) => state.token);

export default {
  getStateSelector,
  getFollowTokenSelectedIDSelector,
  getFollowTokenSelectedTokenSelector,
};
