import SearchBar from 'components/SearchBar';
import useKeySearchInscription from 'hooks/useKeySearchInscription';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKeySearchSelector, setKeySearch } from 'state/inscriptions';

const SearchBarMyInscription = () => {
  const dispatch = useDispatch();
  const keySearch = useSelector(getKeySearchSelector);
  const { result } = useKeySearchInscription(keySearch);

  const onChangeCallback = (keySearch: string) => {
    dispatch(setKeySearch(keySearch));
  };

  const onClearCallback = () => {
    dispatch(setKeySearch(''));
  };

  return (
    <SearchBar
      onChangeCallback={onChangeCallback}
      onClearCallback={onClearCallback}
      value={keySearch}
      placeholder="Search inscriptions with index or token ID"
      errorMessage={result?.errorMessage}
    />
  );
};

export default React.memo(SearchBarMyInscription);
