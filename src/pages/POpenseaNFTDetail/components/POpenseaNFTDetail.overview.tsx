/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import icGaming from 'assets/svg/ic-gaming.svg';
// import icStar from 'assets/svg/ic-star.svg';
// import icVerify from 'assets/svg/ic-verify.svg';
// import icView from 'assets/svg/ic-view.svg';
import { POpenseaNft } from 'models/model/POpenseaNFT';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

const Styled = styled.div`
  .collection-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .collection-name {
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: ${({ theme }) => theme.color_blue};
    margin-right: 8px;
    cursor: pointer;
  }

  .name {
    font-weight: 700;
    font-size: 34px;
    line-height: 140%;
    margin-top: 8px;
  }

  .owner-by {
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    margin-top: 4px;
  }

  .view-container {
    display: flex;
    flex-direction: row;
    margin-top: 24px;
  }
`;
interface POpenseaNFTDetailOverviewProps {
  selectedNFT: POpenseaNft;
  contract: string;
}
const POpenseaNFTDetailOverview = (props: POpenseaNFTDetailOverviewProps) => {
  const { selectedNFT } = props;
  const history = useHistory();
  return (
    <Styled>
      <div className="collection-container">
        <button
          onClick={() => {
            history.push(`/popensea/detail/${props.contract}`);
          }}
        >
          <p className="collection-name">{selectedNFT.collection?.name}</p>
        </button>
        {/* <img src={icVerify} /> */}
      </div>

      <p className="name">{selectedNFT.getOriginalName()}</p>
      {/* <p className="owner-by">
        Owner by <a>{assetContract ? assetContract.owner : ''}</a>
      </p> */}
    </Styled>
  );
};

export default memo(POpenseaNFTDetailOverview);
