import Row from 'components/Core/Row';
import styled from 'styled-components/macro';

const Container = styled.div<{ height: number }>`
  min-height: ${({ height }) => height}px;
  margin-top: -25px;
  width: 100%;
  padding-bottom: 10px;
  background-repeat: no-repeat;
  background-size: contain;
  border: inset 14px transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .main-header-text {
    width: 100%;
    font-weight: 600;
    text-align: center;
  }
  .sub-header-text {
    max-width: 653px;
    text-align: center;
    font-weight: 400;
    font-size: 20px;
    margin-top: 16px;
    margin-left: auto;
    margin-right: auto;
  }
  .modal-video {
    background-color: rgba(0, 0, 0, 0.7);
  }
  .section-1 {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .section-2 {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  ${({ theme }) => theme.mediaWidth.upToLarge`
    display: unset;
    .section-1 {
      display: unset;
    }
    .section-2 {
      display: unset;
    }
  `}
`;

const ButtonWrapper = styled(Row)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .btn-buy {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 14px 24px;
    width: 156px;
    height: 50px;
    border-radius: 8px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.btn1};
    color: ${({ theme }) => theme.color_white};
    :hover {
      opacity: 0.8;
    }
  }
  .btn-watch {
    margin-left: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    width: 143px;
    height: 24px;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }
  .text-watch {
    color: ${({ theme }) => theme.color_white};
    margin-left: 8px;
  }
  iframe {
    border-radius: 16px;
  }
  .modal-video-movie-wrap {
    background-color: transparent;
  }
  .modal-video-close-btn {
    display: none;
  }
  .modal-video-body {
    max-width: 1200px;
  }
`;

const CollectionWrapper = styled(Row)`
  display: grid;
  grid-gap: 30px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
  grid-template-columns: repeat(auto-fill, 390px);
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: repeat(auto-fill, calc((100vw / 2) - 80px));
  `}
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: repeat(auto-fill, calc(100vw - 30px));
  `}
`;

const CollectionItem = styled.div`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  border-radius: 16px;
  padding: 24px;
  aspect-ratio: 390 / 320;
  background-color: ${({ theme }) => theme.color_grey2};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .header {
    //margin-right: 24px;
    //margin-left: 28px;
  }
  .sub-header {
    margin-top: 8px;
  }
  h6 {
    color: ${({ theme }) => theme.primary13};
    font-weight: 700;
  }
  .swap-image {
    //align-self: end;
    max-width: 100%;
    max-height: 100%;
    margin-right: auto;
    margin-left: auto;
  }
  .pnode-image {
    //margin-left: 28px;
    max-width: 70%;
    max-height: 100%;
    margin-right: auto;
    margin-left: auto;
  }
  .dapps-image {
    //margin-left: 44px;
    //max-width: calc(100% - 44px);
    max-width: 90%;
    max-height: 100%;
    margin-right: auto;
    margin-left: auto;
  }
`;

export { ButtonWrapper, CollectionItem, CollectionWrapper, Container };
