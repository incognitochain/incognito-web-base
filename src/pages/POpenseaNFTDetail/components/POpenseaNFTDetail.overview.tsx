/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import icGaming from 'assets/svg/ic-gaming.svg';
// import icStar from 'assets/svg/ic-star.svg';
// import icVerify from 'assets/svg/ic-verify.svg';
// import icView from 'assets/svg/ic-view.svg';
import { POpenseaNft } from 'models/model/POpenseaNFT';
import React, { memo } from 'react';

interface POpenseaNFTDetailOverviewProps {
  selectedNFT: POpenseaNft;
}
const POpenseaNFTDetailOverview = (props: POpenseaNFTDetailOverviewProps) => {
  const { selectedNFT } = props;
  return (
    <React.Fragment>
      <div className="artis-container">
        <a className="artis">{selectedNFT.collection?.name}</a>
        {/* <img src={icVerify} /> */}
      </div>

      <p className="name">{selectedNFT.getOriginalName()}</p>
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

export default memo(POpenseaNFTDetailOverview);
