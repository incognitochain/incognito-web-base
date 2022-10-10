import { MAIN_NETWORK_NAME } from 'constants/token';
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
  actionSetSwapNetwork,
} from './FormUnshield.actions';
import { FormTypes } from './FormUnshield.types';
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
    const { sellToken, buyToken, formType, buyNetworkName, incAddress, web3Account } = props;
    const dispatch = useAppDispatch();
    const handleSelectSellToken = async ({ token }: { token: PToken }) => {
      dispatch(actionGetVaults());
      dispatch(actionChangeSellToken({ token }));

      if (formType === FormTypes.SWAP) {
        dispatch(actionSetExchangeSelected(null));
        dispatch(actionSetSwapExchangeSupports([]));
        dispatch(actionSetSwapNetwork(MAIN_NETWORK_NAME.INCOGNITO));
      }
    };

    const handleSelectSellNetwork = ({ network }: { network: ITokenNetwork }) => {
      dispatch(actionChangeSellNetwork({ network }));
    };

    const handleSelectBuyToken = ({ token }: { token: PToken }) => {
      // if (sellToken.identify === buyToken.identify) {
      //   return;
      // }
      dispatch(actionChangeBuyToken({ token }));
      dispatch(actionSetExchangeSelected(null));
      dispatch(actionSetSwapExchangeSupports([]));
      dispatch(actionSetSwapNetwork(buyNetworkName));
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
