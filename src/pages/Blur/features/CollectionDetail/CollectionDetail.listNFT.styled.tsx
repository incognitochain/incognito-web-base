import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
  margin-top: 32px;

  .list {
    margin-top: 16px;
  }

  .card {
    width: 100%;
    height: auto;
    background-color: ${({ theme }) => theme.bg3};
    border-radius: 16px;
    margin-top: 14px;
    cursor: pointer;
  }

  .item-img {
    width: 100%;
    aspect-ratio: 1 / 1;
    height: auto;
    object-fit: cover;
    background-color: ${({ theme }) => theme.bg4};
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
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
    font-size: 18px;
    line-height: 140%;
    margin-top: 8px;
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

  .total-container {
    display: flex;
    flex-direction: row;
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
