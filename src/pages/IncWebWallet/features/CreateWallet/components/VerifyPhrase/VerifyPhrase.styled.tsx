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
  /* justify-content: center; */
  margin: auto;
  min-height: 55vh;
  width: 55%;

  .mnemonic-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 24px;
  }

  .box {
    min-height: 106px;
    background: ${({ theme }) => theme.color_grey2};
    border-radius: 8px;
    width: 100%;
    padding-left: 100px;
    padding-right: 100px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    align-items: center;
    justify-content: center;
  }

  ${MediaQueryBuilder('upToLarge', MediaLarge)}
  ${MediaQueryBuilder('upToMedium', MediaMeidum)}
  ${MediaQueryBuilder('upToSmall', MediaSmall)}
`;

export const MnemonicItemWrapper = styled.div`
  margin-bottom: 8px;
`;
