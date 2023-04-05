import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled, { DefaultTheme } from 'styled-components/macro';
import { convertISOtoMMYYYY } from 'utils/timeUtils';

import { formatPrice } from './Validators.utils';

const MAX_ACTIVE_VALIDATOR = 5000;
const MAX_APR = 180;
export interface ChartDataItem {
  PRVRewardInMonth: number;
  activeValidator: number;
  averageAPR: number;
  beaconHeight: number;
  startOfMonth: string;
}
export interface ChartData {
  activeValidatorChartData: ChartDataItem[];
  circulatingSupply: number;
  estimatedAPR: number;
  totalPRVStaked: number;
  totalValidator: number;
}

export const ChartDataInit: ChartData = {
  activeValidatorChartData: [],
  circulatingSupply: 0,
  estimatedAPR: 0,
  totalPRVStaked: 0,
  totalValidator: 0,
};

const Styled = styled.div<{ isMobile: boolean }>`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  h5 {
    font-size: 20px;
    margin-top: 8px;
  }

  .contentView {
    margin-top: 60px;
    display: flex;
    flex-direction: row;
    .leftView {
      flex: 0.75;
      display: flex;
      border: 2px solid ${({ theme }: { theme: DefaultTheme }) => theme.color_grey3};
      border-radius: 24px;
      max-height: 576px;
      overflow: hidden;
      align-items: center;
      justify-content: center;
    }
    .rightView {
      display: flex;
      flex: 0.25;
      margin-left: 30px;
      padding: 40px;
      border: 2px solid ${({ theme }: { theme: DefaultTheme }) => theme.color_grey3};
      border-radius: 24px;
      .tableContent {
        flex: 1;
        flex-direction: column;
        .rowTableView {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 16px;
        }
      }
    }

    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
      display: flex;
      flex-direction: row;
    `}

    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
      margin-top: 60px;
      flex-direction: column;
      .leftView {
        display: flex;
        flex: 0.82;
        justify-content: center;
        overflow-x: auto;
        overflow-y: hidden;
        .chart-container {
          min-height: 570px;
        }
      }
      .rightView {
        flex: 0.18;
        margin-left: 0px;
        margin-top: 25px;
        margin-right: 0px;
      }
    `}

    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
      flex-direction: column;
      .leftView {
        overflow-x: auto;
        overflow-y: hidden;
        display: flex;
        justify-content: center;
        .chart-container {
          min-height: 460px;
        }
      }
      .rightView {
        margin-top: 16px;
        padding: 24px;
      }
    `}
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    .contentView {
      margin-top: 32px;
    }
  `}

  .timeText {
    word-wrap: break-word;
    line-break: auto;
    text-align: center;
  }

  .wrapperClassName {
    border-color: transparent;
    border-radius: 14px;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    margin-top: 80px;
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    margin-top: 50px;
  `}
`;

const CustomizedAxisTick = (props: any) => {
  const { x, y, stroke, payload } = props;
  return (
    <g transform={`translate(${x - 28},${y - 20})`}>
      <foreignObject x="10" y="10" width="40" height="40">
        <p className="timeText">{payload.value}</p>
      </foreignObject>
    </g>
  );
};

const formatterContent = (value: any, name: any, props: any) => {
  if (name === 'APR') {
    return [value + ' %', name, props];
  }
  return [value, name, props];
};

const ValidatorRewardEstimation = () => {
  // const history = useHistory();
  const [dataChart, setDataChart] = useState<ChartData>(ChartDataInit);
  const [drawDataChart, setDrawDataChart] = useState<any[]>([]);

  const getData = async () => {
    try {
      fetch('https://api-explorer.incognito.org/api/v1/explorer/landing-validator-data')
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
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
    <Styled isMobile={isMobile}>
      <h3 className="text-center">Rewards Estimation</h3>
      <div className="contentView">
        <div className="leftView">
          <ResponsiveContainer className="chart-container" width="96%">
            <ComposedChart
              data={drawDataChart}
              margin={{
                top: 50,
                right: 10,
                left: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid stroke="#363636" vertical={false} strokeDasharray="3 3" horizontal={{ width: '100%' }} />
              <XAxis
                dataKey="time"
                stroke="#363636"
                height={50}
                minTickGap={0}
                tickMargin={10}
                angle={40}
                width={10}
                tick={<CustomizedAxisTick />}
              />

              <Tooltip
                wrapperClassName="wrapperClassName"
                contentStyle={{
                  padding: 15,
                  paddingLeft: 22,
                  paddingRight: 22,
                  backgroundColor: '#141111',
                  borderColor: 'transparent',
                  lineHeight: 1.8,
                  fontWeight: 600,
                  fontSize: 16,
                }}
                formatter={formatterContent}
                labelStyle={{
                  color: '#9C9C9C',
                  fontWeight: 400,
                  fontSize: 16,
                }}
              />
              <Legend
                iconSize={14}
                wrapperStyle={{
                  paddingTop: 30,
                  paddingBottom: 30,
                }}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#1A73E8"
                padding={{
                  top: 50,
                }}
                type="number"
                domain={[0, MAX_ACTIVE_VALIDATOR]}
                tickCount={6}
                allowDataOverflow={true}
              />
              <Bar yAxisId="left" dataKey="Active Validator" isAnimationActive={false} fill="#1A73E8" barSize={35} />
              <YAxis
                stroke="#FFFFFF"
                orientation="right"
                padding={{
                  top: 50,
                }}
                domain={[0, MAX_APR]}
                tickCount={8}
              />
              {/*<Line*/}
              {/*  isAnimationActive={false}*/}
              {/*  type="monotone"*/}
              {/*  orientation="right"*/}
              {/*  strokeWidth={0.8}*/}
              {/*  dataKey="APR"*/}
              {/*  dot={{ stroke: '#FFFFFF', strokeWidth: 1, r: 4, strokeDasharray: '' }}*/}
              {/*  stroke="#FFFFFF"*/}
              {/*  fill={'#FFFFFF'}*/}
              {/*/>*/}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="rightView">
          <div className="tableContent">
            <p className="description2">Circulating supply:</p>
            <div className="rowTableView">
              <h5>{formatPrice({ price: dataChart.circulatingSupply })}</h5>
              <h5>PRV</h5>
            </div>
            <p className="description2">Total PRV staked:</p>
            <div className="rowTableView">
              <h5>{formatPrice({ price: dataChart.totalPRVStaked })}</h5>
              <h5>PRV</h5>
            </div>

            <p className="description2">Estimated APR:</p>
            <div className="rowTableView">
              <h5>{formatPrice({ price: dataChart.estimatedAPR })}</h5>
              <h5>%</h5>
            </div>

            <p className="description2">Total validators:</p>
            <div className="rowTableView">
              <h5>{formatPrice({ price: dataChart.totalValidator })}</h5>
            </div>

            <p className="description2">Statistics on</p>
            <div className="rowTableView">
              <h5>{moment(new Date().toISOString()).format('MM/DD/YYYY')}</h5>
            </div>
          </div>
        </div>
      </div>
    </Styled>
  );
};

export default memo(ValidatorRewardEstimation);
