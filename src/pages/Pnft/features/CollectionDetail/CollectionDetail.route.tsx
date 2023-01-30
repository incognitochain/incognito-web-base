import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const appName = 'pnft';
export const route = `/papps/${appName}/:slug`;

const CollectionDetailRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./CollectionDetail')),
  name: 'Pnft',
  to: route,
};

export default CollectionDetailRoute;
