import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/wallet/settings';

const ImportWalletRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./Settings')),
  name: 'WalletSettings',
  to: route,
};

export default ImportWalletRoute;
