/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import spookyImg from 'assets/images/spooky-icon.png';
import icClock from 'assets/svg/ic-clock.svg';
import icDesciption from 'assets/svg/ic-description.svg';
import icGaming from 'assets/svg/ic-gaming.svg';
import icInfo from 'assets/svg/ic-info.svg';
import icStar from 'assets/svg/ic-star.svg';
import icVerify from 'assets/svg/ic-verify.svg';
import icView from 'assets/svg/ic-view.svg';
import Expandable from 'components/Expandable';
import React, { memo } from 'react';

import POpenseaNFTDetailSubRoute from './components/POpenseaNFTDetail.subRoute';
import { Styled, WrapperContent } from './POpenseaNFTDetail.styled';

const renderSectionBottom = () => {
  const renderOverviewNFTComponent = () => {
    return (
      <React.Fragment>
        <div className="artis-container">
          <a className="artis">Wolf Game</a>
          <img src={icVerify} />
        </div>

        <p className="name">Sheep #13760</p>
        <p className="owner-by">
          Owner by <a>33489</a>
        </p>
        <div className="view-container">
          <div className="view-content">
            <img src={icView} />
            <p className="view-title">10 views</p>
          </div>
          <div className="view-content">
            <img src={icStar} />
            <p className="view-title">10 favorites</p>
          </div>
          <div className="view-content">
            <img src={icGaming} />
            <p className="view-title">Gaming</p>
          </div>
        </div>
      </React.Fragment>
    );
  };
  const renderBuyNFTComponent = () => {
    return (
      <div className="price-container">
        <div className="view-content">
          <img src={icClock} />
          <p className="time-sale">Sale ends January 20, 2023 at 12:06 PM GMT+7</p>
        </div>
        <div className="price-indicator" />
        <div className="buy-container">
          <div className="price-view">
            <p className="current-price">Current price</p>
            <div className="price">
              <p className="price-coin">0.964 ETH</p>
              <p className="price-usd">$1,169.31</p>
            </div>
          </div>
          <button className="btn-buy">
            <p className="text-buy">Buy</p>
          </button>
        </div>
      </div>
    );
  };

  const renderDescriptionChild = () => (
    <div className="child-desc">
      <p className="child-desc-title">
        By wg_deployer Thousands of Sheep and Wolves compete on a farm in the metaverse. A tempting prize of $WOOL
        awaits, with deadly high stakes. All the metadata and images are generated and stored 100% on-chain. No IPFS. NO
        API. Just the Ethereum blockchain.
      </p>
    </div>
  );

  const renderDetailsChild = () => {
    const details = [
      { title: 'Contract Address', value: 'value' },
      { title: 'Token ID', value: 'value' },
      { title: 'Token Standard', value: 'value' },
      { title: 'Chain', value: 'value' },
      { title: 'Last Updated', value: 'value' },
      { title: 'Creator Fee', value: 'value' },
    ];

    const renderItem = (title: string, value: string) => (
      <div className="child-detail-item">
        <p className="child-detail-title">{title}</p>
        <p className="child-detail-value">{value}</p>
      </div>
    );
    return <div className="child-detail">{details.map((item) => renderItem(item.title, item.value))}</div>;
  };

  return (
    <WrapperContent>
      <POpenseaNFTDetailSubRoute collectionName={'collectionName'} nftName={'nftName'} />
      <div className="content">
        <div className="section-1">
          <div className="content-1">
            <img alt="img-nft" className="img-nft" src={spookyImg}></img>
          </div>
        </div>
        <div className="section-2">
          {renderOverviewNFTComponent()}
          {renderBuyNFTComponent()}
          <Expandable icon={icDesciption} title="Desciption" child={renderDescriptionChild()} />
          <Expandable icon={icInfo} title="Details" child={renderDetailsChild()} />
        </div>
      </div>
    </WrapperContent>
  );
};

const Home = () => {
  return <Styled className="default-max-width">{renderSectionBottom()}</Styled>;
};

export default memo(Home);
