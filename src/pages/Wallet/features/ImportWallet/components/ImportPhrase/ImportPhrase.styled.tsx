import styled, { DefaultTheme } from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  /* justify-content: center; */
  margin-top: 80px;
  min-height: 65vh;

  .title {
    font-weight: 700;
    font-size: 34px;
    line-height: 140%;
    text-align: center;
  }

  .desc {
    margin-top: 16px;
    width: 40%;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    text-align: center;
    color: ${({ theme }) => theme.color_grey};
  }

  .masterkey {
    width: 50%;

    margin-top: 40px;
    .text {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      color: ${({ theme }) => theme.color_grey};
    }

    .wrap-input {
      margin-top: 8px;
    }
  }

  .box {
    margin-top: 16px;
    min-height: 106px;
    padding: 24px;
    background: ${({ theme }) => theme.color_grey2};
    border-radius: 8px;
    width: 50%;
    position: relative;

    .input-phrase {
      font-weight: 600;
      font-size: 18px;
      line-height: 140%;
      text-align: center;
      width: 100%;
      min-height: 86px;
      padding-top: 28px;
      color: white;
      word-break: break-word;
      background-color: transparent;
      border: none;
      resize: none;
    }
  }

  .btn {
    height: 50px;
    width: 50%;
    margin-top: 44px;
    .text-btn {
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      text-align: center;
    }

    &:disabled {
      background-color: ${({ theme }) => theme.primary7};
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
     
     .masterkey {
        width: 70%;
     }

      .desc {
        width: 70%;
      }

      .box {
        width: 70%;
      }

      .btn {
        width: 70%;
      }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
      margin-top: 60px;

      .title {
        font-size: 28px;
      }

      .masterkey {
        width: 90%;
     }
     
      .desc {
        width: 90%;
      }

      .box {
        width: 90%;
      }

      .btn {
        margin-top: 32px;
        width: 90%;
      }
  `}
`;
