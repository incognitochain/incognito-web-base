import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
  width: 100%;
  margin-top: 32px;

  .header {
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #363636;
    border-top: 1px solid #363636;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .title {
      font-weight: 700;
      font-size: 24px;
      line-height: 140%;
    }

    .checkbox-container {
      display: flex;
      flex-direction: row;
      align-items: center;

      .checkbox {
        display: flex;
        flex-direction: row;
        align-items: center;

        .checkbox-ic {
          width: 16px;
          height: 16px;
          margin-left: 28px;
        }

        .checkbox-value {
          margin-left: 8px;
          font-weight: 500;
          font-size: 16px;
          line-height: 140%;
        }
      }
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
      
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToExtraSmall`

  `}
`;

export const ListStyled = styled.div<{ showLoader: boolean }>`
  opacity: ${({ showLoader }) => (showLoader ? 0 : 1)};
  transition: all 600ms ease-in-out;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const NFTItem = styled.div<{ effectHover: boolean }>`
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;
  padding-top: 16px;
  box-sizing: border-box;
  cursor: ${({ effectHover }) => (effectHover ? 'pointer' : 'unset')};
  flex: 1;
  border-radius: 8px;
  :hover {
    background-color: ${({ theme, effectHover }) => (effectHover ? theme.bg3 : 'transparent')};
  }
  .wrap-index {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 8px;
    p {
      width: 60px;
      text-align: center;
    }
  }
  .wrap-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 4px;
    width: calc(100% / 5) !important;
  }
  .wrap-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 4px;
    width: calc(100% / 5) !important;
  }
  .align-end {
    justify-content: center;
  }
  .content-label {
    font-size: 16px;
    line-height: 140%;
    font-weight: 600;
  }
  .header-label {
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    color: ${({ theme }) => theme.color_grey};
  }
  .header-index-label {
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    color: ${({ theme }) => theme.color_grey};
  }
  .logo {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    object-fit: cover;
  }
  .currency-logo {
    width: 24px;
  }
  .shadow-text {
    color: ${({ theme }) => theme.color_grey};
    padding-right: 16px;
  }
  .wrap-name {
    display: flex;
    align-items: center;
    flex: 1;

    .ic-checkbox {
      width: 16px;
      height: 16px;
      margin-right: 16px;
      margin-left: 8px;
    }
    .name {
      margin-left: 16px;
      width: 220px;
      text-align: left;
    }
    .header-name {
      width: 220px;
      text-align: left;
      color: ${({ theme }) => theme.color_grey};
    }
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    .medium-hide {
      display: none;
    }
  `}

  ${({ theme }) => theme.mediaWidth.upToSmall`
    .medium-hide {
      display: none;
    }
    .header-label {
      display: none;
    }
    .wrap-item {
      display: none;
    }
  `}
`;
