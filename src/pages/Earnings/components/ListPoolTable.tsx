import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { API_COIN_SERVICE } from 'config';
import { CRYPTO_ICON_URL, PRIVATE_TOKEN_CURRENCY_NAME } from 'constants/token';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { ImArrowDown, ImArrowUp } from 'react-icons/im';
import { useHistory } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';

import { Pool } from '../Earnings.types';
import { parseListPoolApiResponse } from '../Earnings.utils';

const Styled = styled.div`
  margin-top: 64px;
  .baseText {
    font-size: 18px
    font-weight: 500;
    line-height: 140%;
    color: #ffffff;
  }
  .greenBoldText {
    font-weight: 700;
    font-size: 18px;
    line-height: 140%;
    color: #0ECB81;
  }
  .smallText {
    font-weight: 400;
    font-size: 12px;
    letter-spacing: -0.02em;
    color: #757575;
  }
  table {
    border: 1px solid #363636;
    border-radius: 16px;
  }
  .ant-table-column-sorter {
    display: none;
  }

  .ant-table-thead th.ant-table-column-has-sorters: hover {
    background-color: #303030;
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
    background: #303030;
    font-weight: 500;
    font-size: 18px;
    line-height: 140%;
    color: #757575;
    padding: 0px 32px;
    height: 64px;
  }

  .headerTitle {
    font-weight: 500;
    font-size: 18px;
    line-height: 140%;
    color: #757575;
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

  .poolContainer {
    display: flex;
    width: fit-content;
    align-item: center;
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
    .greenBoldText {
      font-weight: 700;
      font-size: 16px;
    }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    .poolContainer {
      display: flex;
      flex-direction: column;
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

const NetworkBox = styled.div`
  width: fit-content;
  background: #303030;
  border-radius: 4px;
  display: flex;
  padding-left: 4px;
  padding-right: 4px;
  text-align: center;
  align-items: center;
  justify-content: center;
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    margin-top: 8px;
  `}
`;

const ListPoolTable = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  const getIconUrl = (symbol: string) => {
    const formatedSymbol = String(symbol).toUpperCase();
    if (symbol === 'PRV') {
      return 'https://statics.incognito.org/wallet/cryptocurrency-icons/32@2x/color/prv@2x.png';
    }
    const url = `${CRYPTO_ICON_URL}/${formatedSymbol}.png`;
    return url;
  };

  const columns: ColumnsType<Pool> = [
    {
      title: '#',
      key: 'index',
      render: (text, record, index) => (
        <p className="baseText" style={{ color: '#757575' }}>
          {index + 1}
        </p>
      ),
      responsive: ['md'],
    },
    {
      title: 'Pool',
      dataIndex: 'pool',
      key: 'pool',
      render: (text, record, index) => (
        <div className="poolContainer">
          <div style={{ display: 'flex' }}>
            <img src={getIconUrl(record.token1Symbol)} style={{ width: 24, height: 24, borderRadius: 12 }} />
            <img
              src={getIconUrl(record.token2Symbol)}
              style={{ width: 24, height: 24, borderRadius: 12, marginRight: 8 }}
            />
            <p className="baseText" style={{ marginRight: 8 }}>
              {record?.token1Symbol} / {record?.token2Symbol}
            </p>
          </div>

          <NetworkBox>
            <span className="smallText" style={{ color: '#757575' }}>
              {PRIVATE_TOKEN_CURRENCY_NAME[record.token1CurrencyType]} /{' '}
              {PRIVATE_TOKEN_CURRENCY_NAME[record.token2CurrencyType]}
            </span>
          </NetworkBox>
        </div>
      ),
    },
    {
      title: 'TVL',
      dataIndex: 'totalValueLockUSD',
      key: 'totalValueLockUSD',
      responsive: ['md'],
      render: (text) => <p className="baseText">${text.toFixed(2)}m</p>,
    },
    {
      title: 'Volume 24H',
      dataIndex: 'volume',
      key: 'volume',
      responsive: ['md'],
      render: (text) => <p className="baseText">${text.toFixed(2)}m</p>,
    },
    {
      key: 'apy',
      dataIndex: 'apy',
      render: (text) => <p className="greenBoldText">{text}%</p>,
      align: 'right',
      defaultSortOrder: 'descend',
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend', 'descend'],
      sorter: {
        compare: (a, b) => a.apy - b.apy,
        multiple: 3,
      },
      // eslint-disable-next-line react/prop-types
      title: ({ sortColumns }) => {
        // eslint-disable-next-line react/prop-types
        const sortedColumn = sortColumns?.find(({ column }) => column.key === 'apy');
        return (
          <div className="headerTitle">
            APY
            {sortedColumn ? (
              sortedColumn.order === 'ascend' ? (
                <ImArrowUp size={12} style={{ marginLeft: 4, marginRight: 0 }} />
              ) : (
                <ImArrowDown size={12} style={{ marginLeft: 4, marginRight: 0 }} />
              )
            ) : null}
          </div>
        );
      },
    },
  ];

  const getListPool = () => {
    setLoading(true);
    fetch(`${API_COIN_SERVICE}/pdex/v3/listpools?pair=all&verify=true`)
      .then((response) => response.json())
      .then((data) => {
        let listPool = parseListPoolApiResponse(data?.Result || []);
        listPool.sort((a, b) => b.apy - a.apy);
        setPools(listPool);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getListPool();
  }, []);

  return (
    <Styled>
      <div>
        <Table
          columns={columns}
          dataSource={pools}
          size="large"
          loading={loading}
          pagination={false}
          rowClassName="tableRow"
          onRow={(r) => ({
            onClick: () => {
              if (isMobile) return;
              history.push('/', { tokenId1: r?.token1ID, tokenId2: r?.token2ID });
            },
          })}
        />
      </div>
    </Styled>
  );
};

export default React.memo(ListPoolTable);
