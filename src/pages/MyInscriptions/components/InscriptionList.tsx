import { WalletState } from 'pages/IncWebWallet/core/types';
import useNFTCoins from 'pages/IncWebWallet/hooks/useNFTCoins';
import useUnlockWallet from 'pages/IncWebWallet/hooks/useUnlockWalelt';
import React, { useCallback, useEffect, useState } from 'react';
import { File } from 'react-feather';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { getMyInscriptionListAPI, getMyInscriptionSortedList } from 'state/inscriptions';
import { webWalletStateSelector } from 'state/masterKey';

import InscriptionItem from './InscriptionItem';
import { ButtonConfirm, Container, InfiniteScrollContainer } from './InscriptionList.styled';

const InscriptionList = () => {
  const { showUnlockModal } = useUnlockWallet();
  const [isFetching, setFetching] = useState(false);
  const myInscriptionList = useSelector(getMyInscriptionSortedList);
  const walletState = useSelector(webWalletStateSelector);

  const { assetTagList: nftAssetTags } = useNFTCoins();

  const _walletAction = () => showUnlockModal();

  const dispatch = useDispatch();

  const fetchMyInscriptionsAPI = useCallback(async () => {
    if (!isFetching) {
      setFetching(true);
      if (nftAssetTags) {
        dispatch(
          getMyInscriptionListAPI({
            assetTagList: nftAssetTags,
          })
        );
      }
      setFetching(false);
    }
  }, [setFetching, isFetching, nftAssetTags, myInscriptionList]);

  useEffect(() => {
    fetchMyInscriptionsAPI();
  }, [nftAssetTags]);

  const renderItem = (item: any, index: number) => {
    return <InscriptionItem item={item} key={`${item?.token_id}-${index}}`}></InscriptionItem>;
  };

  const renderEmptyList = () => {
    return (
      <div className="emptyList">
        <File color="white" size={100} />
        <p className="emptyText">Data Empty</p>;
      </div>
    );
  };

  const renderList = () => {
    return (
      <InfiniteScrollContainer>
        <InfiniteScroll className="gridView" loadMore={() => {}} hasMore={false} threshold={5}>
          {myInscriptionList &&
            myInscriptionList.length > 0 &&
            myInscriptionList.map((item, index) => renderItem(item, index))}
        </InfiniteScroll>
        {/* {isLoadingMore && (
          <div className="load-more-loading">
            <SpinStyled tip="Loading..." size="large" />
          </div>
        )} */}
      </InfiniteScrollContainer>
    );
  };

  const renderContentView = () => {
    if (walletState === WalletState.unlocked) {
      if (!myInscriptionList || myInscriptionList.length < 1) {
        return renderEmptyList();
      } else {
        return renderList();
      }
    } else {
      return (
        <ButtonConfirm onClick={_walletAction}>
          <p className="text">{walletState === WalletState.locked ? 'Unlock Wallet' : 'Create Wallet'}</p>
        </ButtonConfirm>
      );
    }
  };

  return <Container>{renderContentView()}</Container>;
};

export default React.memo(InscriptionList);
