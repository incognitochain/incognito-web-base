import styled, { DefaultTheme } from 'styled-components/macro';
export const Styled = styled.div<{ isMobile: boolean }>`
  .market-header {
    padding-top: 120px;
    padding-bottom: 120px;
    padding-left: ${({ isMobile }) => isMobile && 200};
    padding-right: ${({ isMobile }) => isMobile && 200};
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
      .market-header {
        padding-top: 80px;
        padding-bottom: 80px;
      }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
      .market-header {
        padding-top: 48px;
        padding-bottom: 40px;
      }
    `}
`;
