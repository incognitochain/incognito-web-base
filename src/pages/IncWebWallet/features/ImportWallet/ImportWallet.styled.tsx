import styled from 'styled-components/macro';

export const Styled = styled.div<{ height: number }>`
  width: 100%;
  min-height: ${({ height }) => height}px;
`;
