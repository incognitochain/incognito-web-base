import { Theme } from './Theme.styled';

export const Colors = {
  //Common
  white: '#FFFFFF',
  black: '#000000',

  //
  white_1: '#e5e5e5',
  white_2: '#f5f5f5',
  white_3: '#f2f2f2',
  white_4: '#d9d9d9',

  //Blue
  blue_1A73E8: '#1A73E8',
  blue_2F80ED: '#2F80ED',
  blue_2172E5: '#2172E5',
  blue_6BA0FB: '#6BA0FB',

  //Gray
  gray_1A1A1A: '#1A1A1A',
  gray_191919: '#191919',
  gray_252525: '#252525',
  gray_303030: '#303030',
  gray_363636: '#363636',
  gray_757575: '#757575',
  gray_9C9C9C: '#9C9C9C',

  //Yellow
  yellow_FFC043: '#FFC043',

  //Orange
  orange_FF9500: '#FF9500',

  //Red
  red_F6465D: '#F6465D',
  red_CF304A: '#CF304A',

  // Pink
  pink_D50066: '#D50066',
  pink_E8006F: '#E8006F',

  //Green
  green_0ECB81: '#0ECB81',
  green_03A66D: '#03A66D',
  green_34C759: '#34C759',

  // TODO: add all other vibrant variations
};

export const darkTheme = {
  ...Colors,
  background: Colors.black,

  // TODO: add all other vibrant variations
};

export const lightTheme = {
  ...Colors,
  background: Colors.white,
  // TODO: add all other vibrant variations
};

export type ColorsType = typeof Colors;
export type ColorsKey = keyof typeof Colors;

export interface SuperColorsTheme extends Theme {
  colors: ColorsType;
}
