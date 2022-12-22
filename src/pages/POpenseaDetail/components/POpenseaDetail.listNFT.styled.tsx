import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 60px;

  .list {
    margin-top: 30px;
  }

  .list-item {
    background-color: ${({ theme }) => theme.bg4};
    border-radius: 16px;
    width: 285px;
  }

  .item-img {
    width: 285px;
    height: 285px;
    object-fit: contain;
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
    align-items: center;
  }

  .item-name {
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
  }

  .item-id {
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    text-align: right;
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

  .search-container {
    display: flex;
    justify-content: right;
    flex: 0.6;
    height: 50px;
  }

  .input-container {
    all: unset;
    position: relative;
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    border-width: 1px;
    width: 60%;

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
  }

  .sort-container {
    display: flex;
    justify-content: right;
    height: 50px;
  }

  .sort-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 16px;
    height: 50px;
    width: 40%;
    padding-left: 16px;
    padding-right: 16px;
    background-color: ${({ theme }) => theme.bg3};
    border-radius: 8px;
    border-width: 1px;

    :hover {
      border: 1px solid ${({ theme }) => theme.border5};
    }

    :focus {
      border: 1px solid ${({ theme }) => theme.border5};
      color: ${({ theme }) => theme.primary5};
    }
  }

  .sort-text {
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    margin-right: 16px;
  }

  .sort-menu {
    background-color: ${({ theme }) => theme.bg3};
    border-radius: 8px;
    display: flex;
    padding-left: 16px;
  }

  .sort-item {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
      .filter-container {
        flex-direction: column;
        justify-content: left;
      }

      .search-container {
        flex-direction: column;
        flex: 1;
        width: 80%;
      }

      .input-container {
        width: 100%;
        margin-top: 16px;
      }

      .sort-button {
        margin-top: 16px;
        width: 100%;
      }

    `}
`;

export const TextInputStyled = styled.input`
  display: flex;
  flex: 1;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
`;
