import styled, { css } from 'styled-components/macro';
import { MediaQueryBuilder } from 'theme/mediaQuery';

const MediaQueryLarge = css`
  width: 60%;
`;

const MediaQueryMeidum = css`
  width: 70%;
`;

const MediaQuerySmall = css`
  width: 80%;
`;
export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  margin: auto;
  margin-bottom: 20px;
  width: 55%;

  ${MediaQueryBuilder('upToLarge', MediaQueryLarge)}
  ${MediaQueryBuilder('upToMedium', MediaQueryMeidum)}
  ${MediaQueryBuilder('upToSmall', MediaQuerySmall)}
`;
