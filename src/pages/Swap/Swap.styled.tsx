import { Col } from 'antd';
import styled, { DefaultTheme } from 'styled-components/macro';

const Container = styled.div`
  display: grid;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 80px;
  grid-template-columns: auto auto;
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    gap: 80px;
  `}
`;

const LeftColumn = styled.div`
  max-width: 570px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  h3 {
    font-weight: 700;
  }
  .pig-image {
    width: 24px;
    height: 24px;
  }
  .arrow-image {
    width: 12px;
    height: 12px;
  }
  .wrap-item {
    margin-top: 47px;
    align-items: center;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }
  .provide-item {
    margin-right: 41px;
  }
  .provide-text {
    margin-left: 8px;
    margin-right: 8px;
    color: ${({ theme }) => theme.btn1};
  }
  .watch-item {
    .h8 {
      margin-left: 8px;
      color: white;
    }
  }
`;

const RightColumn = styled(Col)`
  border: 1px solid ${({ theme }) => theme.border1};
  border-radius: 18px;
  background: ${({ theme }) => theme.bg3};
  width: 575px;
  padding: 24px;
  box-shadow: rgb(116, 116, 116, 0.4) 0px 5px, rgb(116, 116, 116, 0.3) 0px 10px, rgb(116, 116, 116, 0.2) 0px 15px,
    rgb(116, 116, 116, 0.1) 0px 20px, rgb(116, 116, 116, 0.05) 0px 25px;
  min-height: 400px;
  .loader {
    left: 0;
    right: 0;
    margin-right: auto;
    margin-left: auto;
    position: absolute;
  }
  overflow: hidden;
  .wrap-token {
    box-sizing: border-box;
    min-height: 520px;
  }
  .token-main-title {
    background-color: ${({ theme }) => theme.background2};
    height: 72px;
  }
  .token-wrap-item {
    height: 88px;
    align-items: center;
    justify-content: space-between;
    padding-left: 32px;
    padding-right: 32px;
    border-bottom: 1px solid ${({ theme }) => theme.border1};
    // border-right: 1px solid ${({ theme }) => theme.background2};
  }
  .token-wrap-item:last-child {
    border-bottom-width: 0;
  }
  .token-name {
    margin-left: 0;
  }
  .token-wrap-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .token-wrap-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 32px;
    padding-right: 32px;
    height: 56px;
    justify-content: space-between;
  }
  .image-token {
    width: 56px;
    height: 56px;
    border-radius: 28px;
    margin-right: 24px;
  }
  .wrap-first-item {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .medium-text {
    font-size: 22px;
    line-height: 33px;
    letter-spacing: 0.01em;
  }
  .regular-text {
    font-size: 16px;
    line-height: 24px;
  }
  .tab-header-title-left {
    font-weight: 600;
    font-size: 26px;
    line-height: 39px;
    letter-spacing: 0.01em;
  }
  .header-text {
    font-size: 16px;
    line-height: 24px;
  }
  .token-padding {
    padding-left: 32px;
    padding-right: 32px;
  }
  .gradient-view {
    background: linear-gradient(180deg, rgba(26, 26, 26, 0.2) 0%, #1a1a1a 100%);
    height: 88px;
    position: absolute;
    bottom: 0;
    right: 15px;
    width: 100%;
    visibility: hidden;
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
    .wrap-token {
        min-height: 480px;
    }
    .token-wrap-item {
        height: 80px;
    }
    .token-main-title {
      height: 64px;
    }
    .image-token {
        width: 48px;
        height: 48px;
        border-radius: 28px;
        margin-right: 10px;
    }
    .tab-header-title-left {
      font-size: 20px;
      line-height: 30px;
    }
    .tab-header-title-right {
      font-size: 16px;
      line-height: 24px;
    }
    .header-text {
        font-size: 16px;
        line-height: 24px;
    }
    .medium-text {
        font-size: 18px;
        line-height: 27px;
    }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        border-width: 0px;
        .wrap-token {
        }
        .token-wrap-item {
            padding-left: 16px;
            padding-right: 16px;
        }
        .token-wrap-header {
            padding-left: 16px;
            padding-right: 16px;
        }
        .image-token {
            width: 32px;
            height: 32px;
            border-radius: 28px;
            margin-right: 10px;
        }
        .token-main-title {
            height: 59px;
        }
        .medium-text {
            font-size: 14px;
            line-height: 21px;
        }
        .token-padding {
            padding-left: 16px;
            padding-right: 16px;
        }
        .tab-header-title-right {
            padding-top: 4px;
            font-size: 14px;
        }
        .tab-header-title-left {
            font-size: 18px;
        }
        .header-text {
          font-size: 14px;
          line-height: 24px;
        }
          .token-wrap-item:last-child {
            border-bottom-width: 1px;
          }
    `}
`;

export { Container, LeftColumn, RightColumn };
