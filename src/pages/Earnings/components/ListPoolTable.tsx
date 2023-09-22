import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
// import arrowBottomActive from 'assets/svg/arrow-bottom-active.svg';
// import arrowDisable from 'assets/svg/arrow-disable.svg';
// import arrowTopActive from 'assets/svg/arrow-top-active.svg';
import { CRYPTO_ICON_URL, PRIVATE_TOKEN_CURRENCY_NAME } from 'constants/token';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { METRIC_TYPE, METRIC_UNIQ, updateMetric } from 'services/rpcMetric';
import { isFetchingPoolsSelectors, poolsSelectors } from 'state/pools/pool.selectors';
import styled, { DefaultTheme } from 'styled-components/macro';

import { Pool } from '../Earnings.types';
import { formatPrice } from '../features/Validators/Validators.utils';

const Styled = styled.div`
  margin-top: 64px;
  .baseText {
    font-size: 18px;
    font-weight: 500;
    line-height: 140%;
    color: #ffffff;
  }
  .greenBoldText {
    font-weight: 700;
    font-size: 18px;
    line-height: 140%;
    color: #0ecb81;
  }
  .smallText {
    font-size: 12px;
    line-height: 16px;
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

  .ant-table-column-title {
    font-weight: 500;
    font-size: 18px;
    line-height: 140%;
    color: #757575;
  }

  .ant-table-theadth.ant-table-column-has-sorters: hover {
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
    align-items: center;
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

const NetworkBox = styled.div`
  width: fit-content;
  background: #303030;
  border-radius: 4px;
  display: flex;
  height: 16px;
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
      render: (text, record, index) => {
        const token1Symbol = record.token1Symbol;
        const token2Symbol = record.token2Symbol;
        const isToken1PRV = token1Symbol === 'PRV';
        const getSize = (symbol: string) => (symbol === 'PRV' ? 32 : 28);
        const poolName = isToken1PRV ? `${token2Symbol} / ${token1Symbol}` : `${token1Symbol} / ${token2Symbol}`;
        const symbol1 = isToken1PRV ? token2Symbol : token1Symbol;
        const symbol2 = isToken1PRV ? token1Symbol : token2Symbol;
        const size1 = getSize(symbol1);
        const size2 = getSize(symbol2);
        return (
          <div className="poolContainer">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={getIconUrl(symbol1)} style={{ width: size1, height: size1, borderRadius: 12 }} />
              <img
                src={getIconUrl(symbol2)}
                style={{ width: size2, height: size2, borderRadius: 12, marginRight: 8 }}
              />
              <p className="baseText" style={{ marginRight: 8 }}>
                {poolName}
              </p>
            </div>

            <NetworkBox>
              <p className="smallText" style={{ color: '#757575' }}>
                {PRIVATE_TOKEN_CURRENCY_NAME[record.token1CurrencyType]} /{' '}
                {PRIVATE_TOKEN_CURRENCY_NAME[record.token2CurrencyType]}
              </p>
            </NetworkBox>
          </div>
        );
      },
    },
    {
      title: 'TVL',
      dataIndex: 'totalValueLockUSD',
      key: 'totalValueLockUSD',
      responsive: ['md'],
      render: (text) => <p className="baseText">{`$${formatPrice({ price: text || '0' })}`}</p>,
    },
    {
      dataIndex: 'volume',
      key: 'volume',
      responsive: ['md'],
      align: 'left',
      showSorterTooltip: false,
      // render: (text) => <p className="baseText">${text.toFixed(2)}</p>,
      sorter: (a, b) => a.volume - b.volume,
      // eslint-disable-next-line react/prop-types
      // title: ({ sortColumns }) => {
      //   // eslint-disable-next-line react/prop-types
      //   const sortedColumn = sortColumns?.find(({ column }) => column.key === 'volume');
      //   return (
      //     <div className="headerTitle" style={{ justifyContent: 'flex-start' }}>
      //       Volume 24H
      //       {sortedColumn ? (
      //         sortedColumn.order === 'ascend' ? (
      //           <img src={arrowBottomActive} style={{ marginLeft: 6, marginRight: 0 }} />
      //         ) : sortedColumn?.order === 'descend' ? (
      //           <img src={arrowTopActive} style={{ marginLeft: 6, marginRight: 0 }} />
      //         ) : (
      //           <img src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
      //         )
      //       ) : (
      //         <img src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
      //       )}
      //     </div>
      //   );
      // },
    },
    {
      key: 'apy',
      dataIndex: 'apy',
      render: (text) => <p className="greenBoldText">{text}%</p>,
      align: 'right',
      title: 'APY',
      // showSorterTooltip: false,
      // sorter: (a, b) => a.apy - b.apy,
      // eslint-disable-next-line react/prop-types
      // title: ({ sortColumns }) => {
      //   // eslint-disable-next-line react/prop-types
      //   const sortedColumn = sortColumns?.find(({ column }) => column.key === 'apy');
      //   return (
      //     <div className="headerTitle">
      //       APY
      //       {sortedColumn ? (
      //         sortedColumn.order === 'ascend' ? (
      //           <img src={arrowBottomActive} style={{ marginLeft: 6, marginRight: 0 }} />
      //         ) : sortedColumn?.order === 'descend' ? (
      //           <img src={arrowTopActive} style={{ marginLeft: 6, marginRight: 0 }} />
      //         ) : (
      //           <img src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
      //         )
      //       ) : (
      //         <img src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
      //       )}
      //     </div>
      //   );
      // },
    },
  ];

  const listPool = useSelector(poolsSelectors);
  const isFetching = useSelector(isFetchingPoolsSelectors);

  return (
    <Styled>
      <div>
        <Table
          columns={columns}
          dataSource={listPool}
          size="large"
          loading={isFetching}
          pagination={false}
          rowClassName="tableRow"
          onRow={(r) => ({
            onClick: () => {
              if (isMobile) return;
              updateMetric({
                metric: METRIC_TYPE.EARN_SELECT,
                uniqMetric: METRIC_UNIQ.EARN_SELECT_UNIQ,
              });
              history.push('/swap', { tokenId1: r?.token1ID, tokenId2: r?.token2ID });
            },
          })}
        />
      </div>
    </Styled>
  );
};

export default React.memo(ListPoolTable);
