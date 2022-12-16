import Row from 'components/Core/Row';
import styled from 'styled-components/macro';

const Container = styled.div<{ height: number }>`
  min-height: ${({ height }) => height}px;
  width: 100%;
  padding-bottom: 10px;
  .main-header-text {
    width: 100%;
    font-weight: 600;
    text-align: center;
  }
  .sub-header-text {
    max-width: 527px;
    text-align: center;
    margin-top: 16px;
    margin-left: auto;
    margin-right: auto;
  }
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
`;

const CollectionWrapper = styled(Row)`
  margin-top: 42px;
  display: grid;
  grid-gap: 30px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
  grid-template-columns: repeat(auto-fill, 390px);
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: repeat(auto-fill, calc(100vw - 30px));
  `}
`;

const CollectionItem = styled.div`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  border-radius: 8px;
  padding: 24px;
  aspect-ratio: 390 / 251;
  background-color: ${({ theme }) => theme.color_grey3};
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
    align-self: end;
    max-width: 75%;
    max-height: 100%;
    margin-right: auto;
    margin-left: auto;
  }
  .pnode-image {
    //margin-left: 28px;
    max-width: 100%;
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
