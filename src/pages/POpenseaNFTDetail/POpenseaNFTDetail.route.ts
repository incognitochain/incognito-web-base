import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/popensea/detail/nft-detail';

const POpenseaDetailAppRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./POpenseaNFTDetail.home')),
  name: 'pOpenseaNFTDetail',
  to: route,
};

export default POpenseaDetailAppRoute;
