import styled from 'styled-components/macro';

const InfoStyled = styled.div`
  margin-bottom: 24px;
  .titleView {
    display: flex;
    flex-direction: column;
    .title-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title-custom {
        text-align: center;
        align-self: center;
        font-weight: 700;
      }
      .description-custom {
        width: 60%;
        margin-top: 24px;
        text-align: center;
        align-self: center;
        color: ${({ theme }) => theme.color_grey};
      }
    }
  }
`;

const ContentStyled = styled.div`
  min-height: 90vh;
  .header-row {
    padding: 20px 0;
    border-bottom: 1px solid ${({ theme }) => theme.color_grey4};
  }
`;

const ContainerListStyled = styled.div`
  margin-top: 24px;
`;

const Container = styled.div`
  padding-bottom: 40px;
  width: 100%;
  min-height: 1000px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    .default-max-width {
      max-width: 95%;
    }
  `}
`;

const ListStyled = styled.div<{ showLoader: boolean }>`
  opacity: ${({ showLoader }) => (showLoader ? 0 : 1)};
  transition: all 600ms ease-in-out;
  display: flex;
  flex-direction: column;
`;

const CollectionItem = styled.div<{ effectHover: boolean }>`
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;
  padding-top: 16px;
  box-sizing: border-box;
  cursor: ${({ effectHover }) => (effectHover ? 'pointer' : 'unset')};
  flex: 1;
  border-radius: 8px;
  :hover {
    background-color: ${({ theme, effectHover }) => (effectHover ? theme.bg3 : 'transparent')};
  }
  .wrap-index {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 8px;
    p {
      width: 60px;
      text-align: center;
    }
  }
  .wrap-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 4px;
    width: calc(100% / 5) !important;
  }
  .wrap-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 4px;
    width: calc(100% / 5) !important;
  }
  .align-end {
    justify-content: center;
  }
  .content-label {
    font-size: 16px;
    line-height: 140%;
    font-weight: 600;
  }
  .header-label {
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    color: ${({ theme }) => theme.color_grey};
  }
  .header-index-label {
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    color: ${({ theme }) => theme.color_grey};
  }
  .logo {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    object-fit: cover;
  }
  .currency-logo {
    width: 24px;
  }
  .shadow-text {
    color: ${({ theme }) => theme.color_grey};
    padding-right: 16px;
  }
  .wrap-name {
    display: flex;
    align-items: center;
    flex: 1;
    .name {
      margin-left: 16px;
      width: 220px;
      text-align: left;
    }
    .header-name {
      width: 220px;
      text-align: left;
      color: ${({ theme }) => theme.color_grey};
    }
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    .medium-hide {
      display: none;
    }
  `}

  ${({ theme }) => theme.mediaWidth.upToSmall`
    .medium-hide {
      display: none;
    }
    .header-label {
      display: none;
    }
    .wrap-item {
      display: none;
    }
  `}
`;

export { CollectionItem, Container, ContainerListStyled, ContentStyled, InfoStyled, ListStyled };
