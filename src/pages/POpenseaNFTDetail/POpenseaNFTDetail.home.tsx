/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import ImagePlaceholder from 'components/ImagePlaceholder';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionGetPOpenseaNFTDetail, selectedpOpenseaNFTSelector } from 'state/pOpensea';

import POpenseaNFTDetailBuy from './components/POpenseaNFTDetail.buy';
import POpenseaNFTDetailInfo from './components/POpenseaNFTDetail.info';
import POpenseaNFTDetailOverview from './components/POpenseaNFTDetail.overview';
import POpenseaNFTDetailQuestions from './components/POpenseaNFTDetail.questions';
import POpenseaNFTDetailSubRoute from './components/POpenseaNFTDetail.subRoute';
import { Styled, WrapperContent } from './POpenseaNFTDetail.styled';

const Home = () => {
  const dispatch = useDispatch();
  const { contract, tokenId }: any = useParams();

  const selectedNFT = useSelector(selectedpOpenseaNFTSelector);

  React.useEffect(() => {
    contract && tokenId && dispatch(actionGetPOpenseaNFTDetail(contract, tokenId));
  }, [contract, tokenId]);

  return (
    <Styled className="default-max-width">
      <WrapperContent>
        <POpenseaNFTDetailSubRoute
          collectionName={selectedNFT.collection ? selectedNFT.collection.name || '' : ''}
          nftName={selectedNFT.getOriginalName()}
          contract={contract}
        />
        <div className="content">
          <div className="section-1">
            <div className="content-1">
              <ImagePlaceholder
                rootClassName="root-img-nft-1"
                className="img-nft-1"
                src={selectedNFT.getImageUrl()}
                animationUrl={selectedNFT.animationUrl}
                linkOpensea={selectedNFT.permalink}
              />
            </div>
            <POpenseaNFTDetailInfo selectedNFT={selectedNFT} />
          </div>
          <div className="section-2">
            <div className="content-2">
              <ImagePlaceholder
                rootClassName="root-img-nft-2"
                className="img-nft-2"
                src={selectedNFT.getImageUrl()}
                animationUrl={selectedNFT.animationUrl}
                linkOpensea={selectedNFT.permalink}
              />
            </div>
            <POpenseaNFTDetailOverview contract={contract} selectedNFT={selectedNFT} />
            <POpenseaNFTDetailBuy contract={contract} selectedNFT={selectedNFT} />
          </div>
        </div>
        <POpenseaNFTDetailQuestions />
      </WrapperContent>
    </Styled>
  );
};

export default memo(Home);
