import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
  padding-bottom: 40px;
  width: 100%;
  min-height: calc(100vh - 135px);
  margin-top: -40px;
  .section-1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 20px;
    .title {
      white-space: pre-wrap;
      font-weight: 500;
      letter-spacing: 0.015em;
    }
    .sub-title {
      margin-top: 24px;
      white-space: pre-wrap;
    }
    .btn-how-work {
      margin-top: 40px;
      width: 148px;
    }
    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
      .btn-how-work {
        margin-top: 40px;
        height: 50px
        font-size: 18px;
      }
  `}
    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        display: flex;
        flex-direction: column-reverse;
        align-items: flex-start;
        .title {
          text-align: left;
          font-size: 34px;
          line-height: 44px;
          margin-top: 16px;
        }
        .sub-title {
          text-align: left;
          font-size: 16px;
          line-height: 24px;
        }
        .btn-how-work {
          margin-top: 16px;
        }
        .section-head {
            margin-bottom: 0px;
            margin-top: 40px;
        }
    `}
  }
  .group-img {
    width: 45%;
    object-fit: contain;
    max-width: 560px;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
    .group-img {
        max-width: 370px;
        object-fit: contain;
    }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    .group-img {
        width: 85%;
        object-fit: contain;
        margin-top: 0px;
        margin: auto;
    }
  `}

  .section-2 {
    justify-content: space-between;
    .title {
      white-space: pre-wrap;
      text-align: center;
    }
    .sub-title {
      margin-top: 16px;
      font-weight: 500;
      font-size: 22px;
      line-height: 33px;
      letter-spacing: 0.02em;
      text-align: center;
    }
    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
      .btn-how-work {
        margin-top: 50px;
      }
  `}
    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        padding-bottom: 20px;
        justify-content: center;
        .title {
          text-align: center;
          width: 100%;
        }
        .btn-how-work {
          margin: auto;
          margin-top: 50px;
          height: 50px;        
        }
        .sub-title {
          font-size: 16px;
          line-height: 24px;
          text-align: center;
          margin-top: 4px;
        }
    `}
  }
`;

export const WrapperContent = styled.div`
  .sub-menu {
    margin-top: 36px;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }
  .sub-header-text {
    max-width: 800px;
    text-align: center;
    font-weight: 400;
    font-size: 20px;
    margin-top: 16px;
    margin-left: auto;
    margin-right: auto;
  }
  .arrow-image {
    width: 12px;
    height: 12px;
  }
  .wrap-item {
    align-items: center;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }
  .provide-text {
    margin-left: 8px;
    margin-right: 8px;
    color: ${({ theme }) => theme.btn1};
  }
  .watch-item {
    margin-bottom: 20px;
    .h8 {
      margin-left: 8px;
      color: white;
    }
  }
  .header-menu {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 360px;
    justify-content: space-around;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 18px;
    div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 2px 8px;
      gap: 10px;
      height: 24px;
      background: #303030;
      color: white;
      border-radius: 4px;
      text-transform: uppercase;
      font-weight: 400;
      font-size: 14px;
    }
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
      .sub-header-text {
        margin-bottom: 20px;
      }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
      .header-menu {
        div {
          padding: 2px 6px;
          font-size: 12px;
          font-weight: 500;
        }
      }
  `}
  }
`;
