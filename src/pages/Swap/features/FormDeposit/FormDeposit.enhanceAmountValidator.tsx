import { BigNumber } from 'bignumber.js';
import { validator } from 'components/Core/ReduxForm';
import debounce from 'lodash/debounce';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { change, focus } from 'redux-form';
import { useAppDispatch } from 'state/hooks';
import convert from 'utils/convert';

import { IDeposit } from './FormDeposit.hook';

export interface TInner {
  validateAmount: () => any;
  onClickMax: () => any;
}

interface IState {
  maxAmountValidator: any;
  minAmountValidator: any;
}

const initialState: IState = {
  maxAmountValidator: undefined,
  minAmountValidator: undefined,
};

const enhanceAmountValidator = (WrappedComponent: any) => {
  const FormDepositComp = (props: IDeposit & any) => {
    const { amount, sellToken: selectedPrivacy } = props;
    const dispatch = useAppDispatch();
    const { maximumAmountText } = amount;
    const [state, setState] = React.useState({ ...initialState });
    const { maxAmountValidator, minAmountValidator } = state;

    const setFormValidator = debounce(async () => {
      const maxAmountNum = convert.toNumber({
        text: maximumAmountText,
        autoCorrect: true,
      });
      let currentState = { ...state };
      if (Number.isFinite(maxAmountNum)) {
        currentState = {
          ...state,
          maxAmountValidator: validator.maxValue(
            maxAmountNum,
            new BigNumber(maxAmountNum).toNumber() > 0
              ? `Max amount you can deposit is ${amount.maximumAmountText} ${selectedPrivacy?.symbol}`
              : 'Your balance is insufficient.'
          ),
        };
        await setState(currentState);
      }
    }, 200);

    const getAmountValidator = () => {
      const val = [];
      if (minAmountValidator) val.push(minAmountValidator);
      if (maxAmountValidator) val.push(maxAmountValidator);
      if (selectedPrivacy?.isIncognitoToken) {
        val.push(...validator.combinedNanoAmount);
      }
      val.push(...validator.combinedAmount);
      return [...val];
    };

    React.useEffect(() => {
      setFormValidator();
    }, [selectedPrivacy]);

    const onChangeField = async (value: string, field: string) => {
      const val: any = value;
      dispatch(change(FORM_CONFIGS.formName, field, val));
      dispatch(focus(FORM_CONFIGS.formName, field));
    };

    const onClickMax = async () => {
      if (!maximumAmountText) return;
      onChangeField(maximumAmountText, FORM_CONFIGS.sellAmount).then();
    };

    const validateAmount: any[] = getAmountValidator();

    return <WrappedComponent {...{ ...props, validateAmount, onClickMax }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhanceAmountValidator';
  return FormDepositComp;
};

export default enhanceAmountValidator;
