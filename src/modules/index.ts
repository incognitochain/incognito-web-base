import { RouteProps } from 'react-router-dom';

export interface IRouteProps extends RouteProps {
  path: string;
  component: any;
  exact: boolean;
}
