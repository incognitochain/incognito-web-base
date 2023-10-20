import { useMemo } from 'react';

export default function useKeySearchInscription(keySearch?: string) {
  const checkVaidateKeySearch = (keySearch?: string) => {
    let isValid = true;
    let errorMessage = undefined;
    let getDefault = false;
    let queryIndex = false;
    if (keySearch && keySearch.length > 0) {
      if (isNaN(Number(keySearch))) {
        queryIndex = false;
        if (keySearch.length !== 64) {
          errorMessage = 'Key search is inavalid.';
          isValid = false;
        }
      } else {
        queryIndex = true;
      }
    } else {
      //CALL Get List Default
      getDefault = true;
    }

    return {
      isValid,
      getDefault,
      errorMessage,
      queryIndex,
    };
  };

  const result = useMemo(() => {
    return checkVaidateKeySearch(keySearch);
  }, [keySearch]);

  return {
    checkVaidateKeySearch,
    result,
  };
}
