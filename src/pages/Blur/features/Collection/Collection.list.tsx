import { Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ColumnTitleProps, ColumnType, SortOrder } from 'antd/es/table/interface';
import arrowBottomActive from 'assets/svg/arrow-bottom-active.svg';
import arrowDisable from 'assets/svg/arrow-disable.svg';
import arrowTopActive from 'assets/svg/arrow-top-active.svg';
import ImagePlaceholder from 'components/ImagePlaceholder';
import { ICollection } from 'pages/Blur';
import EthereumLogo from 'pages/Blur/images/ether.svg';
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
  const showLoader = isFetching || collections.length <= 0;

  const renderSortableTitle = ({ sortColumns, title, key }: ITbHeader) => {
    const sortedColumn = sortColumns?.find(({ column }: any) => column.key === key);
    return (
      <div className="headerTitle" style={{ justifyContent: 'center', cursor: 'pointer' }}>
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
  const getColor = ({ numb, value, suffix }: { numb: number; value: string; suffix?: string }) => {
    const text = Number.isFinite(numb) ? `${value}${suffix || ''}` : '-';
    const color = !Number.isFinite(numb) ? '#9C9C9C' : numb < 0 ? '#FD4040' : '#0ECB81';
    return { text, color };
  };

  const CurrencyIcon = React.useMemo(() => {
    return <img className="currency-logo" src={EthereumLogo} alt="currency-logo" />;
  }, []);

  const columns: ColumnsType<ICollection> = [
    {
      key: 'index',
      render: (text, record, index) => (
        <p key={index.toString()} className="baseText">
          {index + 1}
        </p>
      ),
      responsive: ['md'],
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'start' }}>
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
            <p className="baseText name-text">{record.name}</p>
          </div>
        </div>
      ),
      title: () => (
        <p className="headerTitle" style={{ justifyContent: 'left' }}>
          Collection
        </p>
      ),
    },
    {
      dataIndex: 'floorprice',
      key: 'floorprice',
      responsive: ['md'],
      align: 'center',
      showSorterTooltip: false,
      render: (text, record, index) => {
        return (
          <Row justify="end">
            <p className="baseText">{`${record.floorPrice.amountFormated}`}</p>
            {CurrencyIcon && CurrencyIcon}
          </Row>
        );
      },
      // sorter: (a, b) => (a.floorPrice.amountNum || 0) - (b.floorPrice.amountNum || 0),
      title: ({ sortColumns }: ColumnTitleProps<ICollection>) => {
        return renderSortableTitle({ sortColumns, title: 'Floor Price', key: 'floorprice' });
      },
    },
    {
      dataIndex: 'topbid',
      key: 'topbid',
      responsive: ['md'],
      align: 'center',
      render: (_, record, index) => {
        let text = record.bestCollectionBid.amountFormated;
        let icon: any = CurrencyIcon;
        if (!text || text === '0') {
          text = '-';
          icon = undefined;
        }
        return (
          <Row justify="end">
            <p className={`baseText ${!icon ? 'shadow-text' : ''}`}>{`${text}`}</p>
            {icon && icon}
          </Row>
        );
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
        const { text, color } = getColor({ numb: record.dayChangeNumb, value: record.dayChange, suffix: '%' });
        return <p style={{ color }}>{text}</p>;
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
        const { text, color } = getColor({ numb: record.weekChangeNumb, value: record.weekChange, suffix: '%' });
        return (
          <p className="baseText" style={{ color }}>
            {text}
          </p>
        );
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
      render: (_, record, index) => {
        let text = record.volumeFifteenMinutes.amountNum ? record.volumeFifteenMinutes.amountFormated : '-';
        let icon: any = CurrencyIcon;
        if (!text || text === '-') {
          icon = undefined;
        }
        return (
          <Row justify="end">
            <p className={`baseText ${!icon ? 'shadow-text' : ''}`}>{`${text}`}</p>
            {icon && icon}
          </Row>
        );
      },
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          15M Volume
        </div>
      ),
    },
    {
      dataIndex: '1dvolume',
      key: '1dvolume',
      responsive: ['md'],
      align: 'center',
      showSorterTooltip: false,
      render: (_, record, index) => {
        let text = record.volumeOneDay.amountNum ? record.volumeOneDay.amountFormated : '-';
        let icon: any = CurrencyIcon;
        if (!text || text === '-') {
          icon = undefined;
        }
        return (
          <Row justify="end">
            <p className={`baseText ${!icon ? 'shadow-text' : ''}`}>{`${text}`}</p>
            {icon && icon}
          </Row>
        );
      },
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          1D Volume
        </div>
      ),
    },
    {
      dataIndex: '7dvolume',
      key: '7dvolume',
      responsive: ['md'],
      align: 'center',
      showSorterTooltip: false,
      render: (_, record, index) => {
        let text = record.volumeOneWeek.amountNum ? record.volumeOneWeek.amountFormated : '-';
        let icon: any = CurrencyIcon;
        if (!text || text === '-') {
          icon = undefined;
        }
        return (
          <Row justify="end">
            <p className={`baseText ${!icon ? 'shadow-text' : ''}`}>{`${text}`}</p>
            {icon && icon}
          </Row>
        );
      },
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          7D Volume
        </div>
      ),
    },
    {
      dataIndex: 'owner',
      key: 'owner',
      responsive: ['md'],
      align: 'center',
      showSorterTooltip: false,
      render: (_, record, index) => {
        return <p className="baseText">{`${record.numberOwnersFormated} (${record.numberOwnersPercent}%)`}</p>;
      },
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          Owner
        </div>
      ),
    },
    {
      dataIndex: 'supply',
      key: 'supply',
      responsive: ['md'],
      align: 'center',
      showSorterTooltip: false,
      render: (_, record, index) => {
        return <p className="baseText">{`${record.totalSupplyFormated}`}</p>;
      },
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          Supply
        </div>
      ),
    },
  ];

  return (
    <ListStyled showLoader={showLoader}>
      {showLoader && <CollectionLoader />}
      <Table
        className="table"
        columns={columns}
        dataSource={collections}
        size="large"
        pagination={false}
        rowClassName="tableRow"
        onRow={(collection) => ({
          onClick: () => {
            onClickItem(collection);
          },
        })}
      />
    </ListStyled>
  );
};

export default React.memo(List);
