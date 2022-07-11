import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { change, focus } from 'redux-form';
import { useAppDispatch } from 'state/hooks';

import { IDeposit } from './FormDeposit.hook';

export interface TInner {
  onChangeField: (value: string, field: string) => any;
}

const enhanceChangeField = (WrappedComponent: any) => {
  const FormDepositComp = (props: IDeposit & any) => {
    const dispatch = useAppDispatch();

    const onChangeField = async (value: string, field: string) => {
      const val: any = value;
      dispatch(change(FORM_CONFIGS.formName, field, val));
      dispatch(focus(FORM_CONFIGS.formName, field));
    };

    return <WrappedComponent {...{ ...props, onChangeField }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhanceChangeField';
  return FormDepositComp;
};

export default enhanceChangeField;
