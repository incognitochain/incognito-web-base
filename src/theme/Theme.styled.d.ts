import { SuperColorsTheme } from './colors';
import { FontsTheme } from './fonts';
import { MediaQueryTheme } from './mediaQuery';
import { SnippetsTheme } from './snippets';

export interface Theme {}

export type Color = string;
export interface Colors {
  darkMode: boolean;

  // background
  background1: Color;
  background2: Color;
  background3: Color;
  background4: Color;

  btnBG1: Color;

  color_white: Color;
  color_dark: Color;
  color_grey: Color;
  color_grey1: Color;
  color_grey2: Color;
  color_grey3: Color;
  color_grey4: Color;
  color_blue: Color;
  color_black1: Color;
  color_black2: Color;

  // text
  text1: Color;
  text2: Color;
  text3: Color;
  text4: Color;
  text5: Color;

  // backgrounds / greys

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
  border5: Color;

  // Background
  bg1: Color;
  bg2: Color;
  bg3: Color;
  bg4: Color;
  bg5: Color;
  bg6: Color;
  bg7: Color;

  // content
  content1: Color;
  content2: Color;
  content3: Color;
  content4: Color;

  // Primary
  primary: Color;
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
  primary15: Color;

  // Buttons
  btn1: Color;
  btn2: Color;
  btn3: Color;

  shadow1: Color;
}

interface CombineTheme extends SuperColorsTheme, FontsTheme, MediaQueryTheme, Colors, SnippetsTheme {
  // TODO: add all other vibrant variations
}

interface InferredTheme extends CombineTheme {
  // TODO: add all other vibrant variations
}

declare module 'styled-components/macro' {
  export interface DefaultTheme extends InferredTheme {}
}
