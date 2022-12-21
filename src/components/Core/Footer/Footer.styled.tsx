import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
  width: 100%;
  padding-bottom: 15px;
  padding-top: 15px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
  // border-top: 1px solid ${({ theme }) => theme.border1};
  .wrap-social {
    flex-direction: row;
    align-items: flex-start;
    button :hover {
      opacity: 0.8;
    }
  }
  .wrap-term {
    flex-direction: row;
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
    margin-left: 12px;
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
  img {
    width: 26px;
    height: 26px;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: start;
    .default-margin-left {
      margin-left: 0px;
      margin-right: 12px;
    }
    .wrap-social {
      // flex-direction: column;
      // margin-top: 12px;
      // width: 50%;
      margin-top: 12px
    }
    .normal-label {
      margin-bottom: 4px;    
      margin-top: 4px;    
      font-size: 14px;
    }
    .wrap-branch {
      width: 100%;
    }
    .wrap-term {
      flex-direction: column;
      margin-top: 12px;
      button {
        text-align: left;
        margin-top: 4px;
      }
    }
  `}
`;
