import 'react-modal-video/scss/modal-video.scss';

import { WatchIcon } from 'components/icons';
import React, { memo, useState } from 'react';
import ModalVideo from 'react-modal-video';
import { useHistory } from 'react-router-dom';
import { METRIC_TYPE, METRIC_UNIQ, updateMetric } from 'services/rpcMetric';

import { ButtonWrapper } from './Home.styled';

const GroupButtons = () => {
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);
  // { tokenId1: BIG_COINS.USDT_UNIFIED.tokenID, tokenId2: PRV.id }

  return (
    <ButtonWrapper>
      <div
        className="btn-buy fs-regular"
        onClick={() => {
          updateMetric({ metric: METRIC_TYPE.HOME_GET_PRV, uniqMetric: METRIC_UNIQ.HOME_GET_PRV_UNIQ });
          history.push('/get-prv');
        }}
      >
        Get PRV
      </div>
      <div
        className="btn-watch"
        onClick={() => {
          updateMetric({ metric: METRIC_TYPE.HOME_WATCH_FILM, uniqMetric: METRIC_UNIQ.HOME_WATCH_FILM_UNIQ });
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
