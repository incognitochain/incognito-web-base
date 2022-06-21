import { Colors } from '@theme/Theme.styled';
import { Text, TextProps as TextPropsOriginal } from 'rebass';
import { ITheme } from 'styled-components';
import styled from 'styled-components/macro';

type TextProps = Omit<TextPropsOriginal, 'css'>;

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }: { color: string; theme: ITheme }) => (theme as any)[color]};
`;

/**
 * Preset styles of the Rebass Text component
 */
const ThemedText = {
  Main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />;
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
  MediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />;
  },
  SubHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />;
  },
  Small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />;
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
    return (
      <TextWrapper
        fontWeight={500}
        fontSize={12}
        fontStyle={'italic'}
        color={'text2'}
        {...props}
      />
    );
  },
  Error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />;
  },
};

export default ThemedText;
