import useIsWindowVisible from 'hooks/useIsWindowVisible';
import debounce from 'lodash/debounce';
import React from 'react';
import rpcMetric, { METRIC_TYPE } from 'services/rpcMetric';
import { useAppDispatch } from 'state/hooks';

import { actionEstimateFee, actionEstimateSwapFee, actionResetFee } from './FormUnshield.actions';
import { FormTypes } from './FormUnshield.types';

export interface TInner {
  onEstimateFee: () => void;
}

export interface IEstimate {
  isResetForm: boolean;
}

let UPDATED_METRIC = false;

const enhanceFee = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: any) => {
    const dispatch = useAppDispatch();
    const {
      isExternalAddress,
      unshieldAddress,
      incAddress,
      inputAmount,
      sellToken,
      buyToken,
      formType,
      buyNetworkName,
      slippage,
    } = props;

    const initRef = React.useRef(false);
    const intervalRef = React.useRef<typeof setInterval>();
    const isFocused = useIsWindowVisible();
    const onResetFee = () => {
      // Reset estimate fee data
      dispatch(actionResetFee());
    };

    const onClearInterval = () => {
      // @ts-ignore
      clearInterval(intervalRef.current);
      // @ts-ignore
      intervalRef.current = null;
    };

    const onEstimateUnshieldFee = async ({ isResetForm = true }: IEstimate) => {
      isResetForm && onResetFee();
      return dispatch(actionEstimateFee());
    };

    const onEstimateSwapFee = async ({ isResetForm = true }: IEstimate) => {
      isResetForm && onResetFee();
      await dispatch(actionEstimateSwapFee({ isResetForm }));
    };

    const handleEstimateFee = async ({ isResetForm = true }: IEstimate) => {
      let func: any = null;
      if (formType === FormTypes.SWAP) {
        // Case estimate fee for swapped transactions
        func = onEstimateSwapFee;
      } else if (formType === FormTypes.UNSHIELD && unshieldAddress && isExternalAddress && incAddress) {
        // Case estimate fee for unshielded transactions
        func = onEstimateUnshieldFee;
      }

      if (func && typeof func === 'function') {
        await func({ isResetForm });
      }
    };

    const updateMetric = () => rpcMetric.updateMetric({ type: METRIC_TYPE.ESTIMATE_SWAP });

    const onEstimate = async () => {
      if (!UPDATED_METRIC) {
        updateMetric().then();
        UPDATED_METRIC = true;
      }
      await handleEstimateFee({ isResetForm: true });
      if (intervalRef && !intervalRef.current && formType === FormTypes.SWAP) {
        // @ts-ignore
        intervalRef.current = setInterval(async () => {
          await handleEstimateFee({ isResetForm: false });
        }, 15000);
      }
    };

    const debounceEstimateFee = React.useCallback(debounce(onEstimate, 700), [
      isFocused,
      unshieldAddress,
      formType,
      incAddress,
      isExternalAddress,
    ]);

    React.useEffect(() => {
      if (initRef && !initRef.current) {
        setTimeout(() => (initRef.current = true), 200);
        return;
      }
      onClearInterval();
      debounceEstimateFee();
      return () => {
        onClearInterval();
      };
    }, [
      unshieldAddress,
      isExternalAddress,
      incAddress,
      inputAmount,
      sellToken.tokenID,
      buyToken.tokenID,
      buyNetworkName,
      slippage,
      formType,
    ]);

    return <WrappedComponent {...{ ...props }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceFee';
  return FormUnshieldComp;
};

export default enhanceFee;
