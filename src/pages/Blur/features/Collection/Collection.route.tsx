import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const appName = 'pblur';
export const route = `papps/${appName}`;

const CollectionRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./Collection')),
  name: 'Blur',
  to: route,
};

export default CollectionRoute;
