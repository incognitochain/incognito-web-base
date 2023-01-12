/* eslint-disable jsx-a11y/alt-text */
import { Dropdown, Menu } from 'antd';
import ArrowDownSVG from 'assets/images/arrow-down-white.svg';
import SearchSVG from 'assets/svg/search-icon.svg';
import Checkbox from 'pages/Blur/images/checkbox.svg';
import CheckboxActive from 'pages/Blur/images/checkbox-active.svg';
import React from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

const SortSelect = styled(Dropdown)`
  cursor: pointer;
  border: 1px solid transparent;
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
    flex: 0.6;
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
      flex-direction: column;
      justify-content: left;

      .input-container {
        margin-top: 16px;
      }

      .sort-button {
        margin-top: 16px;
        width: 100%;
      }

    `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToExtraSmall`
      margin-top: 0px;

      .search-container {
        flex-direction: column-reverse;
        align-items: center;
      }

      .input-container {
        width: 100%;
      }

      .sort-button {
        margin-top: 16px;
        width: auto;
      }

    `}
`;

export enum SortBlurNftType {
  PriceLowToHigh = 'Price low to high',
  PriceHighToLow = 'Price high to low',
  HighestLastSale = 'Highest last sale',
}

interface CollectionDetailFilterProps {
  totalToken: number;
  totalSelectedToken: number;
  keySearch?: string;
  onSearchChange: (key: string) => void;

  sortBlurNftType: SortBlurNftType;
  onChangeBlurNftType: (data: SortBlurNftType) => void;
  onCheckManyItems: () => void;
}

const CollectionDetailFilter = (props: CollectionDetailFilterProps) => {
  const { totalToken, totalSelectedToken, keySearch, sortBlurNftType, onChangeBlurNftType } = props;

  const onChange = (e: any) => {
    props.onSearchChange(e.target.value);
  };

  const renderSortItem = (key: any, label: string) => {
    const typedString: keyof typeof SortBlurNftType = key;
    return (
      <button onClick={() => onChangeBlurNftType(SortBlurNftType[typedString])}>
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
          {totalSelectedToken > 0 ? `${totalSelectedToken} / ${totalToken} Selected` : `${totalToken} Listed`}
        </p>
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
              items={Object.entries(SortBlurNftType).map(([key, value]) => ({
                key: value,
                label: renderSortItem(key, value),
              }))}
            />
          }
        >
          <button className="sort-button">
            <p className="sort-text">{sortBlurNftType.toString()}</p>
            <img src={ArrowDownSVG} />
          </button>
        </SortSelect>
      </div>
    </Styled>
  );
};

export default React.memo(CollectionDetailFilter);
