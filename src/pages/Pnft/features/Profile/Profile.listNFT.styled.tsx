import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
  width: 100%;

  .list {
    margin-top: 32px;
  }

  .total-container {
    display: flex;
    flex-direction: row;
    width: 25%;
  }

  .total-items {
    font-weight: 700;
    font-size: 28px;
    line-height: 140%;
  }

  .total-number {
    font-weight: 700;
    font-size: 28px;
    line-height: 140%;
    color: ${({ theme }) => theme.text2};
    margin-left: 16px;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
      margin-top: 16px;
      
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToExtraSmall`
      margin-top: 0px;

  `}
`;
