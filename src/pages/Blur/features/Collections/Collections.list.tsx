import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ColumnTitleProps, ColumnType, SortOrder } from 'antd/es/table/interface';
import arrowBottomActive from 'assets/svg/arrow-bottom-active.svg';
import arrowDisable from 'assets/svg/arrow-disable.svg';
import arrowTopActive from 'assets/svg/arrow-top-active.svg';
import ImagePlaceholder from 'components/ImagePlaceholder';
import { ICollection } from 'pages/Blur';
import React from 'react';

import CollectionLoader from './Collection.loader';
import { ListStyled } from './Collection.styled';

interface IListProps {
  isFetching: boolean;
  collections: ICollection[];
  onClickItem: (item: ICollection) => void;
  onEndReach?: () => void;
}

interface ITbHeader {
  sortColumns?: {
    column: ColumnType<ICollection>;
    order: SortOrder;
  }[];
  title: string;
  key?: string;
}

const List = (props: IListProps) => {
  const { isFetching, collections, onClickItem } = props;

  const renderSortableTitle = ({ sortColumns, title, key }: ITbHeader) => {
    const sortedColumn = sortColumns?.find(({ column }: any) => column.key === key);
    return (
      <div className="headerTitle" style={{ justifyContent: 'center' }}>
        {title}
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
  };

  const columns: ColumnsType<ICollection> = [
    {
      key: 'index',
      render: (text, record, index) => (
        <p key={index.toString()} className="baseText" style={{ width: 30 }}>
          {index + 1}
        </p>
      ),
      responsive: ['md'],
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center', width: 30 }}>
          #
        </div>
      ),
    },
    {
      dataIndex: 'name',
      key: 'name',
      render: (text, record: ICollection, index) => (
        <div key={index.toString()} className="name-container">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ImagePlaceholder className="logo" src={record.imageUrl} />
            <p className="baseText" style={{ marginLeft: 12 }}>
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
      dataIndex: 'floorprice',
      key: 'floorprice',
      responsive: ['md'],
      align: 'center',
      showSorterTooltip: false,
      render: (text, record, index) => {
        return <p>{`${record.floorPrice.amountFormated}`}</p>;
      },
      sorter: (a, b) => (a.floorPrice.amountNum || 0) - (b.floorPrice.amountNum || 0),
      title: ({ sortColumns }: ColumnTitleProps<ICollection>) => {
        return renderSortableTitle({ sortColumns, title: 'Floor Price', key: 'floorprice' });
      },
    },
    {
      dataIndex: 'topbid',
      key: 'topbid',
      responsive: ['md'],
      align: 'center',
      render: (text, record, index) => {
        return <p>{`${record.bestCollectionBid.amountFormated}`}</p>;
      },
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          Top BID
        </div>
      ),
    },
    {
      dataIndex: '1dchange',
      key: '1dchange',
      responsive: ['md'],
      align: 'center',
      showSorterTooltip: false,
      render: (_, record, index) => {
        const text = Number.isFinite(record.dayChangeNumb) ? `${record.dayChange}%` : '-';
        return <p>{text}</p>;
      },
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          1D Change
        </div>
      ),
    },
    {
      dataIndex: '7dchange',
      key: '7dchange',
      responsive: ['md'],
      align: 'center',
      showSorterTooltip: false,
      render: (_, record, index) => {
        const text = Number.isFinite(record.weekChangeNumb) ? `${record.weekChange}%` : '-';
        return <p>{text}</p>;
      },
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          7D Change
        </div>
      ),
    },
    {
      dataIndex: '15mvolume',
      key: '15mvolume',
      responsive: ['md'],
      align: 'center',
      showSorterTooltip: false,
      render: (text, record, index) => {
        return <p>{`${record.volumeOneDay.amountFormated}%`}</p>;
      },
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          15M Volume
        </div>
      ),
    },
    {
      dataIndex: '15mvolume',
      key: '15mvolume',
      responsive: ['md'],
      align: 'center',
      showSorterTooltip: false,
      render: (text, record, index) => {
        return <p>{`${record.volumeOneDay.amountFormated}%`}</p>;
      },
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          1D Volume
        </div>
      ),
    },
    {
      dataIndex: '15mvolume',
      key: '15mvolume',
      responsive: ['md'],
      align: 'center',
      showSorterTooltip: false,
      render: (text, record, index) => {
        return <p>{`${record.volumeOneWeek.amountFormated}%`}</p>;
      },
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          7D Volume
        </div>
      ),
    },
  ];

  return (
    <ListStyled>
      {isFetching && collections.length <= 0 ? (
        <CollectionLoader />
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
    </ListStyled>
  );
};

export default React.memo(List);
