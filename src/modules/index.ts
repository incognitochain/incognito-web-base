import { FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';

export interface IRouteProps extends RouteProps {
  path: string;
  component: FunctionComponent | any;
  exact: boolean;
}
