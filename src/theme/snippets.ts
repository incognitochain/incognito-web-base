import { css, FlattenSimpleInterpolation } from 'styled-components/macro';

import { Theme } from './Theme.styled';

export interface SnippetsTheme extends Theme {
  flexColumnNoWrap: FlattenSimpleInterpolation;
  flexRowNoWrap: FlattenSimpleInterpolation;
}

export const SnippetsInit: SnippetsTheme = {
  flexColumnNoWrap: css`
    display: flex;
    flex-flow: column nowrap;
  `,
  flexRowNoWrap: css`
    display: flex;
    flex-flow: row nowrap;
  `,
};
