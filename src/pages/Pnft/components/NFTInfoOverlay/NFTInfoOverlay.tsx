/* eslint-disable jsx-a11y/alt-text */
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { RowBetween } from 'components/Core/Row';
import ImagePlaceholder from 'components/ImagePlaceholder';
import useWindowDimensions from 'hooks/useWindowDimentions';
import { IToken } from 'pages/Pnft';
import { ITrait } from 'pages/Pnft/Pnft.interface';
import React from 'react';
import styled from 'styled-components/macro';

import { shortenAddress } from '../../../../utils';

const INFO_WIDTH = 608;

const Styled = styled.div<{ x: number; y: number; width: number }>`
  width: ${({ width }) => width}px;
  background: #303030;
  border-radius: 16px;

  display: flex;
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;

  .wrap-content {
    display: flex;
    flex-direction: row;
    padding: 24px;
  }

  .column-name {
    width: 120px;
  }

  .column-floor {
    width: 76px;
  }

  .column-qty {
    width: 54px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
  }

  .qty-percent {
    font-weight: 400;
    font-size: 12px;
    line-height: 148%;
    color: #9c9c9c;
    margin-left: 2px;
  }

  .baseText {
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
  }

  .text-align-center {
    text-align: center;
  }

  .smallText {
    font-weight: 400;
    font-size: 12px;
    line-height: 148%;
    color: #9c9c9c;
  }
  table {
    width: max-content;
    margin-top: -8px;
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
    height: 54px;
    border-bottom: 1px solid #363636;
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
    /* padding: 0px 32px; */
    padding-right: 36px;
    height: 54px;
  }

  .ant-table-thead {
    .ant-table-cell {
      height: 44px;
      padding: 0px;
      padding-right: 36px;
      border-bottom: 1px solid #363636;
    }
  }

  .headerTitle {
    font-weight: 600;
    font-size: 14px;
    line-height: 140%;
    color: #9c9c9c;
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
    padding: 0px 0px;
    padding-right: 36px;
  }

  .ant-table-tbody > tr.ant-table-placeholder:hover > td {
    background-color: ${({ theme }) => theme.background1};
  }
`;

const StyledCard = styled.div`
  border-radius: 8px;
  margin-right: 32px;
  cursor: pointer;

  .item-img {
    width: 200px;
    height: 200px;
    height: auto;
    object-fit: cover;
    background-color: ${({ theme }) => theme.bg4};
    border-radius: 8px;
  }

  .item-info {
    background-color: ${({ theme }) => theme.bg3};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-top: 8px;
  }

  .item-name-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .item-name {
    font-weight: 600;
    font-size: 14px;
    line-height: 140%;
  }

  .item-price {
    font-weight: 600;
    font-size: 14px;
    line-height: 140%;
    margin-top: 8px;
  }

  .text-align-right {
    text-align: right;
  }

  .item-last-sale {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    margin-top: 4px;
    height: 16px;
    color: ${({ theme }) => theme.primary8};
  }

  .filter-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .rarity-rank {
    padding: 0px 4px;
    gap: 10px;

    position: absolute;
    background: #303030;
    border-radius: 4px;
    left: 38px;
    top: 38px;
  }
`;

interface NFTInfoProps {
  event: any;
  token: IToken;
}

const NFTInfoOverlay = (props: NFTInfoProps) => {
  const { event, token } = props;
  const { detail } = token;
  const { pageX, pageY } = event;

  const { width: screenWidth } = useWindowDimensions();

  const y = pageY + 16;
  let x = pageX;
  const diffPageX = Math.abs(screenWidth - (pageX + INFO_WIDTH));
  if (diffPageX > 0) {
    if (pageX > screenWidth / 2) {
      x = x - diffPageX - 16;
    }
  }

  const columns: ColumnsType<ITrait> = [
    {
      key: 'index',
      render: (text, record, index) => (
        <div key={index.toString()} className="column-name">
          <p className="smallText">{record.key}</p>
          <p className="baseText">{record.value}</p>
        </div>
      ),
      responsive: ['md'],
      title: () => <div className="headerTitle">Trait</div>,
    },
    {
      key: 'floor',
      render: (text, record, index) => (
        <div key={index.toString()} className="column-floor">
          <p className="baseText text-align-center">-</p>
        </div>
      ),
      responsive: ['md'],
      title: () => (
        <div className="headerTitle" style={{ textAlign: 'center' }}>
          Floor
        </div>
      ),
    },
    {
      key: 'qty',
      render: (text, record, index) => (
        <div key={index.toString()} className="column-qty">
          <p className="baseText">-</p>
          {/* <p className="qty-percent">2%</p> */}
        </div>
      ),
      responsive: ['md'],
      title: () => (
        <div className="headerTitle" style={{ textAlign: 'center' }}>
          Qty
        </div>
      ),
    },
  ];

  const renderCardInfo = () => (
    <StyledCard>
      <ImagePlaceholder className="item-img" src={detail.imageUrl} />
      <div className="item-info">
        <RowBetween>
          <div>
            <p className="item-last-sale">ID</p>
            <p className="item-price">{detail.tokenId.substr(detail.tokenId.length - 6)}</p>
          </div>
          <div>
            <p className="item-last-sale text-align-right">Owner</p>
            <p className="item-price text-align-right">{shortenAddress(detail?.owner?.address)}</p>
          </div>
        </RowBetween>
      </div>
      <p className="rarity-rank">{detail.rarityRank}</p>
    </StyledCard>
  );

  const renderTable = () => {
    return (
      <Table
        columns={columns}
        dataSource={detail.traits}
        size="large"
        pagination={false}
        className="table"
        rowClassName="tableRow"
      />
    );
  };

  return (
    <Styled x={x} y={y} width={INFO_WIDTH}>
      <div className="wrap-content">
        {renderCardInfo()}
        {renderTable()}
      </div>
    </Styled>
  );
};

export default React.memo(NFTInfoOverlay);
