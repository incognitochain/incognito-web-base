import React, { useMemo } from 'react';
import { Text, TextProps as TextPropsOriginal } from 'rebass';
import { useIsDarkMode } from 'state/user/hooks';
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components/macro';

import { FONTS } from './Theme.fonts';
import { Colors } from './Theme.styled';

export * from './components';

type TextProps = Omit<TextPropsOriginal, 'css'>;

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 1200,
  upToLarge: 1440,
  upToSupperLarge: 1920,
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

export const white = '#FFFFFF';
export const black = '#000000';

export function colors(darkMode: boolean): any {
  return {
    darkMode,

    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#9C9C9C' : '#565A69',
    text3: darkMode ? '#8F96AC' : '#6E727D',
    text4: darkMode ? '#B2B9D2' : '#C3C5CB',
    text5: darkMode ? '#757575' : '#EDEEF2',

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
    bg1: '#303030',
    bg2: '#1A1A1A',
    bg3: '#303030',
    bg4: '#404040',
    bg5: '#F2F4F5',
    bg6: darkMode ? '#1A2028' : '#6C7284',
    bg7: '#EBF2FF',

    background1: darkMode ? '#1A1A1A' : white,
    background2: darkMode ? '#303030' : white,
    background3: '#1A1A1A',
    background4: '#1A73E8',

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
    primary15: '#FFC043',

    // Buttons
    btn1: '#1A73E8',
    btn2: '#03A66D',
    btn3: '#CF304A',

    color_white: '#FFFFFF',
    color_dark: '#000000',
    color_grey: '#9C9C9C',
    color_grey1: '#303030',
    color_grey2: '#252525',
    color_grey3: '#363636',
    color_grey4: '#757575',
    color_blue: '#1A73E8',
    color_black1: '#191919',
    color_black2: '#1A1A1A',
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
    return <TextWrapper fontWeight={600} color={'white'} fontSize={24} {...props} />;
  },
  Small(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} fontSize={12} lineHeight="17px" {...props} />;
  },
  SmallLabel(props: TextProps) {
    return (
      <TextWrapper
        fontWeight={500}
        color={'white'}
        fontSize={14}
        lineHeight="20px"
        style={{ lineHeight: '20px' }}
        {...props}
      />
    );
  },
  RegularLabel(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} fontSize={16} {...props} />;
  },
  MediumLabel(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} fontSize={18} style={{ lineHeight: '28px' }} {...props} />;
  },
  AvgMediumLabel(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} fontSize={20} style={{ lineHeight: '28px' }} {...props} />;
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

  .border-hover {
    border: 1px solid ${({ theme }) => theme.border1};

    :hover {
      border: 1px solid ${({ theme }) => theme.border5};
    }
  }

  ::-webkit-scrollbar {
    display: block;
    width: 0;
  }

  .error {
    color: ${({ theme }) => theme.content4};
  }

  .dropdown-menu-item {
    :hover {
      background-color: transparent
    }
  }

  .sub-menu-header {
    background-color:${({ theme }) => theme.bg1};
  }

  .button-hover {
    :hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }

  .white-color {
    color: white;
  }

  #root {
      font-family: Inter, sans-serif  !important;
    }

    body {
      min-height: 100vh;
      box-sizing: border-box;
    }
    @font-face {
      font-family: Inter-Regular;
      src: url('../assets/fonts/Inter/Inter-Regular.ttf');
      font-style: normal;
      font-display: swap;
      font-weight: 400;
    }

    @font-face {
      font-family: Inter-Medium;
      src: url('../assets/fonts/Inter/Inter-Medium.ttf');
      font-style: normal;
      font-display: swap;
      font-weight: 500;
    }

    @font-face {
      font-family: Inter-Bold;
      src: url('../assets/fonts/Inter/Inter-Bold.ttf');
      font-style: normal;
      font-display: swap;
      font-weight: 700;
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
        font-weight: 500;
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

    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        .fs-superlarge {
            font-size: ${FONTS.SIZE.veryLarge}px;
            line-height: ${FONTS.SIZE.veryLarge + 7}px;
        }
    `}
    
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
  
    .row {
        display: flex;
        flex-direction: row;
    }
    .disable-pointer {
        cursor: default;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .text-align-left {
      text-align: left;
    }

    .text-align-right {
      text-align: right;
    }
    .text-align-left {
      text-align: left;
    }

    .text-align-center {
      text-align: center;
    }
    
    p {
      color: ${({ theme }) => theme.text1}
    }

    a {
      color: ${({ theme }) => theme.blue1};
    }

    div {
      color: ${({ theme }) => theme.background1}
    }
    
    // text
    .text1 {
      color: ${({ theme }) => theme.text1}
    }
    .text2 {
      color: ${({ theme }) => theme.text2}
    }
    .text3 {
      color: ${({ theme }) => theme.text3}
    }
    .text4 {
      color: ${({ theme }) => theme.text4}
    }
    .text5 {
      color: ${({ theme }) => theme.text5}
    }

    // background
    .background1 {
      background-color: ${({ theme }) => theme.background1}
    }
    .background2 {
      background-color: ${({ theme }) => theme.background2}
    }

    .ant-card {
      background: transparent;
    }
    .ant-card-bordered {
      border: none;
    }
    
    .default-padding-horizontal {
      padding-left: 105px;
      padding-right: 105px;
    }

    .ant-btn-round.ant-btn-lg {
      height: 60px;
      font-size: 18px;
      font-weight: 500;
      letter-spacing: 0;
      text-align: center;
      border: none;
      border-radius: 8px;
    }
    
    .button1 {
      background-color: ${({ theme }) => theme.btnBG1};
    }

    ::-webkit-scrollbar {
      //width: 15px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
       //background: ${({ theme }) => theme.background2};
       //border-radius: 10px;
       //border: 2px solid ${({ theme }) => theme.background1};
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      // background: ${({ theme }) => theme.background2};
    }
    .ant-tooltip-inner {
      background: ${({ theme }) => theme.background2};
    }
    .border-bottom {
      border-bottom: 1px solid ${({ theme }) => theme.border1};
    }
    .sub-title-text {
      font-size: 22px;
      line-height: 33px;
      letter-spacing: 0.01em;
      white-space: pre-wrap;
      margin-top: 24px;
    }
    .special-main-title-text {
      white-space: pre-wrap;
      font-size: 76px;
      line-height: 82px;
      font-weight: 500;
    }
    .main-title-text {
      white-space: pre-wrap;
      font-size: 64px;
      line-height: 70px;
      font-weight: 500;
    }
    .default-padding-vertical {
      padding-top: 100px;
      padding-bottom: 100px;
    }
    .default-margin-top {
      margin-top: 100px;
    }
    .default-margin-bottom {
      margin-bottom: 100px;
    }
    .ant-btn-round.ant-btn-lg {
      height: 60px;
    }

    /* .description {
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.01em;
      white-space: pre-wrap;
      color: #757575;
    } */

    .header {
      color: ${({ theme }) => theme.color_white};
      font-size: 64px;
        font-weight: 500;
        line-height: 120%;
        letter-spacing: -0.005em;
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 64px;
        font-weight: 500;
        line-height: 120%;
        letter-spacing: -0.005em;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 48px;
        font-weight: 500;
        line-height: 120%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 34px;
        font-weight: 500;
        line-height: 124%;
      `}
    }

    .header1 {
      color: ${({ theme }) => theme.color_white};
      font-size: 28px;
        font-weight: 500;
        line-height: 140%;
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 28px;
        font-weight: 500;
        line-height: 140%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 24px;
        font-weight: 500;
        line-height: 132%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 20px;
        font-weight: 500;
        line-height: 124%;
        letter-spacing: -0.02em;
      `}
    }

    .header2 {
      color: ${({ theme }) => theme.color_white};
      font-size: 24px;
      font-weight: 500;
      line-height: 140%;
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 24px;
        font-weight: 500;
        line-height: 140%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 20px;
        font-weight: 500;
        line-height: 120%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 20px;
        font-weight: 500;
        line-height: 124%;
      `}
    }
      
    .description {
      color: ${({ theme }) => theme.color_grey};
      font-size: 20px;
      font-weight: 400;
      line-height: 140%;
      letter-spacing: 0.005em;
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 20px;
        font-weight: 400;
        line-height: 140%;
        letter-spacing: 0.005em;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 18px;
        font-weight: 400;
        line-height: 140%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 16px;
        font-weight: 400;
        line-height: 140%;
      `}
    }

    .description2 {
      color: ${({ theme }) => theme.color_grey4};
      font-size: 16px;
        font-weight: 400;
        line-height: 140%;
        letter-spacing: 0.005em;
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 16px;
        font-weight: 400;
        line-height: 140%;
        letter-spacing: 0.005em;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;
      `}
    }


    .description3 {
      color: ${({ theme }) => theme.color_grey4};
      font-size: 18px;
        font-weight: 500;
        line-height: 20px;
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 18px;
        font-weight: 500;
        line-height: 20px;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 18px;
        font-weight: 500;
        line-height: 140%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 16px;
        font-weight: 500;
        line-height: 140%;
      `}
    }


    .description4 {
      color: ${({ theme }) => theme.color_grey4};
      font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 12px;
        font-weight: 500;
        line-height: 20px;
      `}
    }

    
    .description5 {
      color: ${({ theme }) => theme.color_grey4};
      font-size: 18px;
        font-weight: 500;
        line-height: 20px;
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 18px;
        font-weight: 500;
        line-height: 20px;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 16px;
        font-weight: 500;
        line-height: 140%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 16px;
        font-weight: 500;
        line-height: 140%;
      `}
    }

    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        .default-padding-horizontal {
          padding-left: 105px;
          padding-right: 105px;
        }
        .sub-title-text {
          font-size: 18px;
          line-height: 27px;
          letter-spacing: 0.01em;
          margin-top: 16px;
        }
        .special-main-title-text {
          white-space: pre-wrap;
          font-weight: 500;
          font-size: 48px;
          line-height: 54px;
          letter-spacing: 0.01em;
        }
        .main-title-text {
          white-space: pre-wrap;
          font-weight: 500;
          font-size: 48px;
          line-height: 54px;
          letter-spacing: 0.01em;
        }
        .default-padding-vertical {
          padding-top: 80px;
          padding-bottom: 80px;
        }
        .default-margin-top {
          margin-top: 80px;
        }
        .default-margin-bottom {
          margin-bottom: 80px;
        }
        .ant-btn-round.ant-btn-lg {
          height: 50px;
        }
  `}
    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        .default-padding-horizontal {
          padding-left: 16px;
          padding-right: 16px;
        }
        .sub-title-text {
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0.01em;
          white-space: initial;
          margin-top: 16px;
        }
        .special-main-title-text {
          white-space: initial;
          font-weight: 500;
          font-size: 34px;
          line-height: 44px;
          letter-spacing: 0.01em;
        }
        .main-title-text {
          white-space: initial;
          font-weight: 500;
          font-size: 28px;
          line-height: 38px;
          letter-spacing: 0.01em;
        }
        .default-padding-vertical {
          padding-top: 40px;
          padding-bottom: 40px;
        }
        .default-margin-top {
          margin-top: 40px;
        }
        .default-margin-bottom {
          margin-bottom: 40px;
        }
        .ant-btn-round.ant-btn-lg {
          height: 50px;
        }
    `}

    // Colors global
    .color-white {
      color: ${({ theme }) => theme.color_white}
    }
    .color-dark {
      color: ${({ theme }) => theme.color_dark}
    }
    .color_grey {
      color: ${({ theme }) => theme.color_grey}
    }
    .color_grey1 {
      color: ${({ theme }) => theme.color_grey1}
    }
    .color_grey2 {
      color: ${({ theme }) => theme.color_grey2}
    }
    .color_grey3 {
      color: ${({ theme }) => theme.color_grey3}
    }
    .color_grey4 {
      color: ${({ theme }) => theme.color_grey4}
    }
    .color_blue {
      color: ${({ theme }) => theme.color_blue}
    }
    .color_black1 {
      color: ${({ theme }) => theme.color_black1}
    }
    .color_black1 {
      color: ${({ theme }) => theme.color_black2}
    }

    .hover-opacity {
      :hover {
        cursor: pointer;
        opacity: 0.6;
      }
    }

    .text-center {
      text-align: center
    }

    .text-left {
      text-align: left
    }

    //Header Global
    h1 {
      color: ${({ theme }) => theme.color_white};
      font-size: 64px;
      font-weight: 500;
      line-height: 120%;
      letter-spacing: -0.005em;
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 64px;
        font-weight: 500;
        line-height: 120%;
        letter-spacing: -0.005em;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 48px;
        font-weight: 500;
        line-height: 120%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 34px;
        font-weight: 500;
        line-height: 124%;
      `}
    }

    h2 {
      color: ${({ theme }) => theme.color_white};
      font-size: 48px;
      font-weight: 500;
      line-height: 120%;
      letter-spacing: -0.005em;
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
          font-size: 48;
        `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
          font-size: 38px;
        `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
          font-size: 34px;
        `}
    }

    h3 {
      color: ${({ theme }) => theme.color_white};
      font-size: 40px;
        font-weight: 500;
        line-height: 140%;
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 40px;
        font-weight: 500;
        line-height: 140%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 40px;
        font-weight: 500;
        line-height: 140%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 40px;
        font-weight: 500;
        line-height: 140%;
      `}
    }

    .h3_1 {
      color: ${({ theme }) => theme.color_white};
      font-size: 34px;
        font-weight: 500;
        line-height: 140%;
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 34px;
        font-weight: 500;
        line-height: 140%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 28px;
        font-weight: 500;
        line-height: 140%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 20px;
        font-weight: 500;
        line-height: 140%;
      `}
    }


    h4 {
      color: ${({ theme }) => theme.color_white};
      font-size: 28px;
        font-weight: 500;
        line-height: 140%;
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 28px;
        font-weight: 500;
        line-height: 140%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 24px;
        font-weight: 500;
        line-height: 132%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 20px;
        font-weight: 500;
        line-height: 124%;
        letter-spacing: -0.02em;
      `}
    }

    h5 {
      color: ${({ theme }) => theme.color_white};
        font-size: 26px;
        font-weight: 800;
        line-height: 140%;
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 24px;
        font-weight: 800;
        line-height: 140%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 20px;
        font-weight: 500;
        line-height: 120%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 20px;
        font-weight: 500;
        line-height: 124%;
      `}
    }

    h6 {
      color: ${({ theme }) => theme.color_grey};

      font-size: 20px;
      font-weight: 400;
      line-height: 140%;
      letter-spacing: 0.005em;

      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 20px;
        font-weight: 400;
        line-height: 140%;
        letter-spacing: 0.005em;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 18px;
        font-weight: 400;
        line-height: 140%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 16px;
        font-weight: 400;
        line-height: 140%;
      `}
    }

    .h7 {
      color: ${({ theme }) => theme.color_grey};
      font-size: 18px;
      font-weight: 400;
      line-height: 140%;

      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 18px;
        font-weight: 400;
        line-height: 140%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 18px;
        font-weight: 400;
        line-height: 140%;
      `}
      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 16px;
        font-weight: 400;
        line-height: 140%;
      `}
    }

  .h8 {
    color: ${({ theme }) => theme.color_grey};
    font-size: 16px;
    font-weight: 400;
    line-height: 140%;

    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        font-size: 16px;
        font-weight: 400;
        line-height: 140%;
      `}
    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;
      `}
    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;
      `}
  }


    .margin-add {
      margin-bottom: 10px;
    }

    .wrap-text-center {
      white-space: pre-wrap;
      text-align: center;
    }
`;
