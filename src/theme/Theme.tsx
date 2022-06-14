import { darkTheme, lightTheme } from '@theme/index';
import { FONTS } from '@theme/Theme.fonts';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  createGlobalStyle,
  css,
  ITheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';

import { darkModeSelector } from './Theme.selector';
import { Colors } from './Theme.styled';

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 1200,
  upToLarge: 1440,
  upToSupperLarge: 1920,
};

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } =
  Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
    (accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `;
    return accumulator;
  }, {}) as any;

export const white = '#FFFFFF';
export const black = '#000000';

export function colors(darkMode: boolean): Colors {
  if (darkMode) return darkTheme();
  return lightTheme();
}

export function appTheme(darkMode: boolean): ITheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  };
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const darkMode = useSelector(darkModeSelector);

  const themeObject = useMemo(() => appTheme(darkMode), [darkMode]);

  return (
    <StyledComponentsThemeProvider theme={themeObject}>
      {children}
    </StyledComponentsThemeProvider>
  );
};

export const ThemedGlobalStyle = createGlobalStyle`
    body {
      min-height: 100vh;
      box-sizing: border-box;
    }
    .fw-regular {
        font-weight: 400;
    }

    .fw-medium {
        font-weight: 500;
    }

    .fw-light {
        font-weight: 200;
    }

    .fw-suppermedium {
        font-weight: 600;
    }

    .fw-bold {
        font-weight: 700;
    }

    .fs-suppersmall {
        font-size: ${FONTS.SIZE.superSmall}px;
        line-height: ${FONTS.SIZE.superSmall + 7}px;
    }

    .fs-small {
        font-size: ${FONTS.SIZE.small}px;
        line-height: ${FONTS.SIZE.small + 7}px;
    }

    .fs-regular {
        font-size: ${FONTS.SIZE.regular}px;
        line-height: ${FONTS.SIZE.regular + 7}px;
    }

    .fs-medium {
        font-size: ${FONTS.SIZE.medium}px;
        line-height: ${FONTS.SIZE.medium + 7}px;
    }

    .fs-supermedium {
        font-size: ${FONTS.SIZE.superMedium}px;
        line-height: ${FONTS.SIZE.superMedium + 7}px;
    }

    .fs-large {
        font-size: ${FONTS.SIZE.large}px;
        line-height: ${FONTS.SIZE.large + 7}px;
    }

    .fs-avglarge {
        font-size: ${FONTS.SIZE.avgLarge}px;
        line-height: ${FONTS.SIZE.avgLarge + 7}px;
    }

    .fs-verylarge {
        font-size: ${FONTS.SIZE.veryLarge}px;
        line-height: ${FONTS.SIZE.veryLarge + 7}px;
    }

    .fs-superlarge {
        font-size: ${FONTS.SIZE.superLarge}px;
        line-height: ${FONTS.SIZE.superLarge + 7}px;
    }
`;
