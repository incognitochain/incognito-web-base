import styled, { css } from 'styled-components/macro';
import { MediaQueryBuilder } from 'theme/mediaQuery';

const MediaLarge = css`
  width: 60%;
`;

const MediaMeidum = css`
  width: 70%;
`;

const MediaSmall = css`
  width: 80%;
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  /* justify-content: center; */
  margin-top: 80px;
  margin: auto;
  min-height: 15vh;
  width: 55%;

  .box {
    display: flex;
    width: 100%;
    min-height: 106px;
    background: ${({ theme }) => theme.color_grey2};
    border-radius: 8px;
    padding: 20px;
    position: relative;
    align-items: center;
    justify-content: center;

    .overlay {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.98;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${({ theme }) => theme.colors.gray_757575};
      backdrop-filter: blur(1px);
      border-radius: 8px;
    }
  }

  ${MediaQueryBuilder('upToLarge', MediaLarge)}
  ${MediaQueryBuilder('upToMedium', MediaMeidum)}
  ${MediaQueryBuilder('upToSmall', MediaSmall)}
`;
