import { Row } from 'antd';
import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled(Row)`
  width: 100%;
  padding-bottom: 12px;
  padding-top: 12px;
  justify-content: space-between;
  // border-top: 1px solid ${({ theme }) => theme.border1};
  .wrap-social {
    flex-direction: row;
    align-items: flex-start;
    button :hover {
      opacity: 0.8;
    }
  }
  .normal-label {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 120%;
    letter-spacing: 0.005em;
    color: ${({ theme }) => theme.text2};
  }
  .default-margin-left {
    margin-left: 24px;
  }
  .button-text {
    cursor: pointer;
  }
  .center-view-desktop {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    width: fit-content;
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    .default-margin-left {
      margin-left: 0px;
    }
    .wrap-social {
      flex-direction: column;
      margin-top: 16px;
      width: 50%;
    }
    .normal-label {
      margin-bottom: 4px;    
    }
    .wrap-branch {
      width: 100%;
    }
  `}
`;
