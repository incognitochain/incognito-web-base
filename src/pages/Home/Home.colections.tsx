import { Row } from 'antd';
import swapAnim from 'assets/swap.json';
import useAnim from 'assets/use.json';
import { LinkIcon } from 'components/icons';
import React, { memo } from 'react';
import { isMobile } from 'react-device-detect';
import Lottie from 'react-lottie';
import { useHistory } from 'react-router-dom';
import { METRIC_TYPE, METRIC_UNIQ, updateMetric } from 'services/rpcMetric';

import { CollectionItem, CollectionWrapper } from './Home.styled';
import GetPRVImg from './images/GetPRV.png';
import PNodeImg from './images/pnode.png';

const SwapAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: swapAnim as any,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return <Lottie style={{ width: '85%', aspectRatio: '312 / 120', height: 'fit-content' }} options={defaultOptions} />;
};

const UseAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: useAnim as any,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return <Lottie style={{ width: '85%', aspectRatio: '326 / 164', height: 'fit-content' }} options={defaultOptions} />;
};

const Collections = () => {
  const history = useHistory();
  const renderHeader = ({ title, desc, showIcon = true }: { title: string; desc: string; showIcon?: boolean }) => {
    return (
      <div className="header">
        <Row justify="space-between">
          <h6>{title}</h6>
          {showIcon && <LinkIcon />}
        </Row>
        <p className="h8 sub-header">{desc}</p>
      </div>
    );
  };

  const openLink = ({ link, tokenID1, tokenID2 }: { link: string; tokenID1?: string; tokenID2?: string }) => {
    // history.push('/', { tokenId1: r?.token1ID, tokenId2: r?.token2ID });
    history.push(link, {});
  };

  return (
    <CollectionWrapper className="default-max-width">
      <CollectionItem
        onClick={() => {
          updateMetric({ metric: METRIC_TYPE.HOME_APP_GET_PRV, uniqMetric: METRIC_UNIQ.HOME_APP_GET_PRV_UNIQ });
          openLink({ link: '/get-prv' });
        }}
      >
        {renderHeader({
          title: 'PRV',
          desc: 'Native cryptocurrency of Incognito, power all privacy activities.',
          showIcon: !isMobile,
        })}
        <img className="swap-image" src={GetPRVImg} alt="image" />
        {/*<SwapAnimation />*/}
      </CollectionItem>
      <CollectionItem
        onClick={() => {
          updateMetric({ metric: METRIC_TYPE.HOME_MINE, uniqMetric: METRIC_UNIQ.HOME_MINE_UNIQ });
          openLink({ link: '/mine/validator' });
        }}
      >
        {renderHeader({ title: 'Mine', desc: 'Power privacy with a beautiful device.' })}
        <img className="pnode-image" src={PNodeImg} alt="image" />
      </CollectionItem>
      <CollectionItem
        onClick={() => {
          updateMetric({ metric: METRIC_TYPE.HOME_PAPPS, uniqMetric: METRIC_UNIQ.HOME_PAPPS_UNIQ });
          openLink({ link: '/papps' });
        }}
      >
        {renderHeader({ title: 'Use', desc: 'Use Uniswap and 10+ dapps privately.' })}
        {/*<img className="dapps-image" src={DAppsImg} alt="image" />*/}
        <UseAnimation />
      </CollectionItem>
    </CollectionWrapper>
  );
};

export default memo(Collections);
