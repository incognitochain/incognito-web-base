/* eslint-disable jsx-a11y/alt-text */
import { Dropdown, Menu } from 'antd';
import ArrowDownSVG from 'assets/images/arrow-down-white.svg';
import SearchSVG from 'assets/svg/search-icon.svg';
import Checkbox from 'pages/Pnft/images/checkbox.svg';
import CheckboxActive from 'pages/Pnft/images/checkbox-active.svg';
import React from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

const SortSelect = styled(Dropdown)`
  cursor: pointer;

  .ant-dropdown-selection {
    background-color: transparent;
  }
`;
const TextInputStyled = styled.input`
  display: flex;
  flex: 1;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: white;
`;

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .total-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: 150px;
  }

  .total-item {
    font-weight: 600;
    font-size: 18px;
    line-height: 140%;
  }

  .checkbox {
    width: 24px;
    height: 24px;
    margin-right: 16px;
  }

  .total-number {
    font-weight: 700;
    font-size: 28px;
    line-height: 140%;
    color: ${({ theme }) => theme.text2};
    margin-left: 16px;
  }

  .search-container {
    display: flex;
    justify-content: right;
    flex: 0.5;
    height: 50px;
  }

  .input-container {
    all: unset;
    position: relative;
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    width: 60%;
    border: 1px solid transparent;

    padding-left: 16px;
    padding-right: 50px;
    background-color: ${({ theme }) => theme.bg3};
    caret-color: ${({ theme }) => theme.primary5};

    :hover {
      border: 1px solid ${({ theme }) => theme.border5};
    }

    :focus {
      border: 1px solid ${({ theme }) => theme.border5};
      color: ${({ theme }) => theme.primary5};
    }

    ::placeholder {
      flex: none;
      order: 0;
      flex-grow: 0;
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      color: ${({ theme }) => theme.primary7};
    }
  }

  .search-ic {
    width: 16px;
    height: 16px;
    margin-right: 16px;
  }

  .sort-container {
    display: flex;
    justify-content: right;
    height: 50px;
  }

  .sort-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 16px;
    height: 50px;
    width: 40%;
    padding-left: 16px;
    padding-right: 16px;
    background-color: ${({ theme }) => theme.bg3};
    border-radius: 8px;
    border-width: 1px;
    min-width: 190px;

    :hover {
      border: 1px solid ${({ theme }) => theme.border5};
    }

    :focus {
      border: 1px solid ${({ theme }) => theme.border5};
      color: ${({ theme }) => theme.primary5};
    }
  }

  .sort-text {
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    margin-right: 16px;
  }

  .sort-menu {
    background-color: ${({ theme }) => theme.bg3};
    border-radius: 8px;
    display: flex;
    padding-left: 16px;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
      align-items: center;

      .input-container {
        width: 70%;
      }

      .sort-button {
        margin-top: 16px;
        width: 100%;
      }

    `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToExtraSmall`
      margin-top: 0px;

      .search-container {
        align-items: center;
      }

      .input-container {
        width: 50%;
      }

      .sort-button {
        margin-top: 16px;
        width: auto;
      }

    `}
`;

export enum SortNftType {
  PriceLowToHigh = 'Price low to high',
  PriceHighToLow = 'Price high to low',
  HighestLastSale = 'Highest last sale',
}

interface CollectionDetailFilterProps {
  totalToken: number;
  totalSelectedToken: number;
  keySearch?: string;
  onSearchChange: (event: any) => void;

  sortNftType: SortNftType;
  onChangeNftType: (data: SortNftType) => void;
  onCheckManyItems: () => void;

  titleTotal?: string;
}

const FilterListNFT = (props: CollectionDetailFilterProps) => {
  const { titleTotal, totalToken, totalSelectedToken, keySearch, sortNftType, onChangeNftType } = props;

  const renderSortItem = (key: any, label: string) => {
    const typedString: keyof typeof SortNftType = key;
    return (
      <button onClick={() => onChangeNftType(SortNftType[typedString])}>
        <p>{label}</p>
      </button>
    );
  };

  return (
    <Styled>
      <div className="total-container">
        <img
          className="checkbox"
          src={totalSelectedToken > 0 ? CheckboxActive : Checkbox}
          alt="checkbox-logo"
          onClick={props.onCheckManyItems}
        />
        <p className="total-item">
          {totalSelectedToken > 0
            ? `${totalSelectedToken} / ${totalToken} Selected`
            : `${totalToken} ${titleTotal ? titleTotal : 'Listed'}`}
        </p>
      </div>
      <div className="search-container">
        <div className="input-container">
          <img className="search-ic" src={SearchSVG} />
          <TextInputStyled
            placeholder={'Search by Token ID'}
            type={'text'}
            onChange={props.onSearchChange}
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
            <p className="sort-text">{sortNftType.toString()}</p>
            <img src={ArrowDownSVG} />
          </button>
        </SortSelect>
      </div>
    </Styled>
  );
};

export default React.memo(FilterListNFT);
