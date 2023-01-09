import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const appName = 'pblur';
export const route = `papps/${appName}`;

const CollectionsRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./Collections')),
  name: 'Blur',
  to: route,
};

export default CollectionsRoute;
