import React, { useMemo } from 'react';
import { Text, TextProps as TextPropsOriginal } from 'rebass';
import { useIsDarkMode } from 'state/user/hooks';
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components/macro';

import { Colors } from './Theme.styled';

export * from './components';

type TextProps = Omit<TextPropsOriginal, 'css'>;

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
};

// Migrating to a standard z-index system https://getbootstrap.com/docs/5.0/layout/z-index/
// Please avoid using deprecated numbers
export enum Z_INDEX {
  deprecated_zero = 0,
  deprecated_content = 1,
  dropdown = 1000,
  sticky = 1020,
  fixed = 1030,
  modalBackdrop = 1040,
  offcanvas = 1050,
  modal = 1060,
  popover = 1070,
  tooltip = 1080,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    (accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `;
    return accumulator;
  },
  {}
) as any;

const white = '#FFFFFF';
const black = '#000000';

function colors(darkMode: boolean): Colors {
  return {
    darkMode,

    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#C3C5CB' : '#565A69',
    text3: darkMode ? '#8F96AC' : '#6E727D',
    text4: darkMode ? '#B2B9D2' : '#C3C5CB',
    text5: darkMode ? '#2C2F36' : '#EDEEF2',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

    // color text
    primaryText1: darkMode ? '#5090ea' : '#D50066',

    // secondary colors
    secondary1: darkMode ? '#2172E5' : '#E8006F',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#FDEAF1',

    // other
    red1: darkMode ? '#FF4343' : '#DA2D2B',
    red2: darkMode ? '#F82D3A' : '#DF1F38',
    red3: '#D60000',
    green1: darkMode ? '#27AE60' : '#007D35',
    yellow1: '#E3A507',
    yellow2: '#FF8F00',
    yellow3: '#F3B71E',
    blue1: darkMode ? '#2172E5' : '#0068FC',
    blue2: darkMode ? '#5199FF' : '#0068FC',
    error: darkMode ? '#FD4040' : '#DF1F38',
    success: darkMode ? '#27AE60' : '#007D35',
    warning: '#FF8F00',

    // dont wanna forget these blue yet
    blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',

    // base
    white,
    black,

    // border
    border1: '#363636',
    border2: '#DDDDDD',
    border3: '#F2F2F2',
    border4: '#F2F4F5',
    border5: '#474646',

    // Background
    // backgrounds / greys
    bg0: darkMode ? '#191B1F' : '#FFF',
    bg1: '#F2F2F2',
    bg2: '#1A1A1A',
    bg3: '#303030',
    bg4: '#404040',
    bg5: '#F2F4F5',
    bg6: darkMode ? '#1A2028' : '#6C7284',

    // content
    content1: '#000000',
    content2: '#9C9C9C',
    content3: '#0ECB81',
    content4: '#F6465D',

    // Primary
    primary1: '#1C55B8',
    primary2: '#1A73E8',
    primary3: '#6BA0FB',
    primary4: '#ECF3FF',
    primary5: '#FFFFFF',
    primary6: '#000000',
    primary7: '#757575',
    primary8: '#9C9C9C',
    primary9: '#C0C0C0',
    primary10: '#DDDDDD',
    primary11: '#F5F5F5',
    primary12: '#F9F9F9',
    primary13: '#FCFCFC',
    primary14: '#252525',

    // Buttons
    btn1: '#1A73E8',
    btn2: '#03A66D',
    btn3: '#CF304A',
  };
}

function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

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

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode();

  const themeObject = useMemo(() => theme(darkMode), [darkMode]);

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>;
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`;

/**
 * Preset styles of the Rebass Text component
 */
export const ThemedText = {
  Main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary8'} {...props} />;
  },
  Link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />;
  },
  Label(props: TextProps) {
    return <TextWrapper fontWeight={600} color={'text1'} {...props} />;
  },
  Black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />;
  },
  White(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />;
  },
  Body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />;
  },
  LargeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />;
  },
  Small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />;
  },
  SuperSmallLabel(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={14} {...props} />;
  },
  SmallLabel(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={14} style={{ lineHeight: '20px' }} {...props} />;
  },
  RegularLabel(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={16} {...props} />;
  },
  MediumLabel(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={18} style={{ lineHeight: '28px' }} {...props} />;
  },
  AvgMediumLabel(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} style={{ lineHeight: '28px' }} {...props} />;
  },
  Blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'blue1'} {...props} />;
  },
  Yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow3'} {...props} />;
  },
  DarkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />;
  },
  Gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />;
  },
  Italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />;
  },
  Error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} fontSize={14} color={error ? 'content4' : 'text2'} {...props} />;
  },
  Warning({ warning, ...props }: { warning: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} fontSize={14} color={warning ? 'warning' : 'text2'} {...props} />;
  },
};

export const ThemedGlobalStyle = createGlobalStyle`
  html {
    color: ${({ theme }) => theme.text1};
    background-color: ${({ theme }) => theme.bg1} !important;
  }
  
  a {
   color: ${({ theme }) => theme.blue1}; 
  }
  .border-hover {
    border: 1px solid ${({ theme }) => theme.border1};
    :hover {
      border: 1px solid ${({ theme }) => theme.border5};
    }
  }
  ::-webkit-scrollbar {
    display: block;
  }
  .error {
    color: ${({ theme }) => theme.content4};
  }
`;
