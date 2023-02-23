import styled, { DefaultTheme, keyframes } from 'styled-components/macro';

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
    width: 45%;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    text-align: center;
    color: ${({ theme }) => theme.color_grey};
  }

  .input-container {
    margin-top: 40px;
  }

  .btn {
    height: 50px;
    width: 40%;
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

      .input-container {
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

      .input-container {
        width: 90%;
      }

      .btn {
        margin-top: 48px;
        width: 90%;
      }
  `}
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: ${rotate360} 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  transform: translateZ(0);
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-left: 2px solid ${({ theme }) => theme.text1};
  background: transparent;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  position: relative;
  transition: 250ms ease border-color;
  left: 3px;
  top: 3px;
  bottom: 3px;
`;
