import { Button, Col, Row } from 'antd';
import logoStrokeImg from 'assets/images/infrastrure-logo.png';
import SectionHead from 'components/Core/SectionHead';
import { structureTranslateSelector } from 'config/Configs.selector';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';

import { METRIC_TYPE, METRIC_UNIQ, updateMetric } from '../../../services/rpcMetric';
import { route as ValidatorRoute } from '../../Earnings/features/Validators/Validators.route';

const Styled = styled(Row)`
  .main-title {
    letter-spacing: 0.015em;
    white-space: pre-wrap;
  }
  .sub-main-title {
    max-width: 620px;
    letter-spacing: 0.01em;
  }
  .logo-stroke {
    width: 45%;
    max-width: 700px;
  }
  .btn-become-validator {
    margin-top: 50px;
    width: 196px;
    background-color: ${({ theme }) => theme.btn1};
    font-size: 14px;
    height: 50px !important;
    :hover {
      opacity: 0.8;
    }
  }
  .btn-buy-pnode {
    margin-top: 50px;
    width: 196px;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.btn1};
    font-size: 14px;
    height: 50px !important;
    margin-left: 24px;
    :hover {
      opacity: 0.8;
    }
  }
  .col-section1 {
    display: flex;
    flex-direction: column;
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
      .logo-stroke {
        width: 35%;
        max-width: 390px;
      }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
      justify-content: center;
      flex-direction: column-reverse;
      .col-section1 {
        display: flex;
        flex-direction: column;
      }
      .main-title {
        font-weight: 500;
        white-space: inherit;
      }
      .sub-main-title {
        font-size: 16px;
        line-height: 24px;
      }
      .btn-become-validator {
        margin-top: 24px;
        height: 40px;
        font-size: 18px;
      }
      .btn-buy-pnode {
        margin-top: 24px;
        height: 40px;
        font-size: 18px;
        margin-left: 0;
      }
      .wrap-button {
        flex-direction: column;
      }
      .logo-stroke {
        width: 90%;
        margin-bottom: 45px;
      }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
      .main-title {
        white-space: pre-wrap;
        text-align: left;
      }

      .btn-become-validator {
        // align-self: center;
      }
  `}
`;

const Section1 = () => {
  const structureTrs = useSelector(structureTranslateSelector);
  const history = useHistory();
  return (
    <Styled align="middle" justify="space-between" className="default-max-width default-margin-bottom">
      <Col className="col-section1">
        <SectionHead title="Privacy Infrastructure" />
        <h3 className="main-title h3">{structureTrs.mainTitle}</h3>
        <p className="sub-main-title sub-title-text h8">{structureTrs.mainDesc}</p>
        <Row className="wrap-button">
          <Button
            type="primary"
            shape="round"
            size="large"
            className="button1 btn-become-validator"
            onClick={() => {
              updateMetric({
                metric: METRIC_TYPE.MINE_BECOME_VALIDATOR,
                uniqMetric: METRIC_UNIQ.MINE_BECOME_VALIDATOR_UNIQ,
              });
              history.push(ValidatorRoute);
            }}
          >
            {structureTrs.becomeValidator}
          </Button>
          {/*<Button*/}
          {/*  type="primary"*/}
          {/*  shape="round"*/}
          {/*  size="large"*/}
          {/*  className="button1 btn-buy-pnode"*/}
          {/*  onClick={() => {*/}
          {/*    updateMetric({*/}
          {/*      metric: METRIC_TYPE.MINE_BUY_PNODE,*/}
          {/*      uniqMetric: METRIC_UNIQ.MINE_BUY_PNODE_UNIQ,*/}
          {/*    });*/}
          {/*    window.open('https://node1-staging.incognito.org/', '_blank');*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Buy a Node*/}
          {/*</Button>*/}
        </Row>
      </Col>
      <img src={logoStrokeImg} className="logo-stroke" alt="logo-stroke" />
    </Styled>
  );
};

export default React.memo(Section1);
