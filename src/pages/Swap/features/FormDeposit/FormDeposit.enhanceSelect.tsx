import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import React from 'react';

import { useAppDispatch } from '../../../../state/hooks';
import { actionFilterSetToken } from './FormDeposit.actions';

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

    return <WrappedComponent {...{ ...props, onSelectToken: handleSelectToken }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhanceSelect';
  return FormDepositComp;
};

export default enhanceSelect;
