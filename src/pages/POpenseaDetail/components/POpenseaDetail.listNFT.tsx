/* eslint-disable jsx-a11y/alt-text */
import { Dropdown, List, Menu } from 'antd';
import ArrowDownSVG from 'assets/images/arrow-down-white.svg';
import SearchSVG from 'assets/svg/search-icon.svg';
import ImagePlaceholder from 'components/ImagePlaceholder';
import { POpenseaNft } from 'models/model/POpenseaNFT';
import React from 'react';

import { Styled, TextInputStyled } from './POpenseaDetail.listNFT.styled';

enum SortType {
  PriceLowToHigh = 'Price low to high',
  PriceHighToLow = 'Price high to low',
}

interface POpenseaDetailListNFTProps {
  nfts: POpenseaNft[];
  total?: number;
  onClickNFTItem: (item: POpenseaNft) => void;
  onSearchChange?: (key: string) => void;
}

const POpenseaDetailListNFT = (props: POpenseaDetailListNFTProps) => {
  const [keySearch, setKeySearch] = React.useState('');
  const [currentSortType, setCurrentSortType] = React.useState<SortType>(SortType.PriceLowToHigh);

  const onChange = (e: any) => {
    setKeySearch(e.target.value);
    props.onSearchChange && props.onSearchChange(e.target.value);
  };

  const renderFilterComponent = () => {
    const renderSortItem = (key: any, label: string) => {
      const typedString: keyof typeof SortType = key;
      return (
        <button className="sort-item" onClick={() => setCurrentSortType(SortType[typedString])}>
          {label}
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
          <Dropdown
            overlay={
              <Menu
                rootClassName="sort-menu"
                items={Object.entries(SortType).map(([key, value]) => ({
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
          </Dropdown>
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
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={props.nfts}
        renderItem={(item: POpenseaNft) => (
          <List.Item onClick={() => props.onClickNFTItem(item)}>
            <div className="card">
              <ImagePlaceholder className="item-img" src={item.imageUrl} />
              <div className="item-info">
                <div className="item-name-container">
                  <p className="item-name">{item.name}</p>
                  <p className="item-id">{`#${item.id}`}</p>
                </div>
                <p className="item-price">{`${item.numSales} ETH`}</p>
                <p className="item-last-sale">{`Last sale: ${item.lastSale} ETH`}</p>
              </div>
            </div>
          </List.Item>
        )}
      />
    </Styled>
  );
};

export default React.memo(POpenseaDetailListNFT);
