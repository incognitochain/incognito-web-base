import styled, { css } from 'styled-components/macro';
import { MediaQueryBuilder } from 'theme/mediaQuery';

export const Container = styled.div`
  padding-bottom: 40px;
  width: 90%;
  min-height: calc(100vh - 135px);
  overflow: scroll;

  background-color: red;

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
