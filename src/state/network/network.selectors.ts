import { createSelector } from 'reselect';
import { RootState } from 'state/index';

const getCurrentNetworkSelector = createSelector(
  (state: RootState) => state.networkReducer,
  (networkReducer) => networkReducer.currentNetwork
);

export { getCurrentNetworkSelector };
