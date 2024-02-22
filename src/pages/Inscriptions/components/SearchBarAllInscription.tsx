import SearchBar from 'components/SearchBar';
import useKeySearchInscription from 'hooks/useKeySearchInscription';
import { debounce } from 'lodash';
import React, { useCallback } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
  getInscriptionListAPI,
  getKeySearchSelector,
  queryWithIndexAPI,
  queryWithTokenIdAPI,
  resetSearchState,
  setKeySearch,
  setLoadMore,
  setSearching,
} from 'state/inscriptions';

const SearchBarAllInscription = () => {
  const dispatch = useDispatch();

  const keySearch = useSelector(getKeySearchSelector);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const { checkVaidateKeySearch } = useKeySearchInscription(keySearch);

  const clearState = async () => {
    setErrorMessage(undefined);
    batch(() => {
      dispatch(setSearching(false));
      dispatch(setKeySearch(''));
      dispatch(resetSearchState());
      dispatch(getInscriptionListAPI());
    });
  };

  const searchInscriptionAPI = async (keySearch: string | undefined) => {
    if (!keySearch || keySearch.length < 1) {
      //CALL Get List Default
      clearState();
    } else {
      const { isValid, errorMessage, getDefault, queryIndex } = checkVaidateKeySearch(keySearch);
      if (isValid) {
        // await dispatch(reset());
        dispatch(setLoadMore(false));
        if (getDefault) {
          dispatch(setSearching(false));
          await dispatch(getInscriptionListAPI());
        } else {
          dispatch(setSearching(true));
          if (queryIndex) {
            await dispatch(queryWithIndexAPI(Number(keySearch)));
          } else {
            await dispatch(queryWithTokenIdAPI(keySearch));
          }
        }
      } else {
        setErrorMessage(errorMessage);
      }
    }
  };

  const searchInscriptionDeounce = useCallback(debounce(searchInscriptionAPI, 1000), []);

  const onChangeCallback = (keySearch: string) => {
    dispatch(setKeySearch(keySearch || ''));
    searchInscriptionDeounce(keySearch);
  };

  const onClearCallback = () => {
    dispatch(setKeySearch(''));
    clearState();
  };

  return (
    <SearchBar
      value={keySearch}
      errorMessage={errorMessage}
      placeholder="Search inscriptions with index or token ID"
      onChangeCallback={onChangeCallback}
      onClearCallback={onClearCallback}
    />
  );
};

export default React.memo(SearchBarAllInscription);
