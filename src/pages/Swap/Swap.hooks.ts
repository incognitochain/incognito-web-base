import React from 'react';
import { useLocation } from 'react-router-dom';

import { MAP_TOKEN_BY_PAPPS } from './features/FormUnshield/FormUnshield.constants';

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);
};

const getQueryPAppName = () => {
  const handleQuery = () => {
    const pAppName = new URLSearchParams(window.location.search).get('name');
    const isValid = !!MAP_TOKEN_BY_PAPPS[pAppName || ''];
    return { pAppName, isValid };
  };
  return handleQuery();
};

export { getQueryPAppName, useQuery };
