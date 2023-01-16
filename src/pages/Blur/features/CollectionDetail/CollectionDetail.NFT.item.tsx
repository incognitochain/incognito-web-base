import { List } from 'antd';
import { RowBetween } from 'components/Core/Row';
import ImagePlaceholder from 'components/ImagePlaceholder';
import { IToken } from 'pages/Blur';
import Checkbox from 'pages/Blur/images/checkbox.svg';
import CheckboxActive from 'pages/Blur/images/checkbox-active.svg';
import IcInfo from 'pages/Blur/images/info.svg';
import React from 'react';

import { StyledCard } from './CollectionDetail.listNFT.styled';
import CollectionDetailNFTLoader from './CollectionDetail.NFT.loader';

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
  const { detail } = token;

  const isSelected = selectedTokenIds.includes(token.tokenId);

  return (
    <List.Item key={key} onClick={() => onClickTokenItem(token)}>
      {token.isLoading ? (
        <CollectionDetailNFTLoader />
      ) : (
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
          <img
            onMouseMove={(event) => onMouseEnterIcInfo(event, token)}
            onMouseOut={onMouseLeaveIcInfo}
            className="ic-info"
            src={IcInfo}
            alt="info-icon"
          />
          <p className="rarity-rank">{detail.rarityRank}</p>
        </StyledCard>
      )}
    </List.Item>
  );
};

export default React.memo(NFTItem);
