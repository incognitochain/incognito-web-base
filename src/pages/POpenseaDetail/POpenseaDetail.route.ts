import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/popensea/detail';

const POpenseaDetailAppRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./POpenseaDetail.home')),
  name: 'pOpenseaDetail',
  to: route,
};

export default POpenseaDetailAppRoute;
