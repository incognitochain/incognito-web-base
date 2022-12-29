import { Col, Row } from 'antd';
import { LinkIcon } from 'components/icons';
import { MAIN_NETWORK_NAME } from 'constants/token';
import { actionSetSwapNetwork } from 'pages/Swap/features/FormUnshield/FormUnshield.actions';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useHistory } from 'react-router-dom';
import { updateMetric } from 'services/rpcMetric';
import { useAppDispatch } from 'state/hooks';

import { SwapExchange } from '../../../Swap/features/FormUnshield/FormUnshield.types';
import { IFactory } from './Apps.list';
import { WrapAppItem } from './Apps.styled';

const AppItem = React.memo(({ data }: { data: IFactory }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const canClick = !!data.exchange;
  return (
    <WrapAppItem key={data.name} isMobile={isMobile} canClick={canClick}>
      <div
        className="box"
        onClick={() => {
          if (!canClick) return;
          dispatch(actionSetSwapNetwork(MAIN_NETWORK_NAME.INCOGNITO));
          if (data.metric && data.metricUniq) {
            updateMetric({ metric: data.metric, uniqMetric: data.metricUniq });
          }
          if (SwapExchange.PDEX === data.exchange) {
            return history.push('swap', { appName: data.name });
          }
          history.push(`papps/${data.exchange}`, { appName: data.name });
        }}
      >
        <Row justify="space-between">
          <img src={data?.img} className="exchange-logo" alt="exchange-logo" />
          {canClick && <LinkIcon className="vector-link-icon" />}
        </Row>
        <Col>
          <Row className="wrap-status">
            <h5 className="exchange-name">{data?.name}</h5>
            {!canClick && <p className="h8 status">{data?.status}</p>}
          </Row>
          <p className="h8 exchange-name-desc">{data?.nameDesc}</p>
          <Row style={{ minWidth: 250 }}>
            {data.chain.map((item: any) => (
              <div key={item} className="wrap-chain">
                <p className="h8">{item}</p>
              </div>
            ))}
          </Row>
        </Col>
      </div>
      <p className="h8 description">
        {data.desc}{' '}
        {!!data.link && (
          <span
            className="link-text"
            onClick={() => {
              window.open(data.linkPath, '_blank');
            }}
          >
            {` ${data.link}.`}
          </span>
        )}
      </p>
    </WrapAppItem>
  );
});

export default AppItem;
