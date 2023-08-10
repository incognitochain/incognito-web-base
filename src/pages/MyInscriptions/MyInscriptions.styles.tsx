import styled, { css } from 'styled-components/macro';
import { MediaQueryBuilder } from 'theme/mediaQuery';

export const Container = styled.div`
  padding: 0 2rem;
  width: 100%;
  min-height: calc(100vh - 135px);
  overflow: scroll;

  /* background-color: lightseagreen; */

  .book-container {
    display: flex;
    justify-content: flex-end;

    .wrapper-icon {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px 20px;
      margin-bottom: 20px;
      gap: 0.3rem;
      background-color: ${({ theme }) => theme.primary2};
      border-radius: 8px;

      :hover {
        cursor: pointer;
        opacity: 0.8;
        scale: 1.02;
      }

      .text {
        align-self: center;
        font-weight: 500;
        font-size: 1.1rem;
        line-height: 1.2rem;
        white-space: nowrap;
        color: ${({ theme }) => theme.primary5};
      }
    }
  }

  ${MediaQueryBuilder(
    'upToLarge',
    css`
      width: 95%;
    `
  )}
  ${MediaQueryBuilder(
    'upToMedium',
    css`
      width: 100%;
    `
  )}
`;

export const TabContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 2rem;
  width: 100%;
  min-height: calc(100vh - 135px);
  overflow: scroll;

  .nav-tabs {
    padding: 8px;
    border: none;
    display: flex;
    align-self: center;
    /* width: 260px; */
    border-radius: 20px;
    background-color: ${({ theme }) => theme.color_grey2};

    justify-content: center;

    .nav-link {
      opacity: 0.4;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 22px;

      padding: 12px 24px;
      color: #ffffff;

      transition: none;

      &:hover {
        opacity: 0.75;
      }
    }

    .nav-link.active {
      opacity: 1;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 22px;

      border-radius: 40px;
      color: #ffffff;

      padding: 12px 24px;

      transition: none;
      text-decoration: underline;
      text-decoration-color: white;
      text-underline-offset: 5px;
    }

    .title {
      font-weight: 600;
      font-size: 20px;
      line-height: 22px;
    }

    .nav-title {
      text-transform: capitalize;
      font-size: 18px;
    }
  }
`;
