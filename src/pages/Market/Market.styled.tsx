import styled, { DefaultTheme } from 'styled-components/macro';
export const Styled = styled.div<{ isMobile: boolean }>`
  width: 100%;
  .market-header {
    padding-top: 40px;
    padding-bottom: 60px;
    padding-left: ${({ isMobile }) => isMobile && 200};
    padding-right: ${({ isMobile }) => isMobile && 200};
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
      .market-header {
        padding-top: 40px;
        padding-bottom: 60px;
      }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
      .market-header {
        padding-top: 20px;
        padding-bottom: 40px;
      }
    `}
`;
