import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/import-wallet';

const ImportWalletRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./ImportWallet')),
  name: 'ImportWallet',
  to: route,
};

export default ImportWalletRoute;
