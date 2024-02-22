import { FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';

export interface IRouteProps extends RouteProps {
  id?: string | number;
  name: string;
  to: string;
  path: string;
  component: FunctionComponent | any;
  exact: boolean;
}
export { route as routeEarnings } from './Earnings/Earnings.route';
// export { default as MainRoute } from './MainRoute';
export { route as routeHome } from './Home/Home.route';
export { route as routeInscription } from './Inscriptions/Inscriptions.route';
export { route as routeMarket } from './Market/Market.route';
export { route as routePeggingApps } from './PeggingApp/PeggingApp.route';
export { route as routeStructure } from './Structure/Structure.route';
