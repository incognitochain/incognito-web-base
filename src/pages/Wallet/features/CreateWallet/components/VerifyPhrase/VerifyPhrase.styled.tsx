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
    width: 50%;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    text-align: center;
    color: ${({ theme }) => theme.color_grey};
  }

  .mnemonic-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 24px;
    width: 55%;
  }

  .box {
    margin-top: 40px;
    min-height: 106px;
    padding: 24px 40px;
    background: ${({ theme }) => theme.color_grey2};
    border-radius: 8px;
    width: 50%;
    position: relative;
    align-items: center;
    justify-content: center;

    .text-phrase {
      font-weight: 600;
      font-size: 18px;
      line-height: 140%;
      text-align: center;
    }
  }

  .btn {
    height: 50px;
    width: 50%;
    margin-top: 40px;
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
     
      .desc {
        width: 70%;
      }

      .mnemonic-box {
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

      .desc {
        width: 90%;
      }

      .mnemonic-box {
        width: 90%;
      }

      .box {
        width: 90%;
        margin-top: 20px;
      }

      .btn {
        margin-top: 48px;
        width: 90%;
      }
  `}
`;

export const MnemonicItemWrapper = styled.div`
  margin-bottom: 8px;
`;
