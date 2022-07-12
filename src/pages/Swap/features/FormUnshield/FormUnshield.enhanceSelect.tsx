import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import React from 'react';
import { useAppDispatch } from 'state/hooks';

import { actionChangeBuyNetwork, actionChangeSellToken } from './FormUnshield.actions';

export interface TInter {
  onSelectToken: ({ token }: { token: PToken }) => void;
  onSelectNetwork: ({ network }: { network: ITokenNetwork }) => void;
}

const enhanceSelect = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    const dispatch = useAppDispatch();
    const handleSelectToken = ({ token }: { token: PToken }) => {
      dispatch(actionChangeSellToken({ token }));
    };

    const handleSelectNetwork = ({ network }: { network: ITokenNetwork }) => {
      dispatch(actionChangeBuyNetwork({ network }));
    };

    return (
      <WrappedComponent {...{ ...props, onSelectToken: handleSelectToken, onSelectNetwork: handleSelectNetwork }} />
    );
  };
  FormDepositComp.displayName = 'FormUnshield.enhanceSelect';
  return FormDepositComp;
};

export default enhanceSelect;
