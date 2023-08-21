import SearchSVG from 'assets/svg/search-icon.svg';
import React, { useEffect } from 'react';
import { XCircle } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { getKeySearchSelector, setKeySearch } from 'state/inscriptions';
import styled from 'styled-components/macro';

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  .clearSearch {
    :hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
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
  padding: 10px 20px;
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

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const SearchBarMyInscription = (props: Props) => {
  const dispatch = useDispatch();

  const [keySearchError, setKeySearchError] = React.useState<string | undefined>();

  const keySearch = useSelector(getKeySearchSelector);

  const checkVaidateKeySearch = (keySearch: string | undefined) => {
    let isValid = true;
    let errorMessage = undefined;
    let getDefault = false;
    let queryIndex = false;
    if (keySearch && keySearch.length > 0) {
      if (isNaN(Number(keySearch))) {
        queryIndex = false;
        if (keySearch.length !== 64) {
          errorMessage = 'Key search is inavalid';
          isValid = false;
        }
      } else {
        queryIndex = true;
      }
    } else {
      //CALL Get List Default
      getDefault = true;
    }
    setKeySearchError(errorMessage);
    return {
      isValid,
      getDefault,
      errorMessage,
      queryIndex,
    };
  };

  const clearSearchOnClick = async () => {
    dispatch(setKeySearch(''));
  };

  useEffect(() => {
    if (!keySearch || keySearch.length < 1) {
      clearSearchOnClick();
    } else {
      checkVaidateKeySearch(keySearch);
    }
  }, [keySearch]);

  const onChange = (e: any) => {
    const keySearch = e.target.value;
    dispatch(setKeySearch(keySearch));
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
        {keySearch && keySearch.length > 0 && (
          <XCircle color="white" className="clearSearch" onClick={clearSearchOnClick}></XCircle>
        )}
      </Container>
      {keySearchError && <ErrorMessage>{keySearchError}</ErrorMessage>}
    </Column>
  );
};

export default React.memo(SearchBarMyInscription);
