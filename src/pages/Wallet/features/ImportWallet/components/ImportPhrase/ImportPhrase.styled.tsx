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

  .box {
    margin-top: 40px;
    min-height: 106px;
    padding: 24px 40px;
    background: ${({ theme }) => theme.color_grey2};
    border-radius: 8px;
    width: 50%;
    position: relative;

    .overlay {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(117, 117, 117, 0.8);
      backdrop-filter: blur(4px);
      border-radius: 8px;

      .text-phrase {
        font-weight: 600;
        font-size: 18px;
        line-height: 140%;
        text-align: center;
      }

      .content {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        .text-click {
          font-weight: 500;
          font-size: 16px;
          line-height: 140%;
          text-align: center;
          cursor: default;
        }
      }
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

      .box {
        width: 90%;
        margin-top: 20px;

      }

      .btn {
        margin-top: 24px;
        width: 90%;
      }
  `}
`;
