import { memo } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
export const Styled = styled.div`
  height: 140px;

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
     height: 100px;
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
      height: 60px;
  `};
`;

const SpaceView = () => {
  return <Styled />;
};

export default memo(SpaceView);
