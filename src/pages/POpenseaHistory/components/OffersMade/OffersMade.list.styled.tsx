import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
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

  .request-tx {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .status-text {
    text-transform: capitalize;
  }

  .text-align-center {
    text-align: center;
  }

  .offer-container {
    display: flex;
    width: fit-content;
    align-items: center;
    cursor: pointer;
  }

  .cancel-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 14px 24px;
    gap: 10px;
    width: 82px;
    height: 40px;
    background: #ffffff;
    border-radius: 8px;
    cursor: pointer;
  }

  .cancel-txt {
    font-weight: 500;
    font-size: 15px;
    line-height: 140%;
    text-align: center;

    color: #1a73e8;
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
    /* cursor: pointer; */
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

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
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

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    .poolContainer {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .tableRow {
      height: 72px;
    }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
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
