import { Spin } from 'antd';
import styled, { css } from 'styled-components/macro';
import { MediaQueryBuilder } from 'theme/mediaQuery';

export const Container = styled.div`
  flex: 1;
  height: auto;
  display: flex;
  min-height: 400px;
  width: 100%;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.color_grey2};

  .emptyList {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;

    .emptyText {
      font-weight: 500;
      font-size: 20px;
      line-height: 140%;
      color: white;
      text-align: center;
    }
  }
`;

export const InfiniteScrollContainer = styled.div`
  width: 100%;
  overflow: scroll;
  flex-direction: column;

  .gridView {
    min-height: 50vh;
    display: grid;
    flex: 1;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);

    ${MediaQueryBuilder(
      'upToLarge',
      css`
        grid-template-columns: repeat(3, 1fr);
      `
    )}

    ${MediaQueryBuilder(
      'upToMedium',
      css`
        grid-template-columns: repeat(2, 1fr);
      `
    )}
    ${MediaQueryBuilder(
      'upToSmall',
      css`
        grid-template-columns: repeat(1, 1fr);
      `
    )}
  }

  .load-more-loading {
    width: 100%;
    height: 100px;
    margin-top: 30px;
    /* background-color: yellow; */
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const SpinStyled = styled(Spin)`
  .ant-spin-dot-item {
    background-color: white !important;
  }
  .ant-spin-text {
    color: white !important;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const ButtonConfirm = styled.div`
  padding: 15px 25px;
  display: inline-block;
  position: relative;
  align-items: center;
  background-color: ${({ theme }) => theme.primary2};
  border-radius: 8px;
  align-self: center;

  :hover {
    cursor: pointer;
    opacity: 0.8;
    scale: 1.02;
  }

  .text {
    align-self: center;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.75rem;
    width: max-content;
    white-space: nowrap;
    color: ${({ theme }) => theme.primary5};
  }
`;

export const CreateInscriptionNow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 20px;
  gap: 0.3rem;
  background-color: ${({ theme }) => theme.primary2};
  border-radius: 8px;

  align-self: center;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.2rem;
  white-space: nowrap;
  color: white;

  :hover {
    cursor: pointer;
    opacity: 0.8;
    scale: 1.02;
  }
`;
