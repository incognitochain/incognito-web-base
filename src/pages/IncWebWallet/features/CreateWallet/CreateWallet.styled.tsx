import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div<{ height: number }>`
  width: 100%;
  min-height: ${({ height }) => height}px;
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
  `}
`;
