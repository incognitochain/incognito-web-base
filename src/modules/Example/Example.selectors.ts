import { IRootState } from '@src/app-redux/interface';
import { createSelector } from 'reselect';

const exampleSelectors = createSelector(
  (state: IRootState) => state.example,
  (example) => example,
);

const statusSelector = createSelector(exampleSelectors, (example) => example.status);

export { statusSelector };
