import { Row } from 'antd';
import { LinkIcon } from 'components/icons';
import React, { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { useHistory } from 'react-router-dom';

import { CollectionItem, CollectionWrapper } from './Home.styled';
import DAppsImg from './images/dapps.png';
import PNodeImg from './images/pnode.png';
import SwapImg from './images/swap.png';

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
    if (isMobile) return;
    // history.push('/', { tokenId1: r?.token1ID, tokenId2: r?.token2ID });
    history.push(link, {});
  };

  return (
    <CollectionWrapper className="default-max-width">
      <CollectionItem onClick={() => openLink({ link: '/swap' })}>
        {renderHeader({ title: 'Swap', desc: 'Trade 100+ cryptocurrencies anonymously.', showIcon: !isMobile })}
        <img className="swap-image" src={SwapImg} alt="image" />
      </CollectionItem>
      <CollectionItem onClick={() => openLink({ link: '/mine' })}>
        {renderHeader({ title: 'Mine', desc: 'Power privacy with a beautiful device.' })}
        <img className="pnode-image" src={PNodeImg} alt="image" />
      </CollectionItem>
      <CollectionItem onClick={() => openLink({ link: '/use' })}>
        {renderHeader({ title: 'Use', desc: 'Use Uniswap and 10+ dapps privately.' })}
        <img className="dapps-image" src={DAppsImg} alt="image" />
      </CollectionItem>
    </CollectionWrapper>
  );
};

export default memo(Collections);
