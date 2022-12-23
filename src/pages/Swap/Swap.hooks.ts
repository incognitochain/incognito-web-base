import React from 'react';
import { useParams } from 'react-router-dom';

import { MAP_TOKEN_BY_PAPPS } from './features/FormUnshield/FormUnshield.constants';

const useQuery = () => {
  const params = useParams() as any;
  return React.useMemo(() => {
    return params?.id || '';
  }, [params?.id]);
};

const getQueryPAppName = () => {
  const handleQuery = () => {
    const location = window.location;
    const paths = location.pathname.split('/').filter((path) => !!path);
    let pAppName = '';
    if (paths.length === 2 && paths[0] === 'papps') {
      pAppName = paths[1];
    }
    const isValid = !!MAP_TOKEN_BY_PAPPS[pAppName];
    return { pAppName, isValid };
  };
  return handleQuery();
};

export { getQueryPAppName, useQuery };
