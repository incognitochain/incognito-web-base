import icVerify from 'assets/svg/ic-verify.svg';
import ImagePlaceholder from 'components/ImagePlaceholder';
import { POpenseaCollection } from 'models/model/POpenseaCollection';
import { memo } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

const Styled = styled.div`
  margin-top: 16px;
  margin-bottom: 40px;

  .banner-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .banner {
    height: 200px;
    width: 100%;
    border-radius: 16px;
    object-fit: cover;
  }

  .avatar-container {
    align-self: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .root-avatar {
    align-self: center;
  }

  .avatar {
    width: 140px;
    height: 140px;
    border: 4px solid ${({ theme }) => theme.white};
    border-radius: 16px;
    margin-top: -104px;
    object-fit: cover;
    align-self: center;
  }

  .container-collection-name {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
  }

  .collection-name {
    font-weight: 700;
    font-size: 28px;
    letter-spacing: 0.01em;
    text-align: center;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .collection-verify {
    width: 20px;
    height: 20px;
    margin-left: 8px;
  }

  .title {
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.01em;
    text-align: center;
    color: ${({ theme }) => theme.text2};
  }

  .sub-title {
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.01em;
    text-align: center;
    margin-left: 8px;
  }

  .info-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
  }

  .info-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-left: 16px;
    padding-right: 16px;
  }

  .volumn-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
  }

  .volumn-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 24px;
    padding-right: 24px;
  }

  .volumn {
    font-weight: 700;
    font-size: 20px;
    line-height: 140%;
    text-align: center;
  }

  .sub-volumn {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    text-align: center;
    color: ${({ theme }) => theme.text2};
  }

  .earnings-text {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text5};
  }

  button:hover {
    cursor: pointer;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text1};
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    .info-content {
      padding-left: 8px;
      padding-right: 8px;
      flex-direction: column;
    }

    .volumn-content {
      padding-left: 8px;
      padding-right: 8px;
    }

    .info-container {
      margin-top: 0px;
    }
  `}
`;

interface POpenseaDetailOverviewProps {
  collection: POpenseaCollection;
  total: number;
}

const POpenseaDetailOverview = (props: POpenseaDetailOverviewProps) => {
  const { collection, total } = props;

  const stats = collection.stats;

  const renderTitleItem = (title?: string, subTitle?: string) => {
    return (
      <div className="info-content">
        <p className="title">{title}</p>
        <p className="sub-title">{subTitle}</p>
      </div>
    );
  };

  const renderVolumnItem = (title?: string, subTitle?: string) => {
    return (
      <div className="volumn-content">
        <p className="volumn">{title}</p>
        <p className="sub-volumn">{subTitle}</p>
      </div>
    );
  };

  return (
    <Styled>
      <div className="banner-container">
        <ImagePlaceholder className="banner" src={collection.getBannerUrl()} />
        <div className="avatar-container">
          <ImagePlaceholder className="avatar" rootClassName="root-avatar" src={collection.imageUrl} />
          <div className="container-collection-name">
            <p className="collection-name">{collection.name}</p>
            {collection.getIsVerify() && <img alt="" className="collection-verify" src={icVerify} />}
          </div>
        </div>
        <div className="info-container">
          {renderTitleItem('Items', `${collection.getCountFormatAmount()}`)}
          {renderTitleItem('Created', collection.getCreatedDateWith('ll'))}
          {collection && renderTitleItem('Creator fee', `${collection.getPercentCreatorFee()}%`)}
          {renderTitleItem('Chain', 'Etherum')}
        </div>
        <div className="volumn-container">
          {collection && renderVolumnItem(`${collection.getTotalVolumnFormatAmount()} ETH`, 'total volume')}
          {collection && renderVolumnItem(`${collection.getFloorPriceFormatAmount()} ETH`, 'floor price')}
          {collection && renderVolumnItem(`${collection.getTotalOwnerFormatAmount()}`, 'owners')}
          {collection && renderVolumnItem(`${collection.getPercentUniqueOwner()}%`, 'unique owners')}
        </div>
      </div>
    </Styled>
  );
};

export default memo(POpenseaDetailOverview);
