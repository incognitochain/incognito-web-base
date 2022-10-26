import { MAIN_NETWORK_NAME } from 'constants/token';
import { isAddress as isEtherAddress } from 'ethers/lib/utils';
import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { useAppDispatch } from 'state/hooks';

import {
  actionChangeBuyNetwork,
  actionChangeBuyToken,
  actionChangeSellNetwork,
  actionChangeSellToken,
  actionGetVaults,
  actionRotateSwapTokens,
  actionSetExchangeSelected,
  actionSetSwapExchangeSupports,
  actionSetSwapNetwork,
} from './FormUnshield.actions';
import { FormTypes } from './FormUnshield.types';
const { isPaymentAddress } = require('incognito-chain-web-js/build/web/wallet');

export interface TInter {
  // Sell token
  onSelectSellToken: ({ token }: { token: PToken }) => void;
  onSelectSellNetwork: ({ network }: { network: ITokenNetwork }) => void;

  // Buy token
  onSelectBuyToken: ({ token }: { token: PToken }) => void;
  onSelectBuyNetwork: ({ network }: { network: ITokenNetwork }) => void;
  onRotateSwapToken: () => void;
}

const enhanceSelect = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    const { sellToken, buyToken, formType, buyNetworkName, incAddress, onChangeField, unshieldAddress, inputAddress } =
      props;
    const dispatch = useAppDispatch();
    const refCountChangeField = React.useRef<any>(null);
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
      dispatch(actionChangeBuyToken({ token }));
      dispatch(actionSetExchangeSelected(null));
      dispatch(actionSetSwapExchangeSupports([]));
      dispatch(actionSetSwapNetwork(buyNetworkName));
    };

    const handleSelectBuyNetwork = ({ network }: { network: ITokenNetwork }) => {
      dispatch(actionChangeBuyNetwork({ network }));
    };

    const handleRotateSwapToken = () => dispatch(actionRotateSwapTokens());

    React.useEffect(() => {
      if (!refCountChangeField.current) {
        refCountChangeField.current = true;
        return;
      }
      if (buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO) {
        onChangeField(incAddress, FORM_CONFIGS.toAddress);
      } else {
        if (sellToken.isBTC || sellToken.isCentralized) {
          if (unshieldAddress && (isEtherAddress(unshieldAddress) || isPaymentAddress(unshieldAddress))) {
            onChangeField('', FORM_CONFIGS.toAddress);
          }
        }
      }
    }, [buyNetworkName, sellToken.identify, refCountChangeField.current]);

    return (
      <WrappedComponent
        {...{
          ...props,
          onSelectSellToken: handleSelectSellToken,
          onSelectSellNetwork: handleSelectSellNetwork,
          onSelectBuyToken: handleSelectBuyToken,
          onSelectBuyNetwork: handleSelectBuyNetwork,
          onRotateSwapToken: handleRotateSwapToken,
        }}
      />
    );
  };
  FormDepositComp.displayName = 'FormUnshield.enhanceSelect';
  return FormDepositComp;
};

export default enhanceSelect;
