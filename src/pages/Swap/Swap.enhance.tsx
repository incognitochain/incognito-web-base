import React from 'react';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { change, focus } from 'redux-form';

import { useAppDispatch } from '../../state/hooks';
import { SwapExchange } from './features/FormUnshield/FormUnshield.types';
import { FORM_CONFIGS } from './Swap.constant';
import enhanceInit from './Swap.enhanceInit';
import { useQuery } from './Swap.hooks';

const enhance = (WrappedComponent: any) => {
  const SwapComp = (props: any) => {
    const dispatch = useAppDispatch();
    const query = useQuery();
    const history = useHistory();
    const exchange = query.get('platform') as any;
    const onChangeField = async (e: any, field: string) => {
      const val = e.target.value;
      dispatch(change(FORM_CONFIGS.formName, field, val));
      dispatch(focus(FORM_CONFIGS.formName, field));
    };

    const redirect = () => {
      const exchangeSupported = Object.values(SwapExchange);
      let path = window.location.pathname;
      const search = new URLSearchParams(window.location.search).get('platform') as any;
      if (exchange && exchangeSupported.includes(search)) {
        path += window.location.search;
        return history.replace(path, {});
      }
      history.replace('/swap', {});
    };

    React.useEffect(redirect, [exchange]);

    return <WrappedComponent {...{ ...props, onChangeField }} />;
  };
  SwapComp.displayName = 'Swap.enhance';
  return SwapComp;
};

export default compose(enhanceInit, enhance) as any;
