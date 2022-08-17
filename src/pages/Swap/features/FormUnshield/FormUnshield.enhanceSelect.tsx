import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import React from 'react';
import { useAppDispatch } from 'state/hooks';

import {
  actionChangeBuyNetwork,
  actionChangeBuyToken,
  actionChangeSellNetwork,
  actionChangeSellToken,
  actionGetVaults,
  actionSetExchangeSelected,
  actionSetSwapExchangeSupports,
} from './FormUnshield.actions';

export interface TInter {
  // Sell token
  onSelectSellToken: ({ token }: { token: PToken }) => void;
  onSelectSellNetwork: ({ network }: { network: ITokenNetwork }) => void;

  // Buy token
  onSelectBuyToken: ({ token }: { token: PToken }) => void;
  onSelectBuyNetwork: ({ network }: { network: ITokenNetwork }) => void;
}

const enhanceSelect = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    const { sellToken, buyToken } = props;
    const dispatch = useAppDispatch();
    const handleSelectSellToken = async ({ token }: { token: PToken }) => {
      dispatch(actionGetVaults());
      dispatch(actionChangeSellToken({ token }));
      dispatch(actionSetExchangeSelected(null));
      dispatch(actionSetSwapExchangeSupports([]));
    };

    const handleSelectSellNetwork = ({ network }: { network: ITokenNetwork }) => {
      dispatch(actionChangeSellNetwork({ network }));
    };

    const handleSelectBuyToken = ({ token }: { token: PToken }) => {
      if (sellToken.identify === buyToken.identify) {
        return;
      }
      dispatch(actionChangeBuyToken({ token }));
      dispatch(actionGetVaults());
      dispatch(actionSetExchangeSelected(null));
      dispatch(actionSetSwapExchangeSupports([]));
    };

    const handleSelectBuyNetwork = ({ network }: { network: ITokenNetwork }) => {
      dispatch(actionChangeBuyNetwork({ network }));
    };

    return (
      <WrappedComponent
        {...{
          ...props,
          onSelectSellToken: handleSelectSellToken,
          onSelectSellNetwork: handleSelectSellNetwork,
          onSelectBuyToken: handleSelectBuyToken,
          onSelectBuyNetwork: handleSelectBuyNetwork,
        }}
      />
    );
  };
  FormDepositComp.displayName = 'FormUnshield.enhanceSelect';
  return FormDepositComp;
};

export default enhanceSelect;
