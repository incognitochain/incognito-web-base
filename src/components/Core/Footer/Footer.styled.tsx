import { Row } from 'antd';
import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled(Row)`
  width: 100%;
  padding-bottom: 25px;
  padding-top: 25px;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.border1};
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
    font-size: 18px;
    line-height: 30px;
    letter-spacing: 0.005em;
    color: ${({ theme }) => theme.text1};
  }
  .default-margin-left {
    margin-left: 24px;
  }
  .button-text {
    cursor: pointer;
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
      font-size: 16px;
      line-height: 24px;
    }
    .wrap-branch {
      width: 100%;
    }
  `}
`;
