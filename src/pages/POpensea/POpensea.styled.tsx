import styled, { DefaultTheme } from 'styled-components/macro';
export const Styled = styled.div`
  padding-bottom: 40px;
  width: 100%;
  min-height: 1000px;

  .header-title {
    color: red;
  }

  .section-1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

  .input-container {
    display: flex;
    position: absolute;
    right: 0px;
    top: -84px;
    height: 50px;
    border-radius: 8px;
    border-width: 1px;
    padding-left: 16px;
    padding-right: 50px;
    background-color: ${({ theme }) => theme.bg3};
    caret-color: ${({ theme }) => theme.primary5};

    :hover {
      border: 1px solid ${({ theme }) => theme.border5};
    }

    :focus {
      border: 1px solid ${({ theme }) => theme.border5};
      color: ${({ theme }) => theme.primary5};
    }

    ::placeholder {
      flex: none;
      order: 0;
      flex-grow: 0;
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      color: ${({ theme }) => theme.primary7};
    }
  }

  .search-ic {
    width: 16px;
    height: 16px;
    margin-right: 16px;
    margin-top: 17px;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
      .input-container {
        width: 220px;
      }
  `}
`;

export const WrapperContent = styled.div`
  .sub-menu {
    margin-top: 36px;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
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
`;

export const TextInputStyled = styled.input`
  display: flex;
  flex: 1;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: white;
`;
