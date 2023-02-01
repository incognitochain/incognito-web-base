/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
import { List } from 'antd';
import debounce from 'lodash/debounce';
import { IToken, selectedTokenIdsAccountSelector, tokensAccountSelector } from 'pages/Pnft';
import FilterListNFT from 'pages/Pnft/components/FilterListNFT';
import { SortNftType } from 'pages/Pnft/components/FilterListNFT/FilterListNFT';
import NFTInfoOverlay from 'pages/Pnft/components/NFTInfoOverlay';
import NFTItem from 'pages/Pnft/components/NFTItem';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';

import { Styled } from './Profile.listNFT.styled';

interface ProfileListNFTFTProps {}

const ProfileListNFT = (props: ProfileListNFTFTProps) => {
  const {} = props;
  const dispatch = useAppDispatch();

  const tokens = useSelector(tokensAccountSelector);
  const selectedTokenIds = useSelector(selectedTokenIdsAccountSelector);

  const [eventMouse, setEventMouse] = React.useState<{ event: any; token: IToken } | undefined>();
  const [reachEnd, setReachend] = React.useState<boolean>(false);

  const [keySearch, setKeySearch] = React.useState<string | undefined>();
  const [currentSortType, setCurrentSortType] = React.useState<SortNftType>(SortNftType.PriceLowToHigh);

  const effectToken = selectedTokenIds && selectedTokenIds.length > 0;

  const onChangeSearch = (e: any) => {
    setKeySearch(e.target.value);
  };

  const onCheckManyItems = () => {};

  const onClickTokenItem = (token: IToken) => {};

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
        titleTotal="Total"
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

export default React.memo(ProfileListNFT);
