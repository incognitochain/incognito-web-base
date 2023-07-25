import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/InscriptionDetail';

const InscriptionDetailRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./InscriptionDetail.home')),
  name: 'InscriptionDetail',
  to: route,
};

export default InscriptionDetailRoute;
