import { MAIN_NETWORK_NAME } from 'constants/token';
import { isAddress as isEtherAddress } from 'ethers/lib/utils';
import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import store from 'state';
import { useAppDispatch } from 'state/hooks';
import { getPrivacyDataByTokenIDSelector } from 'state/token';

import { useQuery } from '../../Swap.hooks';
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
  actionSetToken,
} from './FormUnshield.actions';
import { MAP_TOKEN_BY_PAPPS } from './FormUnshield.constants';
import { SwapExchange } from './FormUnshield.types';
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
    const { sellToken, buyNetworkName, incAddress, onChangeField, unshieldAddress } = props;
    const dispatch = useAppDispatch();
    const history = useHistory();
    const location: any = useLocation();
    const pAppName = useQuery();

    const refCountChangeField = React.useRef<any>(null);
    const handleSelectSellToken = async ({ token }: { token: PToken }) => {
      if (token.tokenID === sellToken.tokenID) return;
      dispatch(actionGetVaults());
      dispatch(actionChangeSellToken({ token }));
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

    const setTokensDefault = ({ tokenID1, tokenID2 }: { tokenID1: string; tokenID2: string }) => {
      const sellToken = getPrivacyDataByTokenIDSelector(store.getState())(tokenID1);
      const buyToken = getPrivacyDataByTokenIDSelector(store.getState())(tokenID2);
      if (!sellToken.symbol || !buyToken.symbol) return;
      const sell: ITokenNetwork = {
        parentIdentify: sellToken.parentTokenID,
        identify: sellToken.identify,
        chainID: sellToken.chainID,
        currency: sellToken.currencyType,
        networkName: sellToken.networkName || MAIN_NETWORK_NAME.INCOGNITO,
      };
      const buy: ITokenNetwork = {
        parentIdentify: buyToken.parentTokenID,
        identify: buyToken.identify,
        chainID: buyToken.chainID,
        currency: buyToken.currencyType,
        networkName: buyToken.networkName || MAIN_NETWORK_NAME.INCOGNITO,
      };
      dispatch(
        actionSetToken({
          sellToken: sell,
          buyToken: buy,
        })
      );
    };

    const redirect = () => {
      const exchangeSupported = Object.values(SwapExchange);
      const token = MAP_TOKEN_BY_PAPPS[pAppName];
      if (pAppName && exchangeSupported.includes(pAppName) && token) {
        return setTokensDefault({ tokenID1: token.tokenID1, tokenID2: token.tokenID2 });
      }
      history.replace('/swap', {});
    };

    React.useEffect(redirect, [pAppName]);

    React.useEffect(() => {
      const tokenID1 = location?.state?.tokenId1;
      const tokenID2 = location?.state?.tokenId2;
      if (tokenID1 && tokenID2) {
        return setTokensDefault({ tokenID1, tokenID2 });
      }
    }, [location?.state?.tokenId1, location?.state?.tokenId2]);

    React.useEffect(() => {
      if (!refCountChangeField.current) {
        refCountChangeField.current = true;
        return;
      }
      if (buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO) {
        if (!incAddress) return;
        onChangeField(incAddress, FORM_CONFIGS.toAddress);
      } else {
        if (sellToken.isBTC || sellToken.isCentralized) {
          if (unshieldAddress && (isEtherAddress(unshieldAddress) || isPaymentAddress(unshieldAddress))) {
            onChangeField('', FORM_CONFIGS.toAddress);
          }
        } else {
          if (isEtherAddress(unshieldAddress)) return;
          onChangeField('', FORM_CONFIGS.toAddress);
        }
      }
    }, [buyNetworkName, sellToken.identify, refCountChangeField.current, incAddress]);

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
