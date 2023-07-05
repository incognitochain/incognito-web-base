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
  min-height: 65vh;
  width: 55%;

  .box {
    width: 100%;
    min-height: 106px;
    padding: 24px 40px;
    background: ${({ theme }) => theme.color_grey2};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  ${MediaQueryBuilder('upToLarge', MediaLarge)}
  ${MediaQueryBuilder('upToMedium', MediaMeidum)}
  ${MediaQueryBuilder('upToSmall', MediaSmall)}
`;
