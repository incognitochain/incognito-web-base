import { ChevronDown } from 'react-feather';
import styled, { DefaultTheme, keyframes } from 'styled-components/macro';

export const Styled = styled.div`
  .view-content {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .view-title {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    margin-left: 8px;
    margin-right: 40px;
  }
  .price-container {
    margin-top: 24px;
    border: 1px solid ${({ theme }) => theme.border1};
    border-radius: 12px;
    padding: 16px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .time-sale {
    font-weight: 400;
    font-size: 14px;
    margin-left: 8px;
    color: ${({ theme }) => theme.content2};
  }

  .price-indicator {
    height: 1px;
    margin-top: 16px;
    background-color: ${({ theme }) => theme.border1};
  }

  .balance-container {
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    justify-content: space-between;
    margin-top: 16px;
  }

  .buy-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
  }

  .current-price {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: ${({ theme }) => theme.color_grey};
  }

  .current-fee {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: ${({ theme }) => theme.color_grey};
    margin-top: 2px;
  }

  .current-balance {
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: ${({ theme }) => theme.color_grey};
    margin-top: 4px;
  }

  .current-error {
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    color: ${({ theme }) => theme.content4};
    margin-top: 2px;
  }

  .price-view {
    display: flex;
    flex-direction: column;
  }

  .price {
    display: flex;
    flex-direction: row;
    margin-top: 4px;
    align-items: center;
  }

  .price-coin {
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
  }

  .btn-buy {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35%;
    height: 50px;

    background-color: ${({ theme }) => theme.color_blue};
    border-radius: 8px;
    cursor: pointer;

    :hover {
      background-color: ${({ theme }) => theme.primary1};
    }

    :focus {
      background-color: ${({ theme }) => theme.primary1};
    }
  }

  .text-buy {
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
  }

  .select-tokens-list {
    height: 56px;
    background: #252525;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    padding-left: 16px;
    padding-right: 16px;
    margin-left: 16px;
    margin-top: 2px;

    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.border1};

    :hover {
      border: 1px solid ${({ theme }) => theme.border5};
    }

    :focus {
      border: 1px solid ${({ theme }) => theme.border5};
      color: ${({ theme }) => theme.primary5};
    }
  }

  .selected-token-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    .price-coin {
        font-size: 18px;
      }


  `}
`;

export const ArrowDown = styled(ChevronDown)<{ open?: boolean }>`
  color: ${({ theme }) => theme.white};
  width: 16px;
  height: 20px;
  margin-left: 4px;
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
