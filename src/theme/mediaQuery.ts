/* eslint-disable no-restricted-imports */
import { css, DefaultTheme, ThemedCssFunction } from 'styled-components';

import { Theme } from './Theme.styled';
export type MediaQueryInterface = {
  upToExtraSmall: ThemedCssFunction<DefaultTheme>;
  upToSmall: ThemedCssFunction<DefaultTheme>;
  upToMedium: ThemedCssFunction<DefaultTheme>;
  upToLarge: ThemedCssFunction<DefaultTheme>;
  upToSupperLarge: ThemedCssFunction<DefaultTheme>;
};

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 1200,
  upToLarge: 1440,
  upToSupperLarge: 1920,
};

type MediaWidthsType = typeof MEDIA_WIDTHS;
type MediaWidthsKeysType = keyof MediaWidthsType;

export const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(
  MEDIA_WIDTHS
).reduce((accumulator, size) => {
  (accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `;
  return accumulator;
}, {}) as MediaQueryInterface;

export const MediaQueryBuilder = (key: MediaWidthsKeysType, innerCSS?: any) =>
  css`
    @media (max-width: ${MEDIA_WIDTHS[key]}px) {
      ${innerCSS};
    }
  `;

export interface MediaQueryTheme extends Theme {
  mediaWidth: MediaQueryInterface;
}
