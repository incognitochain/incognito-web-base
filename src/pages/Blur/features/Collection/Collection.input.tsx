import { Select } from 'antd';
import ImagePlaceholder from 'components/ImagePlaceholder';
import debounce from 'lodash/debounce';
import { ICollection } from 'pages/Blur/Blur.interface';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { rpcPBlur } from 'services';
import styled from 'styled-components/macro';

import { getSearchURL } from '../CollectionDetail';

const Container = styled.div`
  display: flex;
  width: 300px;
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 8px;

  .ant-select-selector {
    background-color: transparent !important;
    height: 55px !important;
    border-radius: 8px !important;
    overflow: hidden;
    //padding-left: 34px;
  }

  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-color: ${({ theme }) => theme.btn1} !important;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: 1px solid ${({ theme }) => theme.border1};
  }
  .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: ${({ theme }) => theme.btn1} !important;
    border-right-width: 1px;
  }

  span {
    color: ${({ theme }) => theme.text1};
    line-height: 55px !important;
    font-size: 18px;
    //margin-left: 34px;
  }

  input {
    color: ${({ theme }) => theme.text1};
    height: 55px !important;
    font-size: 18px;

    //margin-left: 34px;
  }

  .ant-select-selection-placeholder {
    color: ${({ theme }) => theme.text1};
    opacity: 0.8;
  }
  &.dropdown-container {
    padding: 12px;
    border-radius: 8px;
  }
`;

const Search = styled(Select)`
  flex: 1;
  background-color: transparent;
  caret-color: ${({ theme }) => theme.primary5};
`;

const DropdownContainer = styled.div`
  padding: 8px;
  border-radius: 8px;
  max-height: 500px;
  overflow-y: scroll;
`;

const DropdownItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 8px;
  border-radius: 8px;
  cursor: pointer;
  align-items: center;
  :hover {
    background-color: ${({ theme }) => theme.bg4};
    opacity: 0.9;
  }
  .logo {
    width: 42px;
    height: 42px;
    border-radius: 8px;
  }
  .collection-name {
    font-size: 16px;
    margin-left: 12px;
  }
`;

const SearchInput = () => {
  const [collections, setCollections] = React.useState<ICollection[]>([]);
  const history = useHistory();
  const mockupData = [
    {
      value: 'selection',
      text: 'selection',
    },
  ];

  const handleSearch = async (newValue: string) => {
    if (newValue && newValue.length >= 3) {
      const collections = await rpcPBlur.getCollections({ page: 1, query: newValue });
      setCollections(collections);
    } else {
      setCollections([]);
    }
  };

  const debounceSearch = debounce(handleSearch, 300);

  const renderItem = (collection: ICollection) => {
    return (
      <DropdownItem
        key={collection.name}
        onClick={() => history.push(getSearchURL({ slug: collection.collectionSlug }))}
      >
        <ImagePlaceholder className="logo" src={collection.imageUrl} />
        <p className="collection-name">{collection.name}</p>
      </DropdownItem>
    );
  };

  return (
    <Container>
      <Search
        showSearch
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        autoClearSearchValue={false}
        allowClear={false}
        placeholder="Search collections"
        onSearch={debounceSearch}
        onKeyDown={(event: any) => {
          if (event.keyCode === 13) {
            event.preventDefault();
          }
        }}
        notFoundContent={null}
        options={(mockupData || []).map((d) => ({
          value: d.value,
          label: d.text,
        }))}
        dropdownStyle={{
          background: !collections || collections.length === 0 ? 'transparent' : '#303030',
          borderRadius: 4,
        }}
        dropdownRender={() => {
          if (!collections || collections.length === 0) return <div />;
          return <DropdownContainer>{collections.map(renderItem)}</DropdownContainer>;
        }}
      />
    </Container>
  );
};

export default SearchInput;
