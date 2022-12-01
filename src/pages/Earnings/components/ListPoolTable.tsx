import { Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { API_COIN_SERVICE } from 'config';
import { CRYPTO_ICON_URL, PRIVATE_TOKEN_CURRENCY_NAME } from 'constants/token';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

// import { colorsSelector } from 'theme/Theme.selector';
import { Pool } from '../Earnings.types';
import { parseListPoolApiResponse } from '../Earnings.utils';

const Styled = styled.div`
  margin-top: 64px;
  margin-bottom: 110px;
  table {
    border: 1px solid #363636;
    border-radius: 16px;
  }
  ant-spin-blur {
    border-radius: 16px;
    opacity: 1;
  }
  .tableRow {
    width: 100%;
  }
  .tableRow:hover td {
    cursor: pointer;
    background: #303030 !important;
  }

  element.style {
  }
  .ant-table {
    background: transparent;
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
`;

const NetworkBox = styled.div`
  background: #303030;
  border-radius: 4px;
  padding-left: 4px;
  padding-right: 4px;
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
      render: (text, record, index) => <ThemedText.MediumLabel color="#757575">{index + 1}</ThemedText.MediumLabel>,
      responsive: ['sm'],
    },
    {
      title: 'Pool',
      dataIndex: 'pool',
      key: 'pool',
      render: (text, record, index) => (
        <Row>
          <img src={getIconUrl(record.token1Symbol)} style={{ width: 24, height: 24, borderRadius: 12 }} />
          <img
            src={getIconUrl(record.token2Symbol)}
            style={{ width: 24, height: 24, borderRadius: 12, marginRight: 8 }}
          />
          <ThemedText.RegularLabel style={{ marginRight: 8 }}>
            {record?.token1Symbol} / {record?.token2Symbol}
          </ThemedText.RegularLabel>
          <NetworkBox>
            <ThemedText.RegularLabel color="#757575">
              {PRIVATE_TOKEN_CURRENCY_NAME[record.token1CurrencyType]} /{' '}
              {PRIVATE_TOKEN_CURRENCY_NAME[record.token2CurrencyType]}
            </ThemedText.RegularLabel>
          </NetworkBox>
        </Row>
      ),
    },
    {
      title: 'TVL',
      dataIndex: 'totalValueLockUSD',
      key: 'totalValueLockUSD',
      responsive: ['sm'],
      render: (text) => <ThemedText.RegularLabel>${text.toFixed(2)}m</ThemedText.RegularLabel>,
    },
    {
      title: 'Volume 24H',
      dataIndex: 'volume',
      key: 'volume',
      responsive: ['sm'],
      render: (text) => <ThemedText.RegularLabel>${text.toFixed(2)}m</ThemedText.RegularLabel>,
    },
    {
      title: 'APY',
      key: 'apy',
      dataIndex: 'apy',
      render: (text) => <ThemedText.MediumLabel color="#0ECB81">{text}%</ThemedText.MediumLabel>,
      align: 'right',
    },
  ];

  const getListPool = () => {
    console.log(API_COIN_SERVICE);
    setLoading(true);
    fetch(`${API_COIN_SERVICE}/pdex/v3/listpools?pair=all&verify=true`)
      .then((response) => response.json())
      .then((data) => {
        let listPool = parseListPoolApiResponse(data?.Result || []);
        listPool.sort((a, b) => b.apy - a.apy);
        setPools(listPool);
        setLoading(false);
      })
      .catch((error) => console.log(error));
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
            onClick: () => history.push('/', { tokenId1: r?.token1ID, tokenId2: r?.token2ID }),
          })}
        />
      </div>
    </Styled>
  );
};

export default React.memo(ListPoolTable);
