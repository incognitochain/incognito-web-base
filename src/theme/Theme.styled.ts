import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components';

export type Color = string;

export interface Colors {
  // base
  white: Color;
  black: Color;

  // border
  border1: Color;
  border2: Color;
  border3: Color;
  border4: Color;

  // Background
  bg1: Color;
  bg2: Color;
  bg3: Color;
  bg4: Color;
  bg5: Color;

  // content
  content1: Color;
  content2: Color;
  content3: Color;
  content4: Color;

  // Primary
  primary1: Color;
  primary2: Color;
  primary3: Color;
  primary4: Color;
  primary5: Color;
  primary6: Color;
  primary7: Color;
  primary8: Color;
  primary9: Color;
  primary10: Color;
  primary11: Color;
  primary12: Color;
  primary13: Color;

  // Buttons
  btn1: Color;
  btn2: Color;
  btn3: Color;
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
