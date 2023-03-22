import Column from 'components/Core/Column';
import styled, { keyframes } from 'styled-components/macro';

export const Styled = styled(Column)`
  width: 100%;
  overflow-y: auto;
  max-height: 80vh;
  height: 472px;

  .header {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .input-area {
    .text {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      color: ${({ theme }) => theme.color_grey};
    }
    .input-container {
      margin-top: 8px;
    }

    .error {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      margin-top: 4px;
      color: ${({ theme }) => theme.content4};
    }
  }

  .btn {
    height: 50px;
    width: 100%;
    margin-top: 16px;
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

  .forgot-pass {
    align-self: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    margin-top: 24px;
    cursor: pointer;
    text-align: center;
  }
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
