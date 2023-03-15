// import { ITokenNetwork } from 'models/model/pTokenModel';
// import { Action } from 'redux';

// export enum FormDepositActionType {
//   SET_TOKEN = 'FORM_DEPOSIT/SET_TOKEN',
// }

// export interface IFormDepositReducer {
//   isFetching: boolean;
//   sellToken: ITokenNetwork;
//   buyToken: ITokenNetwork;
// }

// export interface DepositSetTokenPayLoad {
//   sellToken?: ITokenNetwork;
//   buyToken?: ITokenNetwork;
// }

// export interface DepositSetTokenAction extends Action {
//   type: FormDepositActionType.SET_TOKEN;
//   payload: DepositSetTokenPayLoad;
// }

// export type FormDepositActions = DepositSetTokenAction;

import React from 'react';
import { InjectedFormProps } from 'redux-form';

export interface FieldAction {
  onChangeField: (value: string, field: string) => any;
}

export interface IMergeProps extends InjectedFormProps<any, any>, FieldAction {}
export interface SendFormProps extends IMergeProps {}

export type WrappedComponentType = React.FunctionComponent<SendFormProps> | React.ComponentClass<SendFormProps>;
