import styled from 'styled-components/macro';

import { AlertMessageType } from './AlertMessage';

export const Container = styled.div<{ type: AlertMessageType }>`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  .text-warning {
    margin-left: 8px;
    color: ${({ theme, type }) => {
      switch (type) {
        case AlertMessageType.error:
          return theme.content4;
        case AlertMessageType.success:
          return theme.content3;
        default:
          return theme.primary15;
      }
    }};
  }
`;
