/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import icDesciption from 'assets/svg/ic-description.svg';
// import icGaming from 'assets/svg/ic-gaming.svg';
import icInfo from 'assets/svg/ic-info.svg';
// import icStar from 'assets/svg/ic-star.svg';
// import icVerify from 'assets/svg/ic-verify.svg';
// import icView from 'assets/svg/ic-view.svg';
import Expandable from 'components/Expandable';
import ImagePlaceholder from 'components/ImagePlaceholder';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionGetPOpenseaNFTDetail, selectedpOpenseaNFTSelector } from 'state/pOpensea';
import { shortenString } from 'utils';

import POpenseaNFTDetailBuy from './components/POpenseaNFTDetail.buy';
import POpenseaNFTDetailSubRoute from './components/POpenseaNFTDetail.subRoute';
import { Styled, WrapperContent } from './POpenseaNFTDetail.styled';

const Home = () => {
  const dispatch = useDispatch();
  const { contract, tokenId }: any = useParams();

  const selectedNFT = useSelector(selectedpOpenseaNFTSelector);

  React.useEffect(() => {
    contract && tokenId && dispatch(actionGetPOpenseaNFTDetail(contract, tokenId));
  }, [contract, tokenId]);

  const renderOverviewNFTComponent = () => {
    // const assetContract = selectedNFT.assetContract;
    return (
      <React.Fragment>
        <div className="artis-container">
          <a className="artis">{selectedNFT.collection?.name}</a>
          {/* <img src={icVerify} /> */}
        </div>

        <p className="name">
          {selectedNFT.name} {selectedNFT.id ? `#${selectedNFT.id}` : ''}
        </p>
        {/* <p className="owner-by">
          Owner by <a>{assetContract ? assetContract.owner : ''}</a>
        </p> */}
        {/* <div className="view-container">
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
        </div> */}
      </React.Fragment>
    );
  };

  const renderDescriptionChild = () => (
    <div className="child-desc">
      <p className="child-desc-title">{selectedNFT.description}</p>
    </div>
  );

  const renderDetailsChild = () => {
    const assetContract = selectedNFT.assetContract;
    const details = [
      { title: 'Contract Address', value: assetContract ? assetContract.address : '' },
      { title: 'Token ID', value: selectedNFT.tokenId },
      { title: 'Token Standard', value: assetContract ? assetContract.schemaName : '' },
      { title: 'Chain', value: 'Etherum' },
      // { title: 'Last updated', value: '' },
      {
        title: 'Creator Fee',
        value:
          assetContract && assetContract.openseaSellerFeeBasisPoints
            ? `${Math.round(assetContract.openseaSellerFeeBasisPoints / 100)}%`
            : '',
      },
    ];

    const renderItem = (title: string, value?: string) => (
      <div className="child-detail-item">
        <p className="child-detail-title">{title}</p>
        <p className="child-detail-value">{title === 'Contract Address' && value ? shortenString(value) : value}</p>
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
          contract={contract}
        />
        <div className="content">
          <div className="section-1">
            <div className="content-1">
              <ImagePlaceholder className="img-nft" src={selectedNFT.imageUrl} />
            </div>
          </div>
          <div className="section-2">
            {renderOverviewNFTComponent()}
            <POpenseaNFTDetailBuy selectedNFT={selectedNFT} />
            <Expandable icon={icInfo} expand title="Details" child={renderDetailsChild()} />
            <Expandable icon={icDesciption} expand title="Desciption" child={renderDescriptionChild()} />
          </div>
        </div>
      </WrapperContent>
    </Styled>
  );
};

export default memo(Home);
