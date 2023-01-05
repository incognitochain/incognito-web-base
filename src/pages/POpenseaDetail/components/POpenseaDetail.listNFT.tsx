/* eslint-disable jsx-a11y/alt-text */
import { List } from 'antd';
import ArrowDownSVG from 'assets/images/arrow-down-white.svg';
import SearchSVG from 'assets/svg/search-icon.svg';
import ImagePlaceholder from 'components/ImagePlaceholder';
import { POpenseaNft } from 'models/model/POpenseaNFT';
import React from 'react';
import { useSelector } from 'react-redux';
import { isFetchingPOpenseaNFTsSelector, pOpenseaFilterNFTsSelectors } from 'state/pOpensea';

import POpenseaDetailListNFTLoader from './POpenseaDetail.listNFT.loader';
import { SortDropdown, SortMenu, Styled, TextInputStyled } from './POpenseaDetail.listNFT.styled';

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
  const isFetching = useSelector(isFetchingPOpenseaNFTsSelector);

  const onChange = (e: any) => {
    setKeySearch(e.target.value);
    props.onSearchChange && props.onSearchChange(e.target.value);
  };

  const renderFilterComponent = () => {
    const renderSortItem = (key: any, label: string, isLast: boolean) => {
      const typedString: keyof typeof SortNftType = key;
      return (
        <div className={`menu-item-container ${!isLast && 'border-bottom'}`}>
          <button onClick={() => setCurrentSortType(SortNftType[typedString])}>
            <p className="menu-item-label">{label}</p>
          </button>
        </div>
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
          <SortDropdown
            overlay={
              <SortMenu
                items={Object.entries(SortNftType).map(([key, value], index) => ({
                  key: value,
                  label: renderSortItem(key, value, index === Object.entries(SortNftType).length - 1),
                }))}
              />
            }
          >
            <button className="sort-button">
              <p className="sort-text">{currentSortType.toString()}</p>
              <img src={ArrowDownSVG} />
            </button>
          </SortDropdown>
        </div>
      </div>
    );
  };
  return (
    <Styled>
      {renderFilterComponent()}
      {isFetching ? (
        <POpenseaDetailListNFTLoader />
      ) : (
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
            const seaportSellOrder = item.getSeaportSellOrder();
            const lastSale = item.lastSale;
            return (
              <List.Item key={index.toString()} onClick={() => props.onClickNFTItem(item)}>
                <div className="card">
                  <ImagePlaceholder className="item-img" src={item.getImageUrl(256)} animationUrl={item.animationUrl} />
                  <div className="item-info">
                    <div className="item-name-container">
                      <p className="item-name">{item.getOriginalName()}</p>
                    </div>
                    {seaportSellOrder && (
                      <p className="item-price">
                        {seaportSellOrder.getPricingFormatAmount(18)}
                        {' ETH'}
                      </p>
                    )}
                    <p className="item-last-sale">{lastSale?.getLastSaleStr()}</p>
                  </div>
                </div>
              </List.Item>
            );
          }}
        />
      )}
    </Styled>
  );
};

export default React.memo(POpenseaDetailListNFT);
