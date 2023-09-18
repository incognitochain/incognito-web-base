import axios from 'axios';
import ErrorBoundary from 'components/Core/ErrorBoundary';
import React from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { actionGetPools, actionSetExplorer } from 'state/pools';
import { actionGetPTokens } from 'state/token';
import { KEYS, StorageManager } from 'storage';

import enhanceLoadWasm from './App.enhanceLoadWasm';
import enhanceScainCoin from './App.enhanceScainCoin';

const enhance = (WrappedComponent: React.FunctionComponent) => {
  const AppComp = (props: any) => {
    const dispatch = useDispatch();

    const getPTokenList = () => {
      dispatch(actionGetPTokens());
      try {
        axios.get('https://api-explorer.incognito.org/api/v1/explorer/summary').then((data) => {
          const volume = Math.ceil(
            data.data.data.find((item: any) => item['metricType'] === 'WEB_PAPP_TOTAL_TRADING_VOLUME').value / 1e6
          );
          StorageManager.setItem(KEYS.TRADE_VOLUME, `${volume}`);
          dispatch(actionSetExplorer(data.data.data));
        });
      } catch (e) {
        console.log('GET DATA ERROR', e);
      }
    };

    const getListPool = () => {
      dispatch(actionGetPools());
    };

    React.useEffect(() => {
      getPTokenList();
      getListPool();
    }, []);

    return (
      <ErrorBoundary>
        <WrappedComponent {...{ ...props }} />
      </ErrorBoundary>
    );
  };
  AppComp.displayName = 'App.enhance';
  return AppComp;
};

export default compose(enhanceLoadWasm, enhanceScainCoin, enhance);
