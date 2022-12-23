/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import icClock from 'assets/svg/ic-clock.svg';
import icDesciption from 'assets/svg/ic-description.svg';
import icGaming from 'assets/svg/ic-gaming.svg';
import icInfo from 'assets/svg/ic-info.svg';
import icStar from 'assets/svg/ic-star.svg';
import icVerify from 'assets/svg/ic-verify.svg';
import icView from 'assets/svg/ic-view.svg';
import Expandable from 'components/Expandable';
import ImagePlaceholder from 'components/ImagePlaceholder';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionGetPOpenseaNFTDetail, selectedpOpenseaNFTSelector } from 'state/pOpensea';

import POpenseaNFTDetailSubRoute from './components/POpenseaNFTDetail.subRoute';
import { Styled, WrapperContent } from './POpenseaNFTDetail.styled';

const Home = () => {
  const dispatch = useDispatch();
  const selectedNFT = useSelector(selectedpOpenseaNFTSelector);

  const { contract, tokenId }: any = useParams();

  React.useEffect(() => {
    contract && tokenId && dispatch(actionGetPOpenseaNFTDetail(contract, tokenId));
  }, [contract, tokenId]);

  const renderOverviewNFTComponent = () => {
    return (
      <React.Fragment>
        <div className="artis-container">
          <a className="artis">{selectedNFT.creator?.user?.username}</a>
          <img src={icVerify} />
        </div>

        <p className="name">
          {selectedNFT.name} #{selectedNFT.id}
        </p>
        <p className="owner-by">
          Owner by <a>{selectedNFT.owner}</a>
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
          <p className="time-sale">{`Sale ends ${selectedNFT.lastSale}`}</p>
        </div>
        <div className="price-indicator" />
        <div className="buy-container">
          <div className="price-view">
            <p className="current-price">Current price</p>
            <div className="price">
              <p className="price-coin">{selectedNFT.assetContract?.openseaSellerFeeBasisPoints} ETH</p>
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
      <p className="child-desc-title">{selectedNFT.description}</p>
    </div>
  );

  const renderDetailsChild = () => {
    const details = [
      { title: 'Contract Address', value: selectedNFT.assetContract?.address },
      { title: 'Token ID', value: selectedNFT.tokenId },
      { title: 'Token Standard', value: '' },
      { title: 'Chain', value: '' },
      { title: 'Last Updated', value: selectedNFT.lastSale },
      { title: 'Creator Fee', value: '' },
    ];

    const renderItem = (title: string, value?: string) => (
      <div className="child-detail-item">
        <p className="child-detail-title">{title}</p>
        <p className="child-detail-value">{value}</p>
      </div>
    );
    return <div className="child-detail">{details.map((item) => renderItem(item.title, item.value))}</div>;
  };

  return (
    <Styled className="default-max-width">
      <WrapperContent>
        <POpenseaNFTDetailSubRoute
          collectionName={selectedNFT.collection ? selectedNFT.collection.name || '' : ''}
          nftName={selectedNFT.name || ''}
        />
        <div className="content">
          <div className="section-1">
            <div className="content-1">
              <ImagePlaceholder className="img-nft" src={selectedNFT.imageUrl} />
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
    </Styled>
  );
};

export default memo(Home);
