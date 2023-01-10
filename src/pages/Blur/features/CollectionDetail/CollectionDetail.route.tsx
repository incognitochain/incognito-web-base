import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const appName = 'pblur';
export const route = `/papps/${appName}/:contract`;

const CollectionDetailRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./CollectionDetail')),
  name: 'Blur',
  to: route,
};

export default CollectionDetailRoute;
