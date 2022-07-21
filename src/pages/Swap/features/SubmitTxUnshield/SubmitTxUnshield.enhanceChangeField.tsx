import React from 'react';
import { change, focus } from 'redux-form';
import { useAppDispatch } from 'state/hooks';

import { FORM_CONFIGS } from './SubmitTxUnshield.constant';

const enhanceChangeField = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    const dispatch = useAppDispatch();

    const onChangeField = async (value: string, field: string) => {
      const val: any = value;
      dispatch(change(FORM_CONFIGS.formName, field, val));
      dispatch(focus(FORM_CONFIGS.formName, field));
    };

    return <WrappedComponent {...{ ...props, onChangeField }} />;
  };
  FormDepositComp.displayName = 'FormUnshield.enhanceChangeField';
  return FormDepositComp;
};

export default enhanceChangeField;
