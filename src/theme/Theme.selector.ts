import { IRootState } from '@src/app-redux/interface';
import { colors } from '@theme/Theme';
import { createSelector } from 'reselect';

import { IThemeReducer } from './Theme.reducer';

export const themeSelector = createSelector(
  (state: IRootState) => state.theme,
  (theme: IThemeReducer) => theme,
);

export const darkModeSelector = createSelector(themeSelector, (theme) => theme.darkMode);

export const colorsSelector = createSelector(darkModeSelector, (darkMode) =>
  colors(darkMode),
);
