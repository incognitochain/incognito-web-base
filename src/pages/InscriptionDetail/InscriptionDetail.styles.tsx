import styled, { css } from 'styled-components/macro';
import { MediaQueryBuilder } from 'theme/mediaQuery';

export const Container = styled.div`
  padding-bottom: 40px;
  width: 90%;
  min-height: calc(100vh - 135px);
  display: flex;
  flex-direction: column;
  justify-content: center;

  .thumbInscription-container {
    display: flex;
    width: 100%;
    max-height: 500px;
    overflow: hidden;
    justify-content: center;
    border-radius: 20px;

    .wrapper-inscription {
      display: flex;
      padding: 20px;
      height: 500px;
      width: 500px;
      justify-content: center;
      align-self: center;
      overflow: hidden;
      border-radius: 20px;

      :hover {
        cursor: pointer;
        transform: scale(1.01);
        transition-duration: 0.2s;
      }
    }
  }

  .bodyInfo {
    padding: 20px;
    margin-top: 30px;
    background-color: #303030;
    border: 0.5px solid white;
    border-radius: 16px;
    width: 70%;
    min-height: 500px;
    align-self: center;

    .bodyTitle {
      flex-direction: row;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      justify-content: space-between;
      margin-bottom: 1.75rem;

      .header {
        font-style: normal;
        font-weight: 500;
        font-size: 1.25rem;
        line-height: 1.75rem;
        color: white;
        text-transform: uppercase;
        letter-spacing: 0.07em;
      }
    }

    .listContent {
      flex-direction: column;
      display: flex;
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

export const SendButton = styled.div`
  padding: 15px 25px;
  display: inline-block;
  position: relative;
  align-items: center;
  background-color: ${({ theme }) => theme.primary2};
  border-radius: 8px;
  align-self: center;

  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.75rem;
  width: max-content;
  white-space: nowrap;
  color: ${({ theme }) => theme.primary5};

  :hover {
    cursor: pointer;
    opacity: 0.8;
    scale: 1.02;
  }
`;
