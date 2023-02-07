/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
import debounce from 'lodash/debounce';
import {
  actionFetchAccountNFTs,
  actionSetSelectedAccountNftId,
  clearSelectedAccountNftIds,
  selectAllAccountNftIds,
} from 'pages/Pnft/Pnft.actions';
import { INFT } from 'pages/Pnft/Pnft.interface';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';

import { HeaderList, renderHeader, renderNFTItem, ShowListType } from './Profile.components';
import { ListStyled, Styled } from './Profile.listNFT.styled';
import ProfileLoader from './Profile.loader';

interface ProfileListNFTFTProps {
  isFetching: boolean;
  address: string;
  selectedNftIds: string[];
  nfts: INFT[];
  currentListType: ShowListType;
  setCurrentListType: (type: ShowListType) => void;
}

const ProfileListNFT = (props: ProfileListNFTFTProps) => {
  const { isFetching, address, nfts, selectedNftIds, currentListType, setCurrentListType } = props;
  const dispatch = useDispatch();

  const showLoader = isFetching && nfts.length <= 0;

  React.useEffect(() => {
    if (!address) return;
    dispatch(actionFetchAccountNFTs(address));
  }, [address]);

  const onClickCheckbox = () => {
    dispatch(selectedNftIds.length > 0 ? clearSelectedAccountNftIds() : selectAllAccountNftIds());
  };

  const onClickCheckboxItem = (tokenId: string) => {
    dispatch(actionSetSelectedAccountNftId(tokenId));
  };

  const onLoadMoreCollections = () => {};

  const debounceLoadMore = debounce(onLoadMoreCollections, 300);

  return (
    <Styled>
      <HeaderList currentListType={currentListType.valueOf()} setCurrentListType={setCurrentListType} />
      {showLoader && <ProfileLoader />}
      <ListStyled showLoader={showLoader}>
        {renderHeader({ total: nfts.length, selectedNftIds, onClickCheckbox })}
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
          {nfts.map((item, index) => renderNFTItem({ nft: item, index, selectedNftIds, onClickCheckboxItem }))}
        </InfiniteScroll>
      </ListStyled>
    </Styled>
  );
};

export default React.memo(ProfileListNFT);
