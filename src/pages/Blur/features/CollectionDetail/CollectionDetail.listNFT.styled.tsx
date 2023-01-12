import styled, { css, DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
  .list {
    margin-top: 32px;
  }

  .total-container {
    display: flex;
    flex-direction: row;
    width: 25%;
  }

  .total-items {
    font-weight: 700;
    font-size: 28px;
    line-height: 140%;
  }

  .total-number {
    font-weight: 700;
    font-size: 28px;
    line-height: 140%;
    color: ${({ theme }) => theme.text2};
    margin-left: 16px;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
      margin-top: 16px;
      
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToExtraSmall`
      margin-top: 0px;

  `}
`;

export const StyledCard = styled.div<{ isSelected: boolean; effectToken: boolean; disableEffectToken: boolean }>`
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  /* border: ${({ isSelected, theme }) => (isSelected ? ` 6px solid ${theme.primary15}` : 'none')}; */

  /* :hover {
    border: 6px solid ${({ isSelected, theme }) => (isSelected ? theme.primary15 : theme.white)};
  } */
  overflow: hidden;
  .item-img {
    width: 100%;
    aspect-ratio: 1 / 1;
    height: auto;
    object-fit: cover;
    background-color: ${({ theme }) => theme.bg4};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  ${({ effectToken }) =>
    effectToken &&
    css`
      border-color: ${({ theme }) => theme.yellow3};
    `}

  ${({ disableEffectToken }) =>
    disableEffectToken &&
    css`
      opacity: 0.95;
    `}
  
  
  transition: all 0.2s ease-in-out;

  :hover {
    .item-img {
      transform: scale(1.05);
      transition: all 0.2s ease-in-out;
    }
  }

  .item-info {
    background-color: ${({ theme }) => theme.bg3};
    padding: 16px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .item-name-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .item-name {
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    overflow-wrap: break-word;
    width: 100%;
    /* height: 40px; */
  }

  .item-price {
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    margin-top: 8px;
  }

  .text-align-right {
    text-align: right;
  }

  .item-last-sale {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    margin-top: 4px;
    height: 16px;
    color: ${({ theme }) => theme.primary8};
  }

  .filter-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .checkbox {
    position: absolute;
    right: 20px;
    top: 12px;
    width: 24px;
    height: 24px;
  }
`;
