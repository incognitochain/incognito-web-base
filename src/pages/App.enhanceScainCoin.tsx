import ErrorBoundary from 'components/Core/ErrorBoundary';
import { useModal } from 'components/Modal';
import debounce from 'lodash/debounce';
import BoxScanCoinModal from 'pages/IncWebWallet/components/BoxScanCoin';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isShowConfirmScanCoins } from 'state/scanCoins/scanCoins.selectors';

const enhanceScainCoin = (WrappedComponent: React.FunctionComponent) => {
  const AppScainCoin = (props: any) => {
    const showConfirmScanCoins = useSelector(isShowConfirmScanCoins);
    const { setModal } = useModal();
    const showModalDebounce = debounce(
      () =>
        setModal({
          data: <BoxScanCoinModal />,
          title: '',
          isTransparent: true,
          closable: false,
        }),
      500
    );

    useEffect(() => {
      if (showConfirmScanCoins) {
        showModalDebounce();
      }
    }, [showConfirmScanCoins]);
    return (
      <ErrorBoundary>
        <WrappedComponent {...{ ...props }} />
      </ErrorBoundary>
    );
  };

  AppScainCoin.displayName = 'App.enhanceScainCoin';
  return AppScainCoin;
};

export default enhanceScainCoin;
