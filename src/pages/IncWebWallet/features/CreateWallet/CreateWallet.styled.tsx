import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
  width: 100%;
  margin-bottom: 70px;
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
      
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
      
  `}
`;
