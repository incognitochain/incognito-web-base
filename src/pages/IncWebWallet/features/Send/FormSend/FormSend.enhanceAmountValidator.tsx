import { validator } from 'components/Core/ReduxForm';
import debounce from 'lodash/debounce';
import React from 'react';
import { useAppDispatch } from 'state/hooks';
import convert from 'utils/convert';

import { FORM_CONFIGS } from './FormSend.constant';
import { SendFormProps, WrappedComponentType } from './FormSend.types';

export interface TInner {
  validateAmount: () => any;
}

interface IState {
  maxAmountValidator: any;
  minAmountValidator: any;
}

const enhanceAmountValidation = (WrappedComponent: WrappedComponentType) => {
  const FormSendComp = (props: SendFormProps & any) => {
    const dispatch = useAppDispatch();

    let { selectedPrivacy, isFetching, onChangeField, formatAmountNoClip: amountMaxText } = props;
    const initialState: IState = {
      maxAmountValidator: undefined,
      minAmountValidator: undefined,
    };
    const [state, setState] = React.useState({ ...initialState });
    const { maxAmountValidator, minAmountValidator } = state;

    const onAmountMaxClicked = () => {
      if (isFetching) return;
      // dispatch(actionSetIsMax(true));
      onChangeField(amountMaxText || '0.00', FORM_CONFIGS.amount).then();
    };

    const setFormValidator = debounce(async () => {
      const maxAmountNum = convert.toNumber({
        text: amountMaxText,
        autoCorrect: true,
      });
      let currentState = { ...state };

      if (Number.isFinite(maxAmountNum)) {
        currentState = {
          ...state,
          maxAmountValidator: validator.maxValue(maxAmountNum, 'Your balance is insufficient.'),
        };
      }
      await setState((state) => ({ ...state, ...currentState }));
    }, 200);

    React.useEffect(() => {
      setFormValidator();
    }, []);

    const getAmountValidator = () => {
      const val = [];
      if (maxAmountValidator) val.push(maxAmountValidator);
      if (minAmountValidator) val.push(minAmountValidator);
      if (selectedPrivacy?.isIncognitoToken) {
        val.push(...validator.combinedNanoAmount);
      }
      val.push(...validator.combinedAmount);
      return [...val];
    };

    const validateAmount: any[] = getAmountValidator();

    return (
      <WrappedComponent
        {...{
          ...props,
          validateAmount,
          onAmountMaxClicked,
        }}
      />
    );
  };
  FormSendComp.displayName = 'FormSend.enhanceAmountValidation';
  return FormSendComp;
};

export default enhanceAmountValidation;
