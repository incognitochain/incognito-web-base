/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
import { List } from 'antd';
import debounce from 'lodash/debounce';
import {
  actionFetchCollectionTokens,
  clearSelectedTokens,
  IToken,
  lastTokenSelector,
  selectedTokenIdsSelector,
  selectMaxBuyTokens,
  tokensSelector,
} from 'pages/Pnft';
import FilterListNFT from 'pages/Pnft/components/FilterListNFT';
import { SortNftType } from 'pages/Pnft/components/FilterListNFT/FilterListNFT';
import NFTInfoOverlay from 'pages/Pnft/components/NFTInfoOverlay';
import NFTItem from 'pages/Pnft/components/NFTItem';
import { actionFetchMoreCollectionTokens, actionSetSelectedTokenId } from 'pages/Pnft/Pnft.actions';
import { MAX_GET_ITEM } from 'pages/Pnft/Pnft.reducer';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';

import { Styled } from './CollectionDetail.listNFT.styled';

interface CollectionDetailListNFTProps {
  slug: string;
}

const CollectionDetailListNFT = (props: CollectionDetailListNFTProps) => {
  const { slug } = props;
  const dispatch = useAppDispatch();

  const tokens = useSelector(tokensSelector);
  const selectedTokenIds = useSelector(selectedTokenIdsSelector);

  const lastToken = useSelector(lastTokenSelector);

  const [eventMouse, setEventMouse] = React.useState<{ event: any; token: IToken } | undefined>();
  const [reachEnd, setReachend] = React.useState<boolean>(false);

  const [keySearch, setKeySearch] = React.useState<string | undefined>();
  const [currentSortType, setCurrentSortType] = React.useState<SortNftType>(SortNftType.PriceLowToHigh);

  const effectToken = selectedTokenIds && selectedTokenIds.length > 0;

  const debouncedSearchRef = React.useRef(
    debounce((text: string) => dispatch(actionFetchCollectionTokens(slug, text)), 500)
  );

  React.useEffect(() => {
    dispatch(actionFetchCollectionTokens(slug));
  }, []);

  React.useEffect(() => {
    if (reachEnd && lastToken && !lastToken.isLoading) {
      setReachend(false);
      if (tokens.length % MAX_GET_ITEM === 0) {
        const nextPage = Math.floor(tokens.length / MAX_GET_ITEM) + 1;
        dispatch(actionFetchMoreCollectionTokens(nextPage, slug, keySearch));
      }
    }
  }, [lastToken, reachEnd]);

  const onChangeSearch = (e: any) => {
    setKeySearch(e.target.value);
    debouncedSearchRef.current(e.target.value);
  };

  const onCheckManyItems = () => {
    dispatch(selectedTokenIds.length > 0 ? clearSelectedTokens() : selectMaxBuyTokens());
  };

  const onClickTokenItem = (token: IToken) => {
    dispatch(actionSetSelectedTokenId(token.tokenId));
  };

  const onLoadMoreTokens = () => {
    setReachend(true);
  };

  const debounceLoadMore = debounce(onLoadMoreTokens, 300);

  return (
    <Styled>
      <FilterListNFT
        totalToken={tokens.length}
        totalSelectedToken={selectedTokenIds.length}
        keySearch={keySearch}
        onSearchChange={onChangeSearch}
        sortNftType={currentSortType}
        onChangeNftType={(type) => setCurrentSortType(type)}
        onCheckManyItems={onCheckManyItems}
      />
      <InfiniteScroll dataLength={tokens.length} next={debounceLoadMore} hasMore={true} loader={<div />}>
        <List
          className="list"
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
            xxl: 5,
          }}
          dataSource={tokens}
          renderItem={(item: IToken, index: number) => (
            <NFTItem
              key={index.toString()}
              token={item}
              selectedTokenIds={selectedTokenIds}
              effectToken={effectToken}
              onClickTokenItem={onClickTokenItem}
              onMouseEnterIcInfo={(event, token) => setEventMouse({ event, token })}
              onMouseLeaveIcInfo={() => setEventMouse(undefined)}
            />
          )}
        />
      </InfiniteScroll>
      {eventMouse && <NFTInfoOverlay event={eventMouse.event} token={eventMouse.token} />}
    </Styled>
  );
};

export default React.memo(CollectionDetailListNFT);
