import { BigNumber } from 'bignumber.js';
import { validator } from 'components/Core/ReduxForm';
import debounce from 'lodash/debounce';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import convert from 'utils/convert';

import { IMergeProps } from './FormUnshield.enhance';

export interface TInner {
  validateAmount: () => any;
  onChangeField: (value: string, field: string) => any;
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
  const FormUnshieldComp = (props: IMergeProps) => {
    const {
      maxAmountText,
      sellToken: selectedPrivacy,
      onChangeField,
      userBalance,
      inputOriginalAmount,
      enoughPRVFee,
      minUnshieldText,
    } = props;
    const [state, setState] = React.useState({ ...initialState });
    const { maxAmountValidator, minAmountValidator } = state;

    const setFormValidator = debounce(async () => {
      const maxAmountNum = convert.toNumber({
        text: maxAmountText,
        autoCorrect: true,
      });
      const minUnshieldNum = convert.toNumber({
        text: minUnshieldText,
        autoCorrect: true,
      });

      let currentState = { ...state };

      if (Number.isFinite(maxAmountNum)) {
        currentState = {
          ...state,
          maxAmountValidator: validator.maxValue(
            maxAmountNum,
            new BigNumber(maxAmountNum).toNumber() > 0
              ? `Max amount you can swap is ${maxAmountText} ${selectedPrivacy?.symbol}.`
              : 'Your balance is insufficient.'
          ),
        };
      }

      if (!inputOriginalAmount || inputOriginalAmount === 0 || minUnshieldNum) {
        if (Number.isFinite(minUnshieldNum) && minUnshieldNum) {
          currentState = {
            ...currentState,
            minAmountValidator: validator.minValue(
              minUnshieldNum,
              `Amount must be larger than ${minUnshieldText} ${selectedPrivacy?.symbol}.`
            ),
          };
        } else {
          const minAmountText = `${
            convert.toHumanAmountString({
              decimals: selectedPrivacy.pDecimals,
              originalAmount: 1,
            }) || 0
          }`;
          const minAmountNum = convert.toNumber({
            text: minAmountText,
            autoCorrect: true,
          });
          currentState = {
            ...currentState,
            minAmountValidator: validator.minValue(
              minAmountNum,
              `Amount must be larger than ${minAmountText} ${selectedPrivacy?.symbol}.`
            ),
          };
        }
      }
      await setState((state) => ({ ...state, ...currentState }));
    }, 200);

    const getAmountValidator = () => {
      const val = [];
      if (maxAmountValidator) val.push(maxAmountValidator);
      if (minAmountValidator) val.push(minAmountValidator);
      if (!enoughPRVFee) {
        val.push(...[validator.notEnoughPRVFee]);
      }
      if (selectedPrivacy?.isIncognitoToken) {
        val.push(...validator.combinedNanoAmount);
      }
      val.push(...validator.combinedAmount);
      return [...val];
    };

    React.useEffect(() => {
      setFormValidator();
    }, [selectedPrivacy.identify, maxAmountText, selectedPrivacy.amount, inputOriginalAmount, minUnshieldText]);

    const onClickMax = async () => {
      onChangeField(maxAmountText || userBalance || '0', FORM_CONFIGS.sellAmount).then();
    };

    const validateAmount: any[] = getAmountValidator();

    return <WrappedComponent {...{ ...props, validateAmount, onClickMax }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceAmountValidator';
  return FormUnshieldComp;
};

export default enhanceAmountValidator;
