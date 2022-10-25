import { IRootState } from 'config/Configs.selector';
import { createSelector } from 'reselect';

import { colors } from './Theme';
import { IThemeState } from './Theme.reducer';

export const themeSelector = createSelector(
  (state: IRootState) => state.theme,
  (theme: IThemeState) => theme
);

export const darkModeSelector = createSelector(themeSelector, (theme) => theme.darkMode);

export const colorsSelector = createSelector(darkModeSelector, (darkMode) => colors(darkMode));
