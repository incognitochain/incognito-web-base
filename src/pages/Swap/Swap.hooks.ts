import React from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);
};

const getPlatform = () => {
  return () => {
    return new URLSearchParams(window.location.search).get('platform') as any;
  };
};

export { getPlatform, useQuery };
