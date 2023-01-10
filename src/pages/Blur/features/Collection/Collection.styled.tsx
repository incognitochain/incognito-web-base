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
`;

const ListStyled = styled.div<{ showLoader: boolean }>`
  margin-top: 8px;
  .table {
    opacity: ${({ showLoader }) => (showLoader ? 0 : 1)};
    transition: all 800ms ease-in-out;
  }
  tr {
    height: 80px !important;
  }
  .logo {
    width: 55px;
    height: 55px;
    border-radius: 8px;
    object-fit: cover;
  }
  .ant-table-column-sorter {
    display: none;
  }

  .ant-table-column-title {
    font-weight: 500;
    line-height: 140%;
    color: ${({ theme }) => theme.color_grey4};
  }

  td.ant-table-column-sort {
    background: transparent;
  }

  .ant-spin-blur {
    border-radius: 16px;
    opacity: 1;
  }
  .tableRow {
    height: 64px;
  }
  .tableRow:hover td {
    cursor: pointer;
    background: #252525 !important;
  }

  .ant-table {
    background: transparent;
    font-size: 18px;
    font-weight: 500;
  }
  .ant-table-wrapper {
    border-radius: 33px;
  }
  .ant-table-thead > tr > th {
    border-bottom: 0px;
    background: transparent;
    font-weight: 500;
    font-size: 18px;
    line-height: 140%;
    color: ${({ theme }) => theme.color_grey4};
    padding: 0 6px;
    height: 64px;
  }

  .baseText {
    font-size: 16px;
    line-height: 140%;
  }
  .currency-logo {
    width: 24px;
  }
  .shadow-text {
    color: ${({ theme }) => theme.color_grey};
    padding-right: 16px;
  }

  .headerTitle {
    flex: 1;
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    color: ${({ theme }) => theme.color_grey};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: center;
  }

  .name-text {
    margin-left: 12px;
    max-width: 200px;
  }

  .ant-table-tbody > tr > td {
    border-bottom: 0;
  }

  .ant-table-container .ant-table-content table .ant-table-thead tr th:first-child {
    border-top-left-radius: 16px !important;
  }

  .ant-table-container .ant-table-content table .ant-table-thead tr th:last-child {
    border-top-right-radius: 16px;
  }
  .ant-table-tbody > tr > td {
    padding: 0 6px;
  }

  .ant-table-tbody > tr.ant-table-placeholder:hover > td {
    background-color: ${({ theme }) => theme.background1};
  }

  .name-container {
    display: flex;
    width: fit-content;
    align-items: center;
  }

  .text-owner {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: ${({ theme }) => theme.color_grey};
    text-align: center;
  }

  ${({ theme }) => theme.mediaWidth.upToLarge`
    .tableRow {
      height: 56px;
    }
    .ant-table-thead > tr > th {
      height: 56px;
    }
  `}
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

export { Container, ContentStyled, InfoStyled, ListStyled };
