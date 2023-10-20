import { ComponentType, FC } from 'react';

const withWalletConnected =
  <T extends any>(Component: ComponentType<T>): FC<T> =>
  (props: any) => {
    return <Component {...props}></Component>;
  };

export default withWalletConnected;
