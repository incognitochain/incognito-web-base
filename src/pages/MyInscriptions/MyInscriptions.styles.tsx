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
