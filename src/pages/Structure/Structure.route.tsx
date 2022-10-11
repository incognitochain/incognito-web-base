import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/infrastructure';

const StructureRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./Structure')),
  name: 'infrastructure',
  to: route,
};

export default StructureRoute;
