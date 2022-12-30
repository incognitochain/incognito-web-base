import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import arrowBottomActive from 'assets/svg/arrow-bottom-active.svg';
import arrowDisable from 'assets/svg/arrow-disable.svg';
import arrowTopActive from 'assets/svg/arrow-top-active.svg';
import ImagePlaceholder from 'components/ImagePlaceholder';
import { POpenseaCollection } from 'models/model/POpenseaCollection';
import React from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

import POpenseaListCollectionLoader from './POpensea.listCollection.loader';

const Styled = styled.div`
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

interface POpenseaListCollectionProps {
  isFetching: boolean;
  collections: POpenseaCollection[];
  onClickItem: (item: POpenseaCollection) => void;
  onEndReach?: () => void;
}

const POpenseaListCollection = (props: POpenseaListCollectionProps) => {
  const { isFetching, collections, onClickItem } = props;

  const getIconUrl = (url: string) => {
    return url;
  };

  const columns: ColumnsType<POpenseaCollection> = [
    {
      key: 'index',
      render: (text, record, index) => (
        <p key={index.toString()} className="baseText">
          {index + 1}
        </p>
      ),
      responsive: ['md'],
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'left' }}>
          #
        </div>
      ),
    },
    {
      dataIndex: 'collection',
      key: 'collection',
      render: (text, record: POpenseaCollection, index) => (
        <div key={index.toString()} className="poolContainer">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ImagePlaceholder className="logo" src={getIconUrl(record.imageUrl || '')} />
            <p className="baseText" style={{ marginLeft: 24 }}>
              {record.name}
            </p>
          </div>
        </div>
      ),
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'left' }}>
          Collection
        </div>
      ),
    },
    {
      dataIndex: 'Volumn',
      key: 'volumn',
      responsive: ['md'],
      align: 'center',
      showSorterTooltip: false,
      render: (text, record, index) => (
        <p key={index.toString()} className="baseText">
          {record.getOndayVolumnFormatAmount()} ETH
        </p>
      ),
      sorter: (a, b) => (a.stats?.oneDayVolume || 0) - (b.stats?.oneDayVolume || 0),
      // eslint-disable-next-line react/prop-types
      title: ({ sortColumns }) => {
        // eslint-disable-next-line react/prop-types
        const sortedColumn = sortColumns?.find(({ column }) => column.key === 'volumn');
        return (
          <div className="headerTitle" style={{ justifyContent: 'center' }}>
            Volume
            {sortedColumn ? (
              sortedColumn.order === 'ascend' ? (
                <img alt="" src={arrowBottomActive} style={{ marginLeft: 6, marginRight: 0 }} />
              ) : sortedColumn?.order === 'descend' ? (
                <img alt="" src={arrowTopActive} style={{ marginLeft: 6, marginRight: 0 }} />
              ) : (
                <img alt="" src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
              )
            ) : (
              <img alt="" src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
            )}
          </div>
        );
      },
    },
    {
      dataIndex: 'Change',
      key: 'Change',
      responsive: ['md'],
      align: 'center',
      showSorterTooltip: false,
      render: (text, record, index) => {
        const isPositive = record.stats && record.stats.oneDayDifference && record.stats.oneDayDifference > 0;
        return (
          <p
            key={index.toString()}
            className="baseText"
            style={{
              color:
                record.stats && record.stats.oneDayDifference
                  ? record.stats.oneDayDifference > 0
                    ? '#0ECB81'
                    : '#FD4040'
                  : 'gray',
            }}
          >
            {isPositive && '+'}
            {(record.stats?.oneDayDifference || 0).toFixed(0)}%
          </p>
        );
      },
      sorter: (a, b) => (a.stats?.oneDayDifference || 0) - (b.stats?.oneDayDifference || 0),
      // eslint-disable-next-line react/prop-types
      title: ({ sortColumns }) => {
        // eslint-disable-next-line react/prop-types
        const sortedColumn = sortColumns?.find(({ column }) => column.key === 'volumn');
        return (
          <div className="headerTitle" style={{ justifyContent: 'center' }}>
            % Change
            {sortedColumn ? (
              sortedColumn.order === 'ascend' ? (
                <img alt="" src={arrowBottomActive} style={{ marginLeft: 6, marginRight: 0 }} />
              ) : sortedColumn?.order === 'descend' ? (
                <img alt="" src={arrowTopActive} style={{ marginLeft: 6, marginRight: 0 }} />
              ) : (
                <img alt="" src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
              )
            ) : (
              <img alt="" src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
            )}
          </div>
        );
      },
    },
    {
      dataIndex: 'Floorprice',
      key: 'floorprice',
      responsive: ['md'],
      align: 'center',
      showSorterTooltip: false,
      render: (text, record, index) => (
        <p key={index.toString()} className="baseText">
          {record.stats?.floorPrice?.toFixed(2)} ETH
        </p>
      ),
      sorter: (a, b) => (a.stats?.floorPrice || 0) - (b.stats?.floorPrice || 0),
      // eslint-disable-next-line react/prop-types
      title: ({ sortColumns }) => {
        // eslint-disable-next-line react/prop-types
        const sortedColumn = sortColumns?.find(({ column }) => column.key === 'floorprice');
        return (
          <div className="headerTitle" style={{ justifyContent: 'center' }}>
            Floorprice
            {sortedColumn ? (
              sortedColumn.order === 'ascend' ? (
                <img alt="" src={arrowBottomActive} style={{ marginLeft: 6, marginRight: 0 }} />
              ) : sortedColumn?.order === 'descend' ? (
                <img alt="" src={arrowTopActive} style={{ marginLeft: 6, marginRight: 0 }} />
              ) : (
                <img alt="" src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
              )
            ) : (
              <img alt="" src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
            )}
          </div>
        );
      },
    },
    {
      dataIndex: 'Sales',
      key: 'totalsales',
      responsive: ['md'],
      align: 'center',
      showSorterTooltip: false,
      render: (text, record, index) => (
        <p key={index.toString()} className="baseText">
          {record.stats?.totalSales}
        </p>
      ),
      sorter: (a, b) => (a.stats?.totalSales || 0) - (b.stats?.totalSales || 0),
      // eslint-disable-next-line react/prop-types
      title: ({ sortColumns }) => {
        // eslint-disable-next-line react/prop-types
        const sortedColumn = sortColumns?.find(({ column }) => column.key === 'totalsales');
        return (
          <div className="headerTitle" style={{ justifyContent: 'center' }}>
            Sales
            {sortedColumn ? (
              sortedColumn.order === 'ascend' ? (
                <img alt="" src={arrowBottomActive} style={{ marginLeft: 6, marginRight: 0 }} />
              ) : sortedColumn?.order === 'descend' ? (
                <img alt="" src={arrowTopActive} style={{ marginLeft: 6, marginRight: 0 }} />
              ) : (
                <img alt="" src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
              )
            ) : (
              <img alt="" src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
            )}
          </div>
        );
      },
    },
    // {
    //   dataIndex: 'Unique Owners',
    //   key: 'unique_owners',
    //   responsive: ['md'],
    //   align: 'center',
    //   showSorterTooltip: false,
    //   render: (text, record, index) => {
    //     const stats = record.stats;
    //     return (
    //       <div>
    //         <p key={index.toString()} className="baseText">
    //           {Math.round(
    //             stats && stats.totalSupply && stats.numOwners ? (stats.numOwners / stats.totalSupply) * 100 : 0
    //           )}
    //           %
    //         </p>
    //         <p className="text-owner">{stats?.numOwners} owners</p>
    //       </div>
    //     );
    //   },
    //   sorter: (a, b) =>
    //     (((a.stats?.numOwners || 0) / (a.stats?.totalSupply || 1)) * 100 || 0) -
    //     (((b.stats?.numOwners || 0) / (b.stats?.totalSupply || 1)) * 100 || 0),
    //   // eslint-disable-next-line react/prop-types
    //   title: ({ sortColumns }) => {
    //     // eslint-disable-next-line react/prop-types
    //     const sortedColumn = sortColumns?.find(({ column }) => column.key === 'unique_owners');
    //     return (
    //       <div className="headerTitle" style={{ justifyContent: 'center' }}>
    //         % Unique Owners
    //         {sortedColumn ? (
    //           sortedColumn.order === 'ascend' ? (
    //             <img alt="" src={arrowBottomActive} style={{ marginLeft: 6, marginRight: 0 }} />
    //           ) : sortedColumn?.order === 'descend' ? (
    //             <img alt="" src={arrowTopActive} style={{ marginLeft: 6, marginRight: 0 }} />
    //           ) : (
    //             <img alt="" src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
    //           )
    //         ) : (
    //           <img alt="" src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
    //         )}
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <Styled>
      {isFetching && collections.length <= 0 ? (
        <POpenseaListCollectionLoader />
      ) : (
        <Table
          columns={columns}
          dataSource={collections}
          size="large"
          // loading={isFetching && collections.length === 0}
          pagination={false}
          rowClassName="tableRow"
          onRow={(collection) => ({
            onClick: () => {
              onClickItem(collection);
            },
          })}
        />
      )}
    </Styled>
  );
};

export default React.memo(POpenseaListCollection);
