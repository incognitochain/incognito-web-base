import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
  width: 100%;
  height: 80vh;
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
       height: 80vh;
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
       height: 85vh;
  `}
`;
