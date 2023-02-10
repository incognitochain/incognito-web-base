import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/create-wallet';

const CreateWalletRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./CreateWallet')),
  name: 'CreateWallet',
  to: route,
};

export default CreateWalletRoute;
