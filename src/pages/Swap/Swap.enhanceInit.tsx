import React from 'react';
import { batch, useDispatch } from 'react-redux';
import { reset } from 'redux-form';

import { actionGetVaults } from './features/FormUnshield/FormUnshield.actions';
import { FORM_CONFIGS } from './Swap.constant';

export interface TInnerInit {
  isInitingForm: boolean;
}

const enhanceInit = (WrappedComp: any) => {
  const SwapInit = (props: any) => {
    const dispatch = useDispatch();
    const [init, setInit] = React.useState(false);
    const isInitingForm = init;

    const resetForm = () => dispatch(reset(FORM_CONFIGS.formName));

    const initData = () => {
      if (init) {
        return;
      }
      try {
        setInit(false);
        batch(() => {
          dispatch(actionGetVaults());
          resetForm();
        });
      } catch (error) {
        console.log('INIT SWAP DATA ERROR: ', error);
      } finally {
        setInit(true);
      }
    };

    React.useEffect(() => {
      initData();
    }, []);

    return <WrappedComp {...{ ...props, isInitingForm, resetForm }} />;
  };
  SwapInit.displayName = 'Swap.init';
  return SwapInit;
};

export default enhanceInit;
