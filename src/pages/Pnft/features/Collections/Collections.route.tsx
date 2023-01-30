import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const appName = 'pnft';
export const route = `papps/${appName}`;

const CollectionRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./Collections')),
  name: 'Pnft',
  to: route,
};

export default CollectionRoute;
