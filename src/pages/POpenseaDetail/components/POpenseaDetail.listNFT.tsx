/* eslint-disable jsx-a11y/alt-text */
import { Dropdown, List, Menu } from 'antd';
import ArrowDownSVG from 'assets/images/arrow-down-white.svg';
import spookyImg from 'assets/images/spooky-icon.png';
import SearchSVG from 'assets/svg/search-icon.svg';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Styled, TextInputStyled } from './POpenseaDetail.listNFT.styled';

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

enum SortType {
  PriceLowToHigh = 'Price low to high',
  PriceHighToLow = 'Price high to low',
}

interface POpenseaDetailListNFTProps {
  onSearchChange?: (key: string) => void;
}

const POpenseaDetailListNFT = (props: POpenseaDetailListNFTProps) => {
  const history = useHistory();
  const [keySearch, setKeySearch] = React.useState('');
  const [currentSortType, setCurrentSortType] = React.useState<SortType>(SortType.PriceLowToHigh);

  const onChange = (e: any) => {
    setKeySearch(e.target.value);
    props.onSearchChange && props.onSearchChange(e.target.value);
  };

  const onClickNFTItem = () => {
    history.replace('/popensea/collection-detail/nft-detail');
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
          <p className="total-number">(13,737 items)</p>
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
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item className="list-item" onClick={onClickNFTItem}>
            <img alt="item-img" className="item-img" src={spookyImg} />
            <div className="item-info">
              <div className="item-name-container">
                <p className="item-name">{item.title}</p>
                <p className="item-id">#13760</p>
              </div>
              <p className="item-price">0.969 ETH</p>
              <p className="item-last-sale">Last sale: 0.850 ETH</p>
            </div>
          </List.Item>
        )}
      />
    </Styled>
  );
};

export default React.memo(POpenseaDetailListNFT);
