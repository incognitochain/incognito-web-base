import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHasLoadMoreSelector,
  getInscriptionListAPI,
  getInscriptionListSelector,
  resetState,
} from 'state/inscriptions';

import InscriptionItem from './InscriptionItem';
import { Container, InfiniteScrollContainer, SpinStyled } from './InscriptionList.styled';

const InscriptionList = () => {
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const dataList = useSelector(getInscriptionListSelector);
  const hasLoadMore = useSelector(getHasLoadMoreSelector);

  const dispatch = useDispatch();

  const fetchInscriptionsAPI = useCallback(async () => {
    if (!isFetching) {
      setFetching(true);
      await dispatch(getInscriptionListAPI());
      setFetching(false);
    }
  }, [setFetching, isFetching, hasLoadMore, dataList]);

  useEffect(() => {
    fetchInscriptionsAPI();
  }, []);

  const resetPageState = useCallback(() => {
    dispatch(resetState());
  }, []);

  const renderItem = (item: any) => {
    return <InscriptionItem item={item} onClickCallback={resetPageState}></InscriptionItem>;
  };

  const loadMoreHandler = useCallback(async () => {
    if (hasLoadMore && !isLoadingMore) {
      setLoadingMore(true);
      await fetchInscriptionsAPI();
      setLoadingMore(false);
    }
  }, [setLoadingMore, hasLoadMore, isLoadingMore]);

  return (
    <Container>
      <InfiniteScrollContainer>
        <InfiniteScroll className="gridView" loadMore={loadMoreHandler} hasMore={hasLoadMore} threshold={5}>
          {dataList && dataList.length > 0 && dataList.map((item, index) => renderItem(item))}
        </InfiniteScroll>
        {isLoadingMore && (
          <div className="load-more-loading">
            <SpinStyled tip="Loading..." size="large" />
          </div>
        )}
      </InfiniteScrollContainer>
    </Container>
  );
};

export default React.memo(InscriptionList);
