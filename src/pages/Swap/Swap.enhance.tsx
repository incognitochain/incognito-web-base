import React from 'react';
import { compose } from 'redux';
import { change, focus, reduxForm } from 'redux-form';

import { useAppDispatch } from '../../state/hooks';
import { FORM_CONFIGS } from './Swap.constant';
import enhanceInit from './Swap.enhanceInit';

const enhance = (WrappedComponent: any) => {
  const SwapComp = (props: any) => {
    const dispatch = useAppDispatch();
    const onChangeField = async (e: any, field: string) => {
      const val = e.target.value;
      dispatch(change(FORM_CONFIGS.formName, field, val));
      dispatch(focus(FORM_CONFIGS.formName, field));
    };

    return <WrappedComponent {...{ ...props, onChangeField }} />;
  };
  SwapComp.displayName = 'Swap.enhance';
  return SwapComp;
};

export default compose(
  reduxForm({
    form: FORM_CONFIGS.formName,
  }),
  enhanceInit,
  enhance
) as any;
