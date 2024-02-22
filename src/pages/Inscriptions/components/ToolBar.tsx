// import SearchBar from 'components/SearchBar';
import useThrottle from 'hooks/useThrottle';
import ReloadBalanceButton from 'pages/IncWebWallet/components/FollowTokenDetail/components/ReloadBalanceButton';
import React, { useCallback } from 'react';
import { ArrowDown, ArrowUp } from 'react-feather';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
  getInscriptionListAPI,
  getIsMyInscriptionPage,
  getQueryInfoSelector,
  getSortBySelector,
  setInscriptionList,
  setSearching,
  setSortBy,
} from 'state/inscriptions';
import styled, { css } from 'styled-components/macro';
import { MediaQueryBuilder } from 'theme/mediaQuery';

import SearchBarAllInscription from './SearchBarAllInscription';
import SearchBarMyInscription from './SearchBarMyInscription';

export const Container = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  min-height: 50px;

  gap: 0.8rem;

  .leftView {
    display: flex;
    flex: 1;
    align-self: center;
    flex-direction: row;
    justify-content: flex-start;
  }

  .space {
    width: 30px;
  }

  .rightView {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 0.4rem;
  }

  .sort-order {
    display: flex;
    flex-direction: row;
    margin-right: 5px;
    padding: 8px 10px;
    align-items: center;
    /* background-color: ${({ theme }) => theme.primary2}; */
    background-color: 'transparent';
    border: 1px solid ${({ theme }) => theme.color_grey4};
    border-radius: 8px;
    gap: 0.2rem;

    :hover {
      cursor: pointer;
      opacity: 0.8;
      scale: 1.02;
    }

    .text {
      align-self: center;
      font-weight: 500;
      font-size: 1.125rem;
      line-height: 1.75rem;
      width: max-content;
      white-space: nowrap;
      color: ${({ theme }) => theme.primary5};
    }
  }

  ${MediaQueryBuilder(
    'upToLarge',
    css`
      width: 100%;
    `
  )}
  ${MediaQueryBuilder(
    'upToMedium',
    css`
      flex-direction: column;
      justify-content: left;
      align-items: baseline;
      width: 100%;

      .leftView {
        width: inherit;
      }
      .rightView {
      }
    `
  )}
`;

const ToolBar = () => {
  const dispatch = useDispatch();
  const isMyInscriptionPage = useSelector(getIsMyInscriptionPage);

  const sortByStr = useSelector(getSortBySelector);
  const queryInfo = useSelector(getQueryInfoSelector);

  const sortByOnClicked = useCallback(() => {
    batch(() => {
      dispatch(setSortBy({ asc: !queryInfo.asc }));
      dispatch(setInscriptionList([]));
      dispatch(getInscriptionListAPI());
    });
  }, [sortByStr, isMyInscriptionPage]);

  const refreshPage = useThrottle(async () => {
    if (!isMyInscriptionPage) {
      batch(() => {
        dispatch(setSearching(false));
        dispatch(setInscriptionList([]));
        dispatch(getInscriptionListAPI());
      });
    } else {
    }
  }, 1500);

  return (
    <Container>
      <div className="leftView">{isMyInscriptionPage ? <SearchBarMyInscription /> : <SearchBarAllInscription />}</div>
      <div className="space"></div>
      <div className="rightView">
        <ReloadBalanceButton key={'refresh-inscription-page'} onClickCallback={refreshPage} />,
        <div className="sort-order" onClick={sortByOnClicked}>
          <p className="text">{`Sort By: ${sortByStr}`}</p>
          {sortByStr === 'Latest' ? <ArrowUp color="white" /> : <ArrowDown color="white" />}
        </div>
      </div>
    </Container>
  );
};

export default React.memo(ToolBar);
