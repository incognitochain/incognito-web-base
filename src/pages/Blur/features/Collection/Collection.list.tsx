import debounce from 'lodash/debounce';
import { ICollection, renderHeader, renderItem } from 'pages/Blur';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';

import CollectionLoader from './Collection.loader';
import { ContainerListStyled, ListStyled } from './Collection.styled';

interface IListProps {
  isFetching: boolean;
  collections: ICollection[];
  fetchCollections: ({ page }: { page: number }) => void;
}

const List = (props: IListProps) => {
  const { isFetching, collections, fetchCollections } = props;
  const showLoader = isFetching && collections.length <= 0;
  const history = useHistory();

  const onLoadMoreCollections = () => {
    if (isFetching || typeof fetchCollections !== 'function') return;
    const nextPage = Math.floor(collections.length / 100) + 1;
    fetchCollections({ page: nextPage });
  };

  const debounceLoadMore = debounce(onLoadMoreCollections, 300);

  return (
    <ContainerListStyled>
      {showLoader && <CollectionLoader />}
      <ListStyled showLoader={showLoader}>
        {renderHeader({ removeIndex: false })}
        <InfiniteScroll
          dataLength={collections.length}
          next={debounceLoadMore}
          hasMore={true}
          loader={<div />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {collections.map((item, index) => renderItem({ collection: item, index, history }))}
        </InfiniteScroll>
      </ListStyled>
    </ContainerListStyled>
  );
};

export default React.memo(List);
