import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/deposit';

const DepositRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./DepositPage')),
  name: 'Deposit',
  to: route,
};

export default DepositRoute;
