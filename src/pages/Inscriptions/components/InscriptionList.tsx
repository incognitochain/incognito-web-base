import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { delay } from 'utils/timeUtils';

import InscriptionItem from './InscriptionItem';
import { Container, InfiniteScrollContainer, SpinStyled } from './InscriptionList.styled';

const INIT_NUMBNER = 30;

const InscriptionList = () => {
  const [hasLoadMore, setHasLoadMore] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [dataList, setDataList] = useState<any[]>(Array(INIT_NUMBNER).fill('1'));

  const fetchInscriptionsAPI = useCallback(async () => {
    console.log('PHAT fetchInscriptionsAPI: 111 ');
    if (!isFetching) {
      console.log('PHAT fetchInscriptionsAPI: 2222 ');
      setFetching(true);
      await delay(1000);
      console.log('====================================');
      console.log('PHAT OLD LIST: ', dataList.length);
      console.log('====================================');
      const newInscriptionList = Array(INIT_NUMBNER).fill('1');
      setDataList([...dataList, ...newInscriptionList]);
      await delay(1000);
      console.log('====================================');
      console.log('PHAT NEW LIST: ', dataList.length);
      console.log('====================================');
      setFetching(false);

      if (!newInscriptionList || newInscriptionList.length < 1) {
        setHasLoadMore(false);
      } else {
        setHasLoadMore(true);
      }
      console.log('PHAT fetchInscriptionsAPI: 333 ');
    }
  }, [isFetching, hasLoadMore, dataList]);

  useEffect(() => {
    fetchInscriptionsAPI();
  }, []);

  const renderItem = (item: any) => {
    return <InscriptionItem item={item}></InscriptionItem>;
  };

  const loadMoreHandler = useCallback(async () => {
    console.log('PHAT loadMoreHandler .... ');
    if (hasLoadMore && !isLoadingMore) {
      setLoadingMore(true);
      await fetchInscriptionsAPI();
      setLoadingMore(false);
    }
  }, [hasLoadMore, isLoadingMore]);

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
