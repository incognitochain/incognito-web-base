import { createSelector } from 'reselect';
import { AppState } from 'state';

import { Dao } from './types';

const proposalsSelector = createSelector(
  (state: AppState) => state.dao,
  (dao: Dao) => dao?.proposals
);

const isFetchingProposalsSelector = createSelector(
  (state: AppState) => state.dao,
  (dao: Dao) => dao?.isFetchingProposals
);

export { isFetchingProposalsSelector, proposalsSelector };
