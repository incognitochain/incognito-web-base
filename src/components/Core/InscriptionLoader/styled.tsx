import { Spin } from 'antd';
import styled from 'styled-components/macro';

export const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: auto;
  border-radius: 20px;
  display: flex;

  overflow: hidden;
  background-color: transparent;

  align-items: center;
  justify-content: center;

  &.hover-active {
    :hover {
      cursor: pointer;
      transform: scale(1.02);
      transition-duration: 0.2s;
    }
  }

  &.hover-deactive {
    :hover {
    }
  }

  :hover .card-image {
    background: black;
  }

  :hover .view-icon {
    display: block;
  }

  .card-image {
    background: transparent;
    width: 100%;
    height: 100%;
    padding-top: auto;
    border-radius: 20px;

    .placeholder-image-container {
      padding-top: auto;
      width: 100%;
      height: 100%;
      aspect-ratio: 1 / 1;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgb(5, 15, 10);
      overflow: hidden;
      filter: 50px;

      .placeholder-image {
        width: 80px;
        height: 80px;
        object-fit: contain;
        border-radius: 99999px;
      }
    }

    .image {
      display: flex;
      flex: 1;
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 16px;
      background: rgb(5, 15, 10);
    }

    .iframe {
      display: flex;
      flex: 1;
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 16px;
      background: #ffffff;
      z-index: -1000;

      :-webkit-scrollbar {
        display: none;
      }
    }

    &.blurContent {
      filter: blur(50px);
    }
  }
  .overlay {
    position: absolute;

    z-index: 100;
    padding: 10px;
    inset: 0px;

    place-items: center;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    .infoAreaView {
      position: absolute;
      padding: 5px;
      z-index: 200;

      .infoBlurBackground {
        background-color: black;
        filter: blur(20px);
        width: 20px;
        height: 20px;
      }

      .infoIcon {
        position: absolute;
        bottom: 0;
        margin-bottom: 10px;
        filter: blur(0px) !important;
      }
    }
  }
`;

export const SpinStyled = styled(Spin)`
  .ant-spin-dot-item {
    background-color: white !important;
  }
  .ant-spin-text {
    color: white !important;
    font-size: 16px;
    font-weight: 600;
  }
  &&& {
    position: absolute;
    z-index: 9999;
  }
`;
