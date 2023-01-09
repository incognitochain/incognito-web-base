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

const ListStyled = styled.div`
  margin-top: 8px;
  tr {
    height: 80px !important;
  }
  .logo {
    width: 64px;
    height: 64px;
    border-radius: 8px;
    object-fit: cover;
  }
  .baseText {
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
  }
  .smallText {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #757575;
  }
  table {
  }
  .ant-table-column-sorter {
    display: none;
  }

  .ant-table-column-title {
    font-weight: 500;
    font-size: 18px;
    line-height: 140%;
    color: #757575;
  }

  td.ant-table-column-sort {
    background: transparent;
  }

  ant-spin-blur {
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
    color: #757575;
    padding: 0px 32px;
    height: 64px;
  }

  .headerTitle {
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    color: #9c9c9c;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .ant-table-tbody > tr > td {
    border-bottom: 0px;
  }

  .ant-table-container .ant-table-content table .ant-table-thead tr th:first-child {
    border-top-left-radius: 16px !important;
  }

  .ant-table-container .ant-table-content table .ant-table-thead tr th:last-child {
    border-top-right-radius: 16px;
  }
  .ant-table-tbody > tr > td {
    padding: 0px 32px;
  }

  .ant-table-tbody > tr.ant-table-placeholder:hover > td {
    background-color: ${({ theme }) => theme.background1};
  }

  .poolContainer {
    display: flex;
    width: fit-content;
    align-items: center;
  }

  .text-owner {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: #9c9c9c;
    text-align: center;
  }

  ${({ theme }) => theme.mediaWidth.upToLarge`
    .tableRow {
      height: 56px;
    }
    .baseText {
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      color: #ffffff;
    }
    .ant-table-thead > tr > th {
      height: 56px;
    }
  `}

  ${({ theme }) => theme.mediaWidth.upToMedium`
    .poolContainer {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .tableRow {
      height: 72px;
    }
  `}

  ${({ theme }) => theme.mediaWidth.upToSmall`
    .ant-table-tbody > tr > td {
      border-bottom: 1px solid #363636;
    }
    .ant-table-thead > tr > th {
      font-weight: 500;
      font-size: 16px;
      height: 40px;
    }
  `}
`;

const Container = styled.div`
  padding-bottom: 40px;
  width: 100%;
  min-height: 1000px;
`;

export { Container, ContentStyled, InfoStyled, ListStyled };
