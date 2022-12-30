import { IStructure, translateByLanguage } from 'i18';
import { createSelector } from 'reselect';
import { IThemeState } from 'theme/Theme.reducer';

import { IConfigsState } from './Configs.reducer';

export interface IRootState {
  configs: IConfigsState;
  theme: IThemeState;
}

export const configsSelector = createSelector(
  (state: IRootState) => state.configs,
  (configs: IConfigsState) => configs
);

export const translateSelector = createSelector(configsSelector, (configs) => translateByLanguage(configs?.language));

export const marketTranslateSelector = createSelector(translateSelector, (translate) => translate?.market);

export const peggingAppTranslateSelector = createSelector(translateSelector, (translate) => translate?.peggingApp);

export const structureTranslateSelector = createSelector(
  translateSelector,
  (translate): IStructure => translate.structure
);

export const pOpenseaTranslateSelector = createSelector(translateSelector, (translate) => translate?.pOpensea);
