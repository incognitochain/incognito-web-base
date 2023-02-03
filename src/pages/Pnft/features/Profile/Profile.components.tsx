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

const renderNFTItem = ({ nft, index }: { nft: INFT; index: number }) => {
  return (
    <NFTItem key={index.toString()} effectHover={true} className="collection-item">
      <div className="wrap-name">
        <img className="ic-checkbox" style={{ marginRight: 32 }} alt="ic" src={IcCheckbox} />
        <ImagePlaceholder className="logo" src={nft.imageUrl} />
        <p key={index.toString()} className="content-label name">
          {nft.name}
        </p>
      </div>
      {renderLabelNormal({
        value: '0',
        className: 'medium-hide',
      })}
      {renderLabelNormal({
        value: '0',
        className: 'medium-hide',
      })}
      {renderLabelNormal({
        value: '0',
        className: 'medium-hide',
      })}
      {renderLabelNormal({
        value: '0',
        className: 'medium-hide',
      })}
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

const renderHeader = () => {
  return (
    <NFTItem effectHover={false}>
      <div className="wrap-name" style={{ marginRight: 75 }}>
        <img className="ic-checkbox" alt="ic" src={IcCheckbox} />
        <p className="content-label header-name">0 total</p>
      </div>
      {HEADER_LIST.map(renderNormalHeader)}
    </NFTItem>
  );
};

export { HeaderList, renderHeader, renderNFTItem };
