import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/buy-node';

const BuyNodeRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./BuyNode')),
  name: 'BuyNode',
  to: route,
};

export default BuyNodeRoute;
