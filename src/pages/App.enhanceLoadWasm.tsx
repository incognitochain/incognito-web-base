import ErrorBoundary from 'components/Core/ErrorBoundary';
import React, { useEffect } from 'react';
import { isLocalhost } from 'serviceWorkerRegistration';
const { init } = require('incognito-chain-web-js/build/web/wallet');

const enhanceLoadWasm = (WrappedComponent: React.FunctionComponent) => {
  const AppLoadWasm = (props: any) => {
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
      const loadPrivacyWasm = async () => {
        try {
          const wasmFileURL = isLocalhost
            ? (window.location?.origin || window.location?.host) + '/assets/privacy.wasm'
            : window.location.origin + '/assets/privacy.wasm';

          // console.log('WASM File URL ', wasmFileURL);

          // await init(wasmFileURL, 8);
          // await fetch(wasmFileURL);
        } catch (error) {
          console.log('[APP] loadPrivacyWasm ERROR: ', error);
        } finally {
          setLoading(false);
        }
      };
      loadPrivacyWasm();
    });

    if (loading) return null;

    return (
      <ErrorBoundary>
        <WrappedComponent {...{ ...props }} />
      </ErrorBoundary>
    );
  };

  AppLoadWasm.displayName = 'App.enhanceLoadsWasm';
  return AppLoadWasm;
};

export default enhanceLoadWasm;
