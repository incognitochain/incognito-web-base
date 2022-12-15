import styled, { DefaultTheme } from 'styled-components/macro';
export const Styled = styled.div<{ isMobile: boolean }>`
  width: 100%;
  .fade-in-section {
    opacity: 0;
    transform: translateY(20vh);
    visibility: hidden;
    transition: opacity 1200ms ease-out, transform 600ms ease-out, visibility 1200ms ease-out;
    will-change: opacity, transform, visibility;
  }
  .fade-in-section.is-visible {
    opacity: 1;
    transform: none;
    visibility: visible;
  }

  .market-header {
    //padding-top: 40px;
    //padding-bottom: 60px;
    padding-left: ${({ isMobile }) => isMobile && 200};
    padding-right: ${({ isMobile }) => isMobile && 200};
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
      .market-header {
        // padding-top: 40px;
        // padding-bottom: 60px;
      }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
      .market-header {
        padding-top: 20px;
        padding-bottom: 40px;
      }
    `}
`;
