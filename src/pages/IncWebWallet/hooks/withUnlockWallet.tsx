import React, { ComponentType, FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { webWalletStateSelector } from 'state/masterKey';

const withUnlockWallet =
  <P extends any>(Component: ComponentType<P>, redirectTo?: string): FC<P> =>
  (props) => {
    const walletState = useSelector(webWalletStateSelector);
    if (walletState === 'unlocked') {
      return <Component {...props} />;
    }
    return (
      <Redirect
        to={{
          pathname: redirectTo || '/',
        }}
      />
    );
  };

export default withUnlockWallet;
