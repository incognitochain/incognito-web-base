import { WalletState } from 'pages/IncWebWallet/core/types';
import useUnlockWallet from 'pages/IncWebWallet/hooks/useUnlockWalelt';
import { RoutePaths } from 'pages/Routes';
import React, { useCallback } from 'react';
import { File } from 'react-feather';
import InfiniteScroll from 'react-infinite-scroller';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMyInscriptionSortedList } from 'state/inscriptions';
import { webWalletStateSelector } from 'state/masterKey';

import InscriptionItem from './InscriptionItem';
import { ButtonConfirm, Container, CreateInscriptionNow, InfiniteScrollContainer } from './InscriptionList.styled';

const InscriptionList = () => {
  const history = useHistory();
  const { showUnlockModal } = useUnlockWallet();
  const myInscriptionList = useSelector(getMyInscriptionSortedList);
  const walletState = useSelector(webWalletStateSelector);

  const _walletAction = () => showUnlockModal();

  // const dispatch = useDispatch();

  const inscribeNowOnClick = useCallback(() => {
    history.push(RoutePaths.CREATE_INSCRIPTION);
  }, []);

  const renderItem = (item: any, index: number) => {
    return <InscriptionItem item={item} key={`${item?.token_id}-${index}}`}></InscriptionItem>;
  };

  const renderEmptyList = () => {
    return (
      <div className="emptyList">
        <File color="white" size={100} />
        <p className="emptyText">{'No Recent Inscriptions'}</p>
        <CreateInscriptionNow onClick={inscribeNowOnClick}>Create Now</CreateInscriptionNow>
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
