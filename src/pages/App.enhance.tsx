import axios from 'axios';
import ErrorBoundary from 'components/Core/ErrorBoundary';
import React from 'react';
import { useDispatch } from 'react-redux';
import { actionGetPTokens } from 'state/token';

export const KEY_TRADE_VOLUME = 'TRADE_VOLUME';

const enhance = (WrappedComponent: React.FunctionComponent) => {
  const AppComp = (props: any) => {
    const dispatch = useDispatch();

    const getPTokenList = () => {
      dispatch(actionGetPTokens());
      try {
        axios.get('https://api-explorer.incognito.org/api/v1/explorer/summary').then((data) => {
          const volume = Math.ceil(
            data.data.data.find((item: any) => item['metricType'] === 'TRADING_VOLUME_TOTAL').value / 1e6
          );
          localStorage.setItem(KEY_TRADE_VOLUME, `${volume}`);
        });
      } catch (e) {
        console.log('GET DATA ERROR', e);
      }
    };

    React.useEffect(() => {
      getPTokenList();
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

export default enhance;
