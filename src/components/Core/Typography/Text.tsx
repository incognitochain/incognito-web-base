import { Text as TextOriginal, TextProps as TextPropsOriginal } from 'rebass';
import styled, { css, DefaultTheme } from 'styled-components/macro';
import { ColorsKey } from 'theme/colors';
import { MEDIA_WIDTHS } from 'theme/mediaQuery';

declare const TextTypes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h6', 'h7', 'h7', 'p1', 'p1', 'p1', 'p2', 'p2'];
export declare type TextType = typeof TextTypes[number];
export declare type FontWeightValues = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type TextProps = Omit<TextPropsOriginal, 'css' | 'type' | 'color'>;
type ResponsiveType = {
  [key in keyof typeof MEDIA_WIDTHS]: {
    fontSize: number;
    lineHeight: number;
  };
};
type FontSizeFactoryType = {
  [key in TextType]: {
    fontSize: number;
    lineHeight: number;
    responsive?: ResponsiveType;
  };
};

type FontFactoryByTypeResult = {
  fontSize: number;
  lineHeight: number;
  responsive: ResponsiveType;
};

type TextWrapperType = {
  colorOverride: ColorsKey;
  fontWeightOverrdie?: FontWeightValues;
  fontSizeOverrdie?: number;
  lineHeightOverride?: number;
  enableResponsive?: boolean;
  responsive?: ResponsiveType;
};

const mediaQueryBuilder = (a: any, b: any) => {
  return css`
    @media (max-width: ${a}px) {
      font-size: ${b.fontSize}px !important;
      line-height: ${b.lineHeight}% !important;
    }
  `;
};

const mediaQueryFactory = (props?: any) => {
  const { theme }: { theme: DefaultTheme } = props;
  const {
    responsive,
  }: {
    responsive: ResponsiveType;
  } = props;
  const mediaQueryCSS = css`
    /* Default Css */

    /* Media query detail */
    ${mediaQueryBuilder(MEDIA_WIDTHS.upToSupperLarge, responsive.upToSupperLarge)}
    ${mediaQueryBuilder(MEDIA_WIDTHS.upToLarge, responsive.upToLarge)}
    ${mediaQueryBuilder(MEDIA_WIDTHS.upToMedium, responsive.upToMedium)}
    ${mediaQueryBuilder(MEDIA_WIDTHS.upToSmall, responsive.upToSmall)}
    ${mediaQueryBuilder(MEDIA_WIDTHS.upToExtraSmall, responsive.upToExtraSmall)}
  `;
  return mediaQueryCSS;
};

const TextWrapper = styled(TextOriginal)<TextWrapperType>`
  /* Default CSS */
  text-align: center;
  text-overflow: ellipsis;

  /* Inside auto layout */
  margin: 0px;
  padding: 0px;

  /* Custome CSS */
  font-weight: ${({ fontWeightOverrdie, theme }) => fontWeightOverrdie || 500};
  font-size: ${({ fontSizeOverrdie, theme }) => `${fontSizeOverrdie || 16}px`};
  line-height: ${({ lineHeightOverride, theme }) => `${lineHeightOverride || 120}%`};
  color: ${({ colorOverride, theme }) => `${theme.colors[colorOverride] || 'white'}`};

  /* Media Query CSS */
  ${({ enableResponsive, ...props }) => (enableResponsive ? mediaQueryFactory(props) : '')}
`;

const fontThemeFactory = (fontSizeDefault: number, lineHeightDefault: number): FontFactoryByTypeResult => {
  return {
    fontSize: fontSizeDefault,
    lineHeight: lineHeightDefault,
    responsive: {
      upToSupperLarge: {
        fontSize: fontSizeDefault,
        lineHeight: lineHeightDefault,
      },
      upToLarge: {
        fontSize: Math.floor(fontSizeDefault * 0.75),
        lineHeight: lineHeightDefault,
      },
      upToMedium: {
        fontSize: Math.floor(fontSizeDefault * 0.65),
        lineHeight: lineHeightDefault,
      },
      upToExtraSmall: {
        fontSize: Math.floor(fontSizeDefault * 0.54),
        lineHeight: lineHeightDefault,
      },
      upToSmall: {
        fontSize: Math.floor(fontSizeDefault * 0.45),
        lineHeight: lineHeightDefault,
      },
    },
  };
};

const FontSizeFactory: FontSizeFactoryType = {
  h1: fontThemeFactory(64, 120),
  h2: fontThemeFactory(48, 120),
  h3: fontThemeFactory(40, 140),
  h4: fontThemeFactory(34, 140),
  h5: fontThemeFactory(24, 140),
  h6: fontThemeFactory(20, 140),
  h7: fontThemeFactory(18, 140),

  p1: fontThemeFactory(16, 140),
  p2: fontThemeFactory(14, 140),
};

interface TextExternalProps extends TextProps {
  type?: TextType;
  fontWeight?: FontWeightValues;
  color?: ColorsKey;
  enableResponsive?: boolean;
}

const Text = (props: TextExternalProps) => {
  const { type = 'p1', fontWeight = 500, color = 'white', enableResponsive = false } = props;
  const { fontSize = 16, lineHeight = 120, responsive } = FontSizeFactory[type];
  const newProps = {
    ...props,
    type,
    fontWeight,
    fontSize,
    responsive,
    lineHeightOverride: lineHeight,
    colorOverride: color,
    enableResponsive,
  };
  return <TextWrapper {...newProps} />;
};

export default Text;
