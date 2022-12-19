import 'react-modal-video/scss/modal-video.scss';

import { WatchIcon } from 'components/icons';
import { BIG_COINS, PRV } from 'constants/token';
import React, { memo, useState } from 'react';
import ModalVideo from 'react-modal-video';
import { useHistory } from 'react-router-dom';

import { ButtonWrapper } from './Home.styled';

const GroupButtons = () => {
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);
  return (
    <ButtonWrapper>
      <div
        className="btn-buy fs-regular"
        onClick={() => history.push('/swap', { tokenId1: BIG_COINS.USDC_UNIFIED.tokenID, tokenId2: PRV.id })}
      >
        Get PRV
      </div>
      <div
        className="btn-watch"
        onClick={() => {
          setOpen(true);
        }}
      >
        <WatchIcon />
        <p className="text-watch fs-regular">Watch the film</p>
      </div>
      <ModalVideo
        channel="youtube"
        allowFullScreen={true}
        isOpen={isOpen}
        youtube={{ mute: 0, autoplay: 1 }}
        videoId="bafTu0kGfq4"
        onClose={() => setOpen(false)}
      />
    </ButtonWrapper>
  );
};

export default memo(GroupButtons);
