import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
  padding-bottom: 50px;
  .term-main-title {
    white-space: pre-wrap;
    font-size: 48px;
    line-height: 82px;
    font-weight: 500;
    margin-top: 32px;
  }
  .term-sub-title {
    font-size: 30px;
    line-height: 38px;
    letter-spacing: 0.01em;
    white-space: pre-wrap;
    margin-top: 32px;
  }
  .term-link {
    display: contents;
    width: fit-content;
  }
  .term-content {
    font-size: 16px;
    margin-top: 15px;
  }
  .term-wrap-number-content {
    margin-left: 15px;
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
      .term-main-title {
          white-space: pre-wrap;
          font-weight: 500;
          font-size: 38px;
          line-height: 54px;
          letter-spacing: 0.01em;
      }
      .term-sub-title {
          font-size: 22px;
          line-height: 27px;
          letter-spacing: 0.01em;
      }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
      .term-main-title {
          white-space: initial;
          font-weight: 500;
          font-size: 24px;
          line-height: 44px;
          letter-spacing: 0.01em;
      }
      .term-sub-title {
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0.01em;
          white-space: initial;
          margin-top: 16px;
      }
    `}
`;
