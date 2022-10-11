import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
  .row {
    display: flex;
    align-items: center;
    flex-direction: row;

    .left {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;

      .animation-container {
        position: absolute;
        align-content: center;
        align-self: center;
        max-width: 860px;
        max-height: 860px;
        z-index: 0;
      }
      .image-wrapper {
        z-index: 1;
        width: 100%;
        height: auto;
      }
      .image-container {
        width: 100%;
        height: auto;
      }
    }

    .space {
      width: 80px;
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      flex: 1;

      .description-container {
        margin-top: 25px;
        margin-bottom: 40px;
      }
      .row-section-head {
        display: flex;
        flex-direction: row;
        align-self: baseline;
        flex-wrap: wrap;
        .space {
          width: 8px;
        }
      }

      .title {
        width: 100%;
      }

      .description {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.01em;
        white-space: initial;
        margin-top: 16px;
      }

      .row-button {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-self: baseline;

        .more-detail-title {
          color: #ffffff;
          margin-left: 40px;
          align-self: inherit;
          white-space: initial;
          cursor: pointer;
        }
      }
    }

    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
      .right .row-section-head {
        .section-head1 {
          margin-top: -12px;
        }
      }
    `}

    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
      flex-direction: column;
      .space {
        height: 50px;
      }
      
      .right .description-container {
        margin-top: 16px;
        margin-bottom: 32px;
      }
      .right .row-button {
        margin-top: 10px;
      }
      .right .row-button .btn-become-validator {
        font-size: 16px;
      }
    
      .right .description-container {
        margin-top: 16px;
        margin-bottom: 20px;
      }

      .right .row-section-head {
        .section-head1 {
          margin-top: -12px;
        }
        .space {
          width: 8px;
        }
      }

      .left .animation-container {
        max-width: 350px;
        max-height: 350px;
      }
      .left .image-container {
        max-width: 350px;
        max-height: 350px;
      }
      .left .image-container-1 {
        max-width: 350px;
        max-height: 350px;
      }
    `}
  }
`;
