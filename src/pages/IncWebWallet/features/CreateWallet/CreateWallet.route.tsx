import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/wallet/create';

const CreateWalletRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./CreateWallet')),
  name: 'CreateWallet',
  to: route,
};

export default CreateWalletRoute;
