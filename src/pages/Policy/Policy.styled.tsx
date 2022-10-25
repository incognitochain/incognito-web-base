import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
  padding-bottom: 50px;
  .policy-main-title {
    white-space: pre-wrap;
    font-size: 48px;
    line-height: 82px;
    font-weight: 500;
    margin-top: 32px;
  }
  .policy-sub-title {
    font-size: 30px;
    line-height: 38px;
    letter-spacing: 0.01em;
    white-space: pre-wrap;
    margin-top: 32px;
  }
  .policy-link {
    display: contents;
    width: fit-content;
  }
  .policy-content {
    font-size: 16px;
    margin-top: 15px;
  }
  .policy-wrap-number-content {
    margin-left: 15px;
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
      .policy-main-title {
          white-space: pre-wrap;
          font-weight: 500;
          font-size: 38px;
          line-height: 54px;
          letter-spacing: 0.01em;
      }
      .policy-sub-title {
          font-size: 22px;
          line-height: 27px;
          letter-spacing: 0.01em;
      }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
      .policy-main-title {
          white-space: initial;
          font-weight: 500;
          font-size: 24px;
          line-height: 44px;
          letter-spacing: 0.01em;
      }
      .policy-sub-title {
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0.01em;
          white-space: initial;
          margin-top: 16px;
      }
    `}
`;
