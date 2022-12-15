import { WatchIcon } from 'components/icons';
import { BIG_COINS, PRV } from 'constants/token';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

import { ButtonWrapper } from './Home.styled';

const GroupButtons = () => {
  const history = useHistory();
  return (
    <ButtonWrapper>
      <div
        className="btn-buy fs-regular"
        onClick={() => history.push('/swap', { tokenId1: BIG_COINS.ETH_UNIFIED.tokenID, tokenId2: PRV.id })}
      >
        Get PRV
      </div>
      <div className="btn-watch">
        <WatchIcon />
        <p className="text-watch fs-regular">Watch the film</p>
      </div>
    </ButtonWrapper>
  );
};

export default memo(GroupButtons);
