import SearchSVG from 'assets/svg/search-icon.svg';
import { debounce } from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const TextInputStyled = styled.input`
  display: flex;
  flex: 1;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: white;

  ::placeholder {
    flex: none;
    order: 0;
    flex-grow: 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: ${({ theme }) => theme.primary7};
  }
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  min-height: 50px;
  padding: 20px;
  border-radius: 8px;
  border-width: 1px;
  background-color: ${({ theme }) => theme.bg3};
  caret-color: ${({ theme }) => theme.primary5};

  gap: 1rem;

  :hover {
    border: 1px solid ${({ theme }) => theme.color_blue};
  }

  :focus {
    border: 1px solid ${({ theme }) => theme.border5};
    color: ${({ theme }) => theme.primary5};
  }

  .search-ic {
    width: 16px;
    height: 16px;
    :hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;

export const ErrorMessage = styled.p`
  margin-top: 10px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.25rem;
  color: red;
  text-align: left;
`;

type Props = {
  sortByCallback?: any;
};

const SearchBar = (props: Props) => {
  const dispatch = useDispatch();

  const [keySearch, setKeySearch] = React.useState<string | undefined>();
  const [keySearchError, setKeySearchError] = React.useState<string | undefined>();

  const checkVaidateKeySearch = (keySearch: string) => {
    let isValid = true;
    let errorMessage = undefined;
    console.log('TEST checkVaidateKeySearch  ', keySearch);
    if (keySearch && keySearch.length > 0) {
      console.log('TEST 111 ');
      if (isNaN(Number(keySearch))) {
        console.log('TEST 2222 ');
        if (keySearch.length !== 64) {
          errorMessage = 'Key search is inavalid';
          isValid = false;
        }
      }
      console.log('TEST useEffect keySearch ', keySearch);
    } else {
      console.log('TEST 555 ');
      //CALL Get List Default
    }

    return {
      isValid,
      errorMessage,
    };
  };

  const searchInscriptionAPI = (keySearch: string | undefined) => {
    console.log('TEST keySearch ', keySearch);
    if (!keySearch || keySearch.length < 1) {
      //CALL Get List Default
      console.log('TEST CALL Get List Default ');
    } else {
      const { isValid, errorMessage } = checkVaidateKeySearch(keySearch);
      if (isValid) {
        //CALL Search API
        console.log('TEST API Search ');
      } else {
        setKeySearchError(errorMessage);
      }
    }
  };

  const searchInscriptionDeounce = useCallback(debounce(searchInscriptionAPI, 1000), []);

  useEffect(() => {
    searchInscriptionDeounce(keySearch);
  }, [keySearch]);

  const onChange = (e: any) => {
    const keySearch = e.target.value;
    console.log('TEST onChange keySearch ', keySearch);
    setKeySearch(keySearch || '');
  };

  return (
    <Column>
      <Container>
        <img className="search-ic" src={SearchSVG} alt="searchInscriptions" key="searchInscriptions" />
        <TextInputStyled
          placeholder={'Search inscriptions with index or token ID'}
          type={'text'}
          onChange={onChange}
          value={keySearch}
          autoFocus={false}
        />
      </Container>
      {keySearchError && <ErrorMessage>{keySearchError}</ErrorMessage>}
    </Column>
  );
};

export default React.memo(SearchBar);
