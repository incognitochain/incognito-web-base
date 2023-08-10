import useThrottle from 'hooks/useThrottle';
import ReloadBalanceButton from 'pages/IncWebWallet/components/FollowTokenDetail/components/ReloadBalanceButton';
import React, { useCallback } from 'react';
import { ArrowDown, ArrowUp } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import {
  getInscriptionListAPI,
  getQueryInfoSelector,
  getSortBySelector,
  setInscriptionList,
  setSearching,
  setSortBy,
} from 'state/inscriptions';
import styled, { css } from 'styled-components/macro';
import { MediaQueryBuilder } from 'theme/mediaQuery';

import SearchBar from './SearchBar';

export const Container = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  align-self: center;

  min-height: 60px;

  gap: 0.8rem;

  .leftView {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .space {
    width: 30px;
  }

  .rightView {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 0.4rem;
  }

  .sort-order {
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
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
      width: 100%;
    `
  )}
`;

type Props = {
  sortByCallback?: any;
};

const ToolBar = (props: Props) => {
  const { sortByCallback } = props;
  const dispatch = useDispatch();

  const sortByStr = useSelector(getSortBySelector);
  const queryInfo = useSelector(getQueryInfoSelector);

  React.useEffect(() => {}, []);

  const sortByOnClicked = useCallback(() => {
    dispatch(setSortBy({ asc: !queryInfo.asc }));
    dispatch(setInscriptionList([]));
    dispatch(getInscriptionListAPI());
    sortByCallback && sortByCallback();
  }, [sortByStr]);

  const refreshPage = useThrottle(async () => {
    dispatch(setSearching(false));
    dispatch(setInscriptionList([]));
    dispatch(getInscriptionListAPI());
  }, 1500);

  return (
    <Container>
      <div className="leftView">
        <SearchBar />
      </div>
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
