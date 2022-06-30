import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components/macro';

export type Color = string;
export interface Colors {
  darkMode: boolean;

  // text
  text1: Color;
  text2: Color;
  text3: Color;
  text4: Color;
  text5: Color;

  // backgrounds / greys
  bg0: Color;
  bg6: Color;

  modalBG: Color;
  advancedBG: Color;

  primaryText1: Color;

  // pinks
  secondary1: Color;
  secondary2: Color;
  secondary3: Color;

  // other
  red1: Color;
  red2: Color;
  red3: Color;
  green1: Color;
  yellow1: Color;
  yellow2: Color;
  yellow3: Color;
  blue1: Color;
  blue2: Color;

  blue4: Color;

  error: Color;
  success: Color;
  warning: Color;

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
  primary14: Color;

  // Buttons
  btn1: Color;
  btn2: Color;
  btn3: Color;
}

declare module 'styled-components/macro' {
  export interface DefaultTheme extends Colors {
    grids: Grids;

    // shadows
    shadow1: string;

    // media queries
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<DefaultTheme>;
      upToSmall: ThemedCssFunction<DefaultTheme>;
      upToMedium: ThemedCssFunction<DefaultTheme>;
      upToLarge: ThemedCssFunction<DefaultTheme>;
    };

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation;
    flexRowNoWrap: FlattenSimpleInterpolation;
  }
}
