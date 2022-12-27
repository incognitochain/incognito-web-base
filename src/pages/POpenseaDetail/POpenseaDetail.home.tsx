/* eslint-disable react-hooks/rules-of-hooks */
import { POpenseaNft } from 'models/model/POpenseaNFT';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  actionGetPOpenseaCollectionDetail,
  actionGetPOpenseaNFTs,
  actionSetSelectedNFT,
  pOpenseaNFTsSelectors,
  selectedpOpenseaCollectionSelector,
} from 'state/pOpensea';

import POpenseaDetailListNFT from './components/POpenseaDetail.listNFT';
import POpenseaDetailOverview from './components/POpenseaDetail.overview';
import POpenseaDetailSubRoute from './components/POpenseaDetail.subRoute';
import { Styled, WrapperContent } from './POpenseaDetail.styled';

const POpenseaDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { contract }: any = useParams();

  const selectedCollection = useSelector(selectedpOpenseaCollectionSelector);
  const nfts = useSelector(pOpenseaNFTsSelectors);

  React.useEffect(() => {
    if (contract && nfts.length === 0) {
      dispatch(actionGetPOpenseaCollectionDetail(contract));
      dispatch(actionGetPOpenseaNFTs(contract));
    }
  }, []);

  const onClickNFTItem = (item: POpenseaNft) => {
    if (selectedCollection.primaryAssetContracts && selectedCollection.primaryAssetContracts.length > 0) {
      dispatch(actionSetSelectedNFT(item));
      const contractAddress = selectedCollection.primaryAssetContracts[0].address;
      const tokenId = item.tokenId;
      history.push(`/popensea/nft-detail/${contractAddress}/${tokenId || 0}`);
    }
  };

  return (
    <Styled className="default-max-width">
      <WrapperContent>
        <POpenseaDetailSubRoute collectionName={selectedCollection.name} />
        <POpenseaDetailOverview total={nfts.length} collection={selectedCollection} />
        <POpenseaDetailListNFT total={nfts.length} onClickNFTItem={onClickNFTItem} />
      </WrapperContent>
    </Styled>
  );
};

export default memo(POpenseaDetail);
