/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import icDesciption from 'assets/svg/ic-description.svg';
import icInfo from 'assets/svg/ic-info.svg';
import Expandable from 'components/Expandable';
import { POpenseaNft } from 'models/model/POpenseaNFT';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionGetPOpenseaNFTDetail } from 'state/pOpensea';
import { shortenString } from 'utils';

interface POpenseaNFTDetailInfoProps {
  selectedNFT: POpenseaNft;
}

const POpenseaNFTDetailInfo = (props: POpenseaNFTDetailInfoProps) => {
  const dispatch = useDispatch();
  const { contract, tokenId }: any = useParams();

  const { selectedNFT } = props;

  React.useEffect(() => {
    contract && tokenId && dispatch(actionGetPOpenseaNFTDetail(contract, tokenId));
  }, [contract, tokenId]);

  const renderDetailItem = (title: string, value?: string) => (
    <div className="child-detail-item">
      <p className="child-detail-title">{title}</p>
      <p className="child-detail-value">{title === 'Contract Address' && value ? shortenString(value) : value}</p>
    </div>
  );

  const renderDetailsChild = () => {
    const assetContract = selectedNFT.assetContract;
    const creatorFee =
      assetContract && assetContract.openseaSellerFeeBasisPoints
        ? `${Math.round(assetContract.openseaSellerFeeBasisPoints / 100)}%`
        : '';

    const details = [
      { title: 'Contract Address', value: assetContract ? assetContract.address : '' },
      { title: 'Token ID', value: selectedNFT.tokenId },
      { title: 'Token Standard', value: assetContract ? assetContract.schemaName : '' },
      { title: 'Chain', value: 'Etherum' },
      { title: 'Creator Fee', value: creatorFee },
    ];
    return <div className="child-detail">{details.map((item) => renderDetailItem(item.title, item.value))}</div>;
  };

  const renderDesciptionChild = () => (
    <div className="child-desc">
      <p className="child-desc-title">{selectedNFT.description}</p>
    </div>
  );

  return (
    <React.Fragment>
      <Expandable icon={icInfo} expand title="Details" child={renderDetailsChild()} />
      <Expandable icon={icDesciption} expand title="Desciption" child={renderDesciptionChild()} />
    </React.Fragment>
  );
};

export default memo(POpenseaNFTDetailInfo);
