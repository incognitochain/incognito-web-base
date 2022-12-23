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

  .avatar {
    width: 140px;
    height: 140px;
    border: 4px solid ${({ theme }) => theme.white};
    border-radius: 16px;
    margin-top: -96px;
    object-fit: cover;
    align-self: center;
  }

  .collection-name {
    font-weight: 700;
    font-size: 28px;
    letter-spacing: 0.01em;
    text-align: center;
    margin-top: 16px;
  }

  .artis-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-left: 16px;
    padding-right: 16px;
  }

  .title {
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.01em;
    text-align: center;
    color: ${({ theme }) => theme.text2};
  }

  .sub-title {
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.01em;
    text-align: center;
    margin-left: 4px;
  }

  .info-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
  }

  .volumn-container {
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

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    .artis-container {
      padding-left: 8px;
      padding-right: 8px;
      flex-direction: column;
    }

    .volumn-container {
      padding-left: 8px;
      padding-right: 8px;
    }
  `}
`;

interface POpenseaDetailOverviewProps {
  collection: POpenseaCollection;
}

const POpenseaDetailOverview = (props: POpenseaDetailOverviewProps) => {
  const { collection } = props;

  const renderTitleItem = (title?: string, subTitle?: string) => {
    return (
      <div className="artis-container">
        <p className="title">{title}</p>
        <p className="sub-title">{subTitle}</p>
      </div>
    );
  };

  const renderVolumnItem = (title?: string, subTitle?: string) => {
    return (
      <div className="volumn-container">
        <p className="volumn">{title}</p>
        <p className="sub-volumn">{subTitle}</p>
      </div>
    );
  };

  return (
    <Styled>
      <div className="banner-container">
        <ImagePlaceholder className="banner" src={collection.bannerImageUrl} />
        <div className="avatar-container">
          <ImagePlaceholder className="avatar" src={collection.imageUrl} />
          <p className="collection-name">{collection.name}</p>
          {renderTitleItem('By', collection.mediumUsername)}
        </div>
        <div className="info-container">
          {renderTitleItem('Items', '12832')}
          {renderTitleItem('Created', collection.getCreatedDateWith('ll'))}
          {renderTitleItem('Creator fee', `%`)}
          {renderTitleItem('Chain', 'Etherum')}
          {renderTitleItem('Category', 'Gaming')}
        </div>
        <div className="info-container">
          {renderVolumnItem(`${collection.stats?.totalVolume} ETH`, 'total volume')}
          {renderVolumnItem(`${collection.stats?.floorPrice} ETH`, 'floor price')}
          {renderVolumnItem('0.8505 wETH', 'best offer')}
          {renderVolumnItem('4%', 'listed')}
          {renderVolumnItem(`${collection.stats?.numOwners}`, 'owners')}
          {renderVolumnItem('20%', 'unique owners')}
        </div>
      </div>
    </Styled>
  );
};

export default memo(POpenseaDetailOverview);
