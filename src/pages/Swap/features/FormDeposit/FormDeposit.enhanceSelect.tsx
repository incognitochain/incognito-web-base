import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import React from 'react';
import { useAppDispatch } from 'state/hooks';

import { actionFilterSetToken, actionFilterTokenByNetwork } from './FormDeposit.actions';

export interface TInter {
  onSelectToken: ({ token }: { token: PToken }) => void;
  onSelectNetwork: ({ network }: { network: ITokenNetwork }) => void;
}

const enhanceSelect = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    const dispatch = useAppDispatch();
    const handleSelectToken = ({ token }: { token: PToken }) => {
      dispatch(actionFilterSetToken({ token }));
    };

    const handleSelectNetwork = ({ network }: { network: ITokenNetwork }) => {
      dispatch(actionFilterTokenByNetwork({ network }));
    };

    return (
      <WrappedComponent {...{ ...props, onSelectToken: handleSelectToken, onSelectNetwork: handleSelectNetwork }} />
    );
  };
  FormDepositComp.displayName = 'FormDeposit.enhanceSelect';
  return FormDepositComp;
};

export default enhanceSelect;
