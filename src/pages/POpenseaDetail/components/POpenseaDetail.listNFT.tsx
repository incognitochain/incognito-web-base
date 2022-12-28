/* eslint-disable jsx-a11y/alt-text */
import { List, Menu } from 'antd';
import ArrowDownSVG from 'assets/images/arrow-down-white.svg';
import SearchSVG from 'assets/svg/search-icon.svg';
import BigNumber from 'bignumber.js';
import ImagePlaceholder from 'components/ImagePlaceholder';
import { POpenseaNft } from 'models/model/POpenseaNFT';
import React from 'react';
import { useSelector } from 'react-redux';
import { pOpenseaFilterNFTsSelectors } from 'state/pOpensea';
import format from 'utils/format';

import { SortSelect, Styled, TextInputStyled } from './POpenseaDetail.listNFT.styled';

export enum SortNftType {
  PriceLowToHigh = 'Price low to high',
  PriceHighToLow = 'Price high to low',
  HighestLastSale = 'Highest last sale',
}

interface POpenseaDetailListNFTProps {
  total?: number;
  onClickNFTItem: (item: POpenseaNft) => void;
  onSearchChange?: (key: string) => void;
}

const POpenseaDetailListNFT = (props: POpenseaDetailListNFTProps) => {
  const [keySearch, setKeySearch] = React.useState<string | undefined>();
  const [currentSortType, setCurrentSortType] = React.useState<SortNftType>(SortNftType.PriceLowToHigh);

  const nfts = useSelector(pOpenseaFilterNFTsSelectors)(currentSortType, keySearch);

  const onChange = (e: any) => {
    setKeySearch(e.target.value);
    props.onSearchChange && props.onSearchChange(e.target.value);
  };

  const renderFilterComponent = () => {
    const renderSortItem = (key: any, label: string) => {
      const typedString: keyof typeof SortNftType = key;
      return (
        <button onClick={() => setCurrentSortType(SortNftType[typedString])}>
          <p>{label}</p>
        </button>
      );
    };

    return (
      <div className="filter-container">
        <div className="total-container">
          <p className="total-items">Items</p>
          <p className="total-number">{`(${props.total} items)`}</p>
        </div>
        <div className="search-container">
          <div className="input-container">
            <img className="search-ic" src={SearchSVG} />
            <TextInputStyled
              placeholder={'Search by name or attribute'}
              type={'text'}
              onChange={onChange}
              value={keySearch}
              autoFocus={false}
            />
          </div>
          <SortSelect
            overlay={
              <Menu
                rootClassName="sort-menu"
                items={Object.entries(SortNftType).map(([key, value]) => ({
                  key: value,
                  label: renderSortItem(key, value),
                }))}
              />
            }
          >
            <button className="sort-button">
              <p className="sort-text">{currentSortType.toString()}</p>
              <img src={ArrowDownSVG} />
            </button>
          </SortSelect>
        </div>
      </div>
    );
  };
  return (
    <Styled>
      {renderFilterComponent()}
      <List
        className="list"
        grid={{
          gutter: 30,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={nfts}
        renderItem={(item: POpenseaNft, index: number) => {
          const seaportSellOrder =
            item.seaportSellOrders && item.seaportSellOrders.length > 0 ? item.seaportSellOrders[0] : undefined;
          const lastSale = item.lastSale;
          return (
            <List.Item key={index.toString()} onClick={() => props.onClickNFTItem(item)}>
              <div className="card">
                <ImagePlaceholder className="item-img" src={item.imageUrl} />
                <div className="item-info">
                  <div className="item-name-container">
                    <p className="item-name">{item.name}</p>
                    <p className="item-id">{`#${item.id}`}</p>
                  </div>
                  {seaportSellOrder && (
                    <p className="item-price">
                      {format.amountVer2({
                        originalAmount: new BigNumber(seaportSellOrder.currentPrice || 0).toNumber(),
                        decimals: 18,
                      })}
                      {' ETH'}
                    </p>
                  )}
                  <p className="item-last-sale">
                    {lastSale && lastSale.totalPrice
                      ? `Last sale: ${format.amountVer2({
                          originalAmount: new BigNumber(lastSale.totalPrice).toNumber(),
                          decimals: lastSale.paymentToken?.decimals || 18,
                        })} ${lastSale.paymentToken?.symbol}`
                      : ''}
                  </p>
                </div>
              </div>
            </List.Item>
          );
        }}
      />
    </Styled>
  );
};

export default React.memo(POpenseaDetailListNFT);
