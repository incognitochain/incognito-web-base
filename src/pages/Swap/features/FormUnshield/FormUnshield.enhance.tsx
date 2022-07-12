import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import enhanceChangeField, { TInner as TInnerChangeField } from 'pages/Swap/Swap.enhanceChangeField';
import React from 'react';
import { compose } from 'redux';
import { InjectedFormProps, reduxForm } from 'redux-form';

import enhanceAddressValidation, { TInner as TInnerAddress } from './FormUnshield.enhanceAddressValidator';
import enhanceInit from './FormUnshield.enhanceInit';
import enhanceSelect, { TInter as TInnerSelect } from './FormUnshield.enhanceSelect';
import { IUnshield } from './FormUnshield.hook';

export interface IMergeProps
  extends InjectedFormProps<any, any>,
    IUnshield,
    TInnerChangeField,
    TInnerSelect,
    TInnerAddress {}

const enhance = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: any) => {
    return <WrappedComponent {...{ ...props }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhance';
  return FormUnshieldComp;
};

export default compose(
  reduxForm({
    form: FORM_CONFIGS.formName,
  }),
  enhanceInit,
  enhanceChangeField,
  enhanceAddressValidation,
  enhanceSelect,
  enhance
) as any;
