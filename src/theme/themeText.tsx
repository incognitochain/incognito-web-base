import { Text, TextProps as TextPropsOriginal } from 'rebass';
import styled from 'styled-components/macro';

import { Colors } from './Theme.styled';

type TextProps = Omit<TextPropsOriginal, 'css'>;

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
