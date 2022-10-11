import { Col, Row } from 'antd';
import linkImg from 'assets/images/link-icon.png';
import structure1 from 'assets/images/structure-1.png';
import structure2 from 'assets/images/structure-2.png';
import structure3 from 'assets/images/structure-3.png';
import structure4 from 'assets/images/structure-4.png';
import { structureTranslateSelector } from 'config/Configs.selector';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { Image } from 'rebass';
import styled, { DefaultTheme } from 'styled-components/macro';

interface IFactory {
  title: string;
  desc: string;
  linkText: string;
  image: any;
  isRevert?: boolean;
  link: string;
}

const Styled = styled(Row)`
  padding-bottom: 40px;
  .desc {
    font-size: 22px;
    line-height: 33px;
    letter-spacing: 0.01em;
    margin-top: 16px;
  }
  .link-text {
    color: ${({ theme }) => theme.text3};
    cursor: pointer;
    margin-top: 24px;
    text-align: left;
  }
  .section3-item {
    padding-bottom: 60px;
  }
  .section3-title {
    white-space: pre-wrap;
    text-align: center;
    margin-bottom: 60px;
    width: 100%;
  }

  .descripiton-1 {
  }

  .title-2 {
    white-space: pre-wrap;
    text-align: left;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
    .section3-title {
        margin-bottom: 40px;
    }
    .desc {
        font-size: 18px;
        line-height: 27px;
    }
    .link-text {
    }
    .section3-item {
        padding-bottom: 40px;
    }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        padding-top: 40px;
        .desc {
            text-align: center;
            font-size: 16px;
            line-height: 24px;
        }
        .link-text {
            text-align: left;
        }
        .section3-title {
            margin-bottom: 40px;
        }
  `}

${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
      .section3-title {
        white-space: pre-wrap;
        text-align: center;
        margin-bottom: 40px;
      }

      .link-text {
            text-align: center;
      }

      .descripiton-1 {
        text-align: center;
      }

      .title-2 {
        white-space: pre-wrap;
        text-align: center;
      }
  `}
`;

const Item = React.memo(({ image, title, desc, linkText, isRevert, link }: IFactory) => {
  const _Image = React.useMemo(
    () => (
      <Col xs={24} lg={8}>
        <Image className="image" src={image} alt="structure" />
      </Col>
    ),
    []
  );
  const _Content = React.useMemo(
    () => (
      <Col xs={24} xxl={10} lg={12}>
        <h3 className="title margin-add title-2">{title}</h3>
        <h6 className="text2 descripiton-1">{desc}</h6>
        <a className="link-text description" href={link}>
          {` ${linkText}`}
          <img src={linkImg} style={{ width: 18, height: 'auto', marginLeft: 5 }} alt="link-icon" />
        </a>
      </Col>
    ),
    []
  );
  if (isMobile) {
    return (
      <Row justify="space-between" align="middle" className="section3-item">
        {_Image}
        {_Content}
      </Row>
    );
  }
  return (
    <Row justify="space-between" align="middle" className="section3-item">
      {isRevert ? _Content : _Image}
      {isRevert ? _Image : _Content}
    </Row>
  );
});

const Section3 = () => {
  const structureTrs = useSelector(structureTranslateSelector);

  const Factory = React.useMemo<IFactory[]>(
    () => [
      {
        title: structureTrs.privacyByDesign,
        desc: structureTrs.privacyByDesignDesc,
        linkText: structureTrs.privacyByDesignMore,
        image: structure1,
        isRevert: false,
        link: 'https://we.incognito.org/t/sending-cryptocurrencies-confidentially-ring-signature-homomorphic-commitment-and-zero-knowledge-range-proofs/170',
      },
      {
        title: structureTrs.privacyForEvery,
        desc: structureTrs.privacyForEveryDesc,
        linkText: structureTrs.privacyForEveryMore,
        image: structure2,
        isRevert: true,
        link: 'https://we.incognito.org/t/shielding-cryptocurrencies-turning-any-cryptocurrency-into-a-privacy-coin/83',
      },
      {
        title: structureTrs.privacyAtScale,
        desc: structureTrs.privacyAtScaleDesc,
        linkText: structureTrs.privacyAtScaleMore,
        image: structure3,
        isRevert: false,
        link: 'https://we.incognito.org/t/scaling-blockchain-privacy-with-dynamic-sharding/169',
      },
      {
        title: structureTrs.privacyFuel,
        desc: structureTrs.privacyFuelDesc,
        linkText: structureTrs.privacyFuelMore,
        image: structure4,
        isRevert: true,
        link: 'https://we.incognito.org/t/network-incentive-privacy-prv-mining-distribution/172',
      },
    ],
    []
  );

  return (
    <Styled align="middle" justify="space-between" className="default-padding-horizontal default-margin-top">
      <p className="fw-medium main-title-text section3-title">{`Privacy infrastructure\n for the digital economy.`}</p>
      {Factory.map((item) => (
        <Item key={item.title} {...item} />
      ))}
    </Styled>
  );
};

export default React.memo(Section3);
