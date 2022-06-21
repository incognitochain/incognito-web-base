import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components';

export type Color = string;

export interface Colors {
  // base
  white: Color;
  black: Color;

  // border
  border1: Color;

  bg1: Color;
  primary1: Color;

  blue1: Color;
}

export interface Grids {
  sm: number;
  md: number;
  lg: number;
}

declare module 'styled-components' {
  export interface ITheme extends Colors {
    grids: Grids;

    // media queries
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<ITheme>;
      upToSmall: ThemedCssFunction<ITheme>;
      upToMedium: ThemedCssFunction<ITheme>;
      upToLarge: ThemedCssFunction<ITheme>;
      upToSupperLarge: ThemedCssFunction<ITheme>;
    };

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation;
    flexRowNoWrap: FlattenSimpleInterpolation;
  }
}
