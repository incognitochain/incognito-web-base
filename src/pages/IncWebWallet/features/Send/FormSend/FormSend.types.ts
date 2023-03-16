import React from 'react';
import { InjectedFormProps } from 'redux-form';

export interface FieldAction {
  onChangeField: (value: string, field: string) => any;
}

export interface IMergeProps extends InjectedFormProps<any, any>, FieldAction {}
export interface SendFormProps extends IMergeProps {}

export type WrappedComponentType = React.FunctionComponent<SendFormProps> | React.ComponentClass<SendFormProps>;
