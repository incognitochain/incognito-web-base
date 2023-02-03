/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
import debounce from 'lodash/debounce';
import { actionFetchAccountNFTs } from 'pages/Pnft/Pnft.actions';
import { addressAccountSelector, isFetchingNftsAccountSelector, nftsAccountSelector } from 'pages/Pnft/Pnft.selectors';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

import { HeaderList, renderHeader, renderNFTItem, ShowListType } from './Profile.components';
import { ListStyled, Styled } from './Profile.listNFT.styled';
import ProfileLoader from './Profile.loader';

interface ProfileListNFTFTProps {}

const ProfileListNFT = (props: ProfileListNFTFTProps) => {
  const dispatch = useDispatch();

  const address = useSelector(addressAccountSelector);
  const isFetching = useSelector(isFetchingNftsAccountSelector);
  const nfts = useSelector(nftsAccountSelector);

  const showLoader = isFetching && nfts.length <= 0;

  const [currentListType, setCurrentListType] = React.useState(ShowListType.all.valueOf());

  React.useEffect(() => {
    dispatch(actionFetchAccountNFTs(address));
  }, []);

  const onLoadMoreCollections = () => {};

  const debounceLoadMore = debounce(onLoadMoreCollections, 300);

  return (
    <Styled>
      <HeaderList currentListType={currentListType} setCurrentListType={setCurrentListType} />
      {showLoader && <ProfileLoader />}
      <ListStyled showLoader={showLoader}>
        {renderHeader()}
        <InfiniteScroll
          dataLength={nfts.length}
          hasMore={true}
          next={debounceLoadMore}
          loader={<div />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {nfts.map((item, index) => renderNFTItem({ nft: item, index }))}
        </InfiniteScroll>
      </ListStyled>
    </Styled>
  );
};

export default React.memo(ProfileListNFT);
