import { Col, Row } from 'antd';
import validator from 'assets/images/validator.png';
import React, { memo, useEffect, useState } from 'react';
import { METRIC_TYPE, METRIC_UNIQ, updateMetric } from 'services/rpcMetric';
import styled, { DefaultTheme } from 'styled-components/macro';
import { convertISOtoMMYYYY } from 'utils/timeUtils';

import { ChartData, ChartDataInit, ChartDataItem } from './Validators.rewardEstimation';
import { formatPrice } from './Validators.utils';

const Styled = styled.div`
  display: flex;
  margin-top: 40px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-radius: 24px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.color_grey2};
  .description2 {
    margin-top: 40px;
    color: ${({ theme }) => theme.color_grey};
    font-size: 18px;
  }
  .h3_1 {
    font-weight: 700;
    margin-top: 4px;
  }
  .btn-buy {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    padding: 14px 24px;
    width: 156px;
    height: 50px;
    border-radius: 8px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.btn1};
    color: ${({ theme }) => theme.color_white};
    :hover {
      opacity: 0.8;
    }
  }

  .col-2 {
    margin-left: 40px;
  }

  .leftView {
    display: flex;
    flex: 0.5;
    padding: 40px;
    justify-content: center;
    flex-direction: column;
    .descriptionContainer {
      margin-top: 20px;
    }
  }

  .rightView {
    flex: 0.4;
    padding: 20px;
    .img {
      width: 100%;
      max-width: 625.99px;
      max-height: 437px;
      height: auto;
      margin-left: auto;
      margin-right: auto;
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
    flex-direction: row;
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
    flex-direction: row;
    .leftView {
      flex: 1.1;
      padding: 40px;
    }
    .rightView {
      flex: 0.9;
      padding: 0px;
      .img {
        margin: 30px 10px 30px 30px;
      }
    }
  `} 
  
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    .col-2 {
      margin-left: auto;
    }
    .leftView {
      padding: 24px;
      .descriptionContainer {
        margin-top: 16px;
      }
    }
    .rightView {
      margin-left: 20px;
      margin-bottom: 20px;
      margin-top: 25px;
    }
    h3 {
      text-align: center;
    }
    .btn-buy {
      width: 100%;  
    }
  `}
`;

const ValidatorsJoinNetwork = () => {
  // const history = useHistory();
  const [dataChart, setDataChart] = useState<ChartData>(ChartDataInit);
  const [drawDataChart, setDrawDataChart] = useState<any[]>([]);

  const getData = async () => {
    try {
      fetch('https://api-explorer.incognito.org/api/v1/explorer/landing-validator-data')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setDataChart(data?.data);
          convertData(data?.data?.activeValidatorChartData || []);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const convertData = (listData: ChartDataItem[]) => {
    const activeValidatorChartData: ChartDataItem[] = listData;
    const result = activeValidatorChartData.map((item, index) => ({
      time: convertISOtoMMYYYY(item.startOfMonth),
      // APR: formatPrice({ price: item.averageAPR }),
      'Active Validator': item.activeValidator,
    }));
    setDrawDataChart(result);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Styled>
      <div className="leftView">
        <h3>Join the Validator Network</h3>
        <div className="descriptionContainer">
          <p className="h8">
            Validators imply a group of nodes that perform consensus work, including verifying transactions, voting to
            add new blocks to the blockchain and earning block rewards.
          </p>
          <div
            className="btn-buy fs-regular"
            onClick={() => {
              const view = document.getElementById('HOW_STAKE');
              if (view) {
                const y = view.getBoundingClientRect().top + window.scrollY - 120;
                updateMetric({ metric: METRIC_TYPE.MINE_HOW_STAKE, uniqMetric: METRIC_UNIQ.MINE_HOW_STAKE_UNIQ });
                window.scroll({
                  top: y,
                  behavior: 'smooth',
                });
              }
            }}
          >
            How to stake
          </div>
        </div>
        <Row>
          <Col>
            <p className="description2">Estimated APR:</p>
            <div className="rowTableView">
              <h3 className="h3_1">{formatPrice({ price: dataChart.estimatedAPR })}%</h3>
            </div>
          </Col>
          <Col className="col-2">
            <p className="description2">Total validators:</p>
            <div className="rowTableView">
              <h5 className="h3_1">{formatPrice({ price: dataChart.totalValidator })}</h5>
            </div>
          </Col>
        </Row>
      </div>
      <div className="rightView center">
        <img className="img" src={validator} alt="phone-incognito-validator" />
      </div>
    </Styled>
  );
};

export default memo(ValidatorsJoinNetwork);
