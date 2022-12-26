import styled, { DefaultTheme } from 'styled-components/macro';

export const AppWrapper = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  justify-content: space-between;
  gap: 30px;
  .line-view {
    width: 24px;
  }
  .line {
    width: 0;
    height: 16px;
  }
  .app-margin-right {
    margin-right: 20px;
  }
  .app-margin-left {
    margin-left: 20px;
  }
  .app-margin-top {
    margin-top: 40px;
  }
  .vector-link-icon {
    position: absolute;
    top: 24px;
    right: 24px;
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        grid-template-columns: auto auto;
        flex-direction: column;
        margin-top: 40px;
        .app-margin-top {
            margin-top: 0px;
        }
        .app-margin-right {
          margin-right: 0px;
        }
        .app-margin-left {
          margin-left: 0px;
        }
        .app-margin-top-small {
            margin-top: 8px;
        }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
        grid-template-columns: auto;
        flex-direction: column;
        .app-margin-top {
            margin-top: 0px;
        }
        .app-margin-right {
          margin-right: 0px;
        }
        .app-margin-left {
          margin-left: 0px;
        }
        .app-margin-top-small {
            margin-top: 8px;
        }
        .vector-link-icon {
          top: 16px;
          right: 16px;
        }
  `}
`;

export const WrapAppItem = styled.div<{ isMobile: boolean; canClick: boolean }>`
  display: flex;
  flex-direction: column;
  .box {
    padding: 32px;
    background-color: ${({ theme }) => theme.primary14};
    border-radius: 16px;
    height: 273px !important;
    :hover {
      opacity: ${({ canClick, isMobile }) => (canClick && !isMobile ? 0.8 : 1)};
      cursor: ${({ canClick, isMobile }) => (canClick && !isMobile ? 'pointer' : 'unset')};
    }
    .exchange-logo {
      width: 80px;
      height: 80px;
    }
    .vector-link-icon {
      top: 32px;
      right: 32px;
    }
    .wrap-status {
      margin-top: 24px;
      align-items: center;
    }
    .exchange-name {
    }
    .exchange-name-desc {
      margin-top: 4px;
    }
    .status {
      margin-left: 8px;
      border: 1px solid #363636;
      border-radius: 4px;
      padding: 5px 8px;
      font-size: 14px;
    }
    .wrap-chain {
      background-color: ${({ theme }) => theme.bg1};
      padding: 5px 8px;
      margin-right: 8px;
      border-radius: 4px;
      margin-top: 12px;
    }
  }

  .description {
    margin-top: 24px;
    color: ${({ theme }) => theme.primary8};
    font-size: 14px;
    .link-text {
      color: ${({ theme }) => theme.btn1};
      cursor: pointer;
      :hover {
        opacity: 0.8;
      }
    }
    svg {
      width: 14px;
      height: 14px;
      margin-left: 5px;
      padding-top: 4px;
      cursor: pointer;
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    max-width: unset;
  `};
`;
