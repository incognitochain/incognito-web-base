import styled, { css } from 'styled-components/macro';
import { MediaQueryBuilder } from 'theme/mediaQuery';
const MediaLarge = css`
  width: 60%;
  .box {
    padding-left: 100px;
    padding-right: 100px;
  }
`;

const MediaMeidum = css`
  width: 70%;
  .box {
    padding-left: 80px;
    padding-right: 80px;
  }
`;

const MediaSmall = css`
  width: 80%;

  .box {
    padding-left: 60px;
    padding-right: 60px;
  }
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  margin: auto;
  min-height: 55vh;
  width: 55%;

  .box {
    width: 100%;
    margin-top: 16px;
    min-height: 106px;
    padding: 24px;
    background: ${({ theme }) => theme.color_grey2};
    border-radius: 8px;
    position: relative;

    .input-phrase {
      font-weight: 600;
      font-size: 18px;
      line-height: 140%;
      text-align: center;
      width: 100%;
      min-height: 86px;
      padding-top: 28px;
      color: ${({ theme }) => theme.white};
      word-break: break-word;
      background-color: transparent;
      border: none;
      resize: none;
    }
  }

  ${MediaQueryBuilder('upToLarge', MediaLarge)}
  ${MediaQueryBuilder('upToMedium', MediaMeidum)}
  ${MediaQueryBuilder('upToSmall', MediaSmall)}
`;
