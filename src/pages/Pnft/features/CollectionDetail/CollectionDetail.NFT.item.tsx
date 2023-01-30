import { List } from 'antd';
import { RowBetween } from 'components/Core/Row';
import ImagePlaceholder from 'components/ImagePlaceholder';
import { IToken } from 'pages/Pnft';
import Checkbox from 'pages/Pnft/images/checkbox.svg';
import CheckboxActive from 'pages/Pnft/images/checkbox-active.svg';
import IcBlur from 'pages/Pnft/images/ic-blur.svg';
import IcLookrare from 'pages/Pnft/images/ic-lookrare.svg';
import IcOpensea from 'pages/Pnft/images/ic-opensea.svg';
import IcX2Y2 from 'pages/Pnft/images/ic-x2y2.svg';
import { IMarketPlaceType } from 'pages/Pnft/Pnft.interface';
// import IcInfo from 'pages/Pnft/images/info.svg';
import React from 'react';

import { StyledCard } from './CollectionDetail.listNFT.styled';
import CollectionDetailNFTLoader from './CollectionDetail.NFT.loader';

const generateLinkToken = (token: IToken) => {
  const contract = token.contractAddress;
  const tokenId = token.tokenId;
  switch (token.detail.price.marketplace) {
    case IMarketPlaceType.BLUR:
      return `https://blur.io/asset/${contract}/${tokenId}`;
    case IMarketPlaceType.OPENSEA:
      return `https://opensea.io/assets/ethereum/${contract}/${tokenId}`;
    case IMarketPlaceType.LOOKSRARE:
      return `https://looksrare.org/collections/${contract}/${tokenId}`;
    case IMarketPlaceType.X2Y2:
      return `https://x2y2.io/eth/${contract}/${tokenId}`;
  }
};
interface NFTItemProps {
  key: string;
  token: IToken;
  selectedTokenIds: string[];
  onClickTokenItem: (item: IToken) => void;
  effectToken: boolean;
  onMouseEnterIcInfo: (event: any, token: IToken) => void;
  onMouseLeaveIcInfo: () => void;
}

const NFTItem = (props: NFTItemProps) => {
  const { token, selectedTokenIds, onClickTokenItem, key, effectToken, onMouseEnterIcInfo, onMouseLeaveIcInfo } = props;

  if (token.isLoading) {
    return <CollectionDetailNFTLoader />;
  }

  const { detail } = token;
  const isSelected = selectedTokenIds.includes(token.tokenId);

  let icMarketplace = IcBlur;
  switch (detail.price.marketplace) {
    case IMarketPlaceType.OPENSEA:
      icMarketplace = IcOpensea;
      break;
    case IMarketPlaceType.LOOKSRARE:
      icMarketplace = IcLookrare;
      break;
    case IMarketPlaceType.X2Y2:
      icMarketplace = IcX2Y2;
      break;
  }

  return (
    <List.Item key={key} onClick={() => onClickTokenItem(token)}>
      <StyledCard
        isSelected={isSelected}
        effectToken={effectToken ? isSelected : false}
        disableEffectToken={effectToken ? !isSelected : false}
      >
        <ImagePlaceholder className="item-img" src={detail.imageUrl} />
        <div className="item-info">
          <div className="item-name-container">
            <p className="item-name">{detail.name}</p>
          </div>
          <RowBetween>
            <div>
              <p className="item-last-sale">Price</p>
              <p className="item-price">
                {detail.price.amountFormated}
                {` ${detail.price.unit}`}
              </p>
            </div>
            <div>
              <p className="item-last-sale text-align-right">Last sale</p>
              <p className="item-price text-align-right">
                {detail.lastSale.amountFormated}
                {` ${detail.lastSale.unit}`}
              </p>
            </div>
          </RowBetween>
        </div>
        <img className="checkbox" src={isSelected ? CheckboxActive : Checkbox} alt="checkbox-logo" />
        {/* <img
          onMouseMove={(event) => onMouseEnterIcInfo(event, token)}
          onMouseOut={onMouseLeaveIcInfo}
          className="ic-info"
          src={IcInfo}
          alt="info-icon"
        /> */}
        <p className="rarity-rank">{detail.rarityRank}</p>
        <img
          className="ic-market"
          src={icMarketplace}
          alt="info-market"
          onClick={() => window.open(generateLinkToken(token))}
        />
      </StyledCard>
    </List.Item>
  );
};

export default React.memo(NFTItem);
