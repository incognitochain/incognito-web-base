import React, { FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';

export interface IRouteProps extends RouteProps {
  path: string;
  element: React.ReactNode;
  exact: boolean;
  key: string;
}
