import ImagePlaceholder from 'components/ImagePlaceholder';
import { INFT } from 'pages/Pnft';
import IcCheckbox from 'pages/Pnft/images/checkbox.svg';
import IcCheckboxActive from 'pages/Pnft/images/checkbox-active.svg';
import React from 'react';

import { HEADER_LIST } from './Profile.constant';
import { NFTItem } from './Profile.listNFT.styled';

export enum ShowListType {
  all = 'Show all',
  listed = 'Only listed',
}

interface HeaderListProps {
  currentListType: string;
  setCurrentListType: (type: ShowListType) => void;
}

const HeaderList = (props: HeaderListProps) => {
  const { currentListType, setCurrentListType } = props;
  return (
    <div className="header">
      <p className="title">Owned</p>
      <div className="checkbox-container">
        {Object.values(ShowListType).map((type, index) => (
          <div key={index.toString()} className="checkbox">
            <img
              className="checkbox-ic"
              alt="ic"
              onClick={() => setCurrentListType(type)}
              src={currentListType.valueOf() === type ? IcCheckboxActive : IcCheckbox}
            />
            <p className="checkbox-value">{type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const renderLabelNormal = ({ value, className }: { value: string; className?: string }) => {
  return (
    <div className={`wrap-item align-end ${className || ''}`}>
      <p className="content-label">{value}</p>
    </div>
  );
};

const renderAdjustPriceNormal = ({ value, className }: { value: string; className?: string }) => {
  return (
    <div className={`wrap-item align-end ${className || ''}`} style={{ justifyContent: 'flex-end', paddingRight: 16 }}>
      <div className="adjust-item">
        <input
          className="input"
          type={'text'}
          // onChange={onChange}
          value="1 ETH"
          autoFocus={false}
        />
      </div>
    </div>
  );
};

const renderExtraComponent = () => {
  return (
    <div className="extra-container">
      <div className="extra-content">
        <div className="fee-container">
          <p className="label">Marketplace + royalty fees</p>
          <p className="value">0.5 %</p>
        </div>
        <div className="fee-container">
          <p className="label">Total est. Proceeds</p>
          <p className="value">0 ETH</p>
        </div>
      </div>
    </div>
  );
};

const renderNFTItem = ({
  nft,
  index,
  selectedNftIds,
  onClickCheckboxItem,
}: {
  nft: INFT;
  index: number;
  selectedNftIds: string[];
  onClickCheckboxItem: (tokenId: string) => void;
}) => {
  const isChecked = selectedNftIds.includes(nft.tokenId);

  const onClickCheckbox = () => {
    onClickCheckboxItem(nft.tokenId);
  };

  return (
    <NFTItem key={index.toString()} effectHover={true} isChecked={isChecked} className="collection-item">
      <div className="container">
        <div className="wrap-name">
          <img
            className="ic-checkbox"
            style={{ marginRight: 32 }}
            alt="ic"
            src={isChecked ? IcCheckboxActive : IcCheckbox}
            onClick={onClickCheckbox}
          />
          <ImagePlaceholder className="logo" src={nft.imgUrl} />
          <p key={index.toString()} className="content-label name">
            {nft.normalizedMetadata.name}
          </p>
        </div>
        {renderLabelNormal({
          value: '0',
          className: 'medium-hide',
        })}
        {renderLabelNormal({
          value: nft.amountFormated + ' ETH',
        })}
        {renderLabelNormal({
          value: '0',
          className: 'medium-hide',
        })}
        {renderLabelNormal({
          value: '0',
          className: 'medium-hide',
        })}
        {isChecked &&
          renderAdjustPriceNormal({
            value: '0',
          })}
      </div>
      {isChecked && renderExtraComponent()}
    </NFTItem>
  );
};

const renderNormalHeader = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={`wrap-header ${className || ''}`} key={text}>
      <p className="header-label">{text}</p>
    </div>
  );
};

const renderHeader = ({
  total,
  selectedNftIds,
  onClickCheckbox,
}: {
  total: number;
  selectedNftIds: string[];
  onClickCheckbox: () => void;
}) => {
  return (
    <NFTItem effectHover={false} style={{ marginBottom: 8 }}>
      <div className="container">
        <div className="wrap-name" style={{ marginRight: 75 }} onClick={onClickCheckbox}>
          <img className="ic-checkbox" alt="ic" src={selectedNftIds.length > 0 ? IcCheckboxActive : IcCheckbox} />
          <p className="content-label header-name">
            {selectedNftIds.length > 0 ? `${selectedNftIds.length}/${total} selected` : `${total} total`}
          </p>
        </div>
        {(selectedNftIds.length > 0 ? [...HEADER_LIST, { text: '' }] : HEADER_LIST).map(renderNormalHeader)}
      </div>
    </NFTItem>
  );
};

export { HeaderList, renderHeader, renderNFTItem };
