import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { compose } from 'redux';
import { InjectedFormProps, reduxForm } from 'redux-form';

import enhanceAddressValidation, { TInner as TInnerAddress } from './FormDeposit.enhanceAddressValidator';
import enhanceAmountValidator, { TInner as TInnerAmount } from './FormDeposit.enhanceAmountValidator';
import enhanceChangeField, { TInner as TInnerChangeField } from './FormDeposit.enhanceChangeField';
import enhanceInit from './FormDeposit.enhanceInit';
import enhanceSelect, { TInter as TInnerSelect } from './FormDeposit.enhanceSelect';
import { TInter as TInnerSend } from './FormDeposit.enhanceSend';
import enhanceDeposit from './FormDeposit.enhanceSend';
import { IDeposit } from './FormDeposit.hook';

export interface IMergeProps
  extends InjectedFormProps<any, any>,
    IDeposit,
    TInnerChangeField,
    TInnerAddress,
    TInnerAmount,
    TInnerSelect,
    TInnerSend {}

const enhance = (WrappedComponent: any) => {
  const FormDepositComp = (props: IMergeProps & any) => {
    return <WrappedComponent {...{ ...props }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhance';
  return FormDepositComp;
};

export default compose(
  reduxForm({
    form: FORM_CONFIGS.formName,
  }),
  enhanceInit,
  enhanceChangeField,
  enhanceAmountValidator,
  enhanceAddressValidation,
  enhanceSelect,
  enhanceDeposit,
  enhance
) as any;
