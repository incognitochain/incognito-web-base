import { SupportedChainId } from 'constants/chains';
import { MAIN_NETWORK_NAME } from 'constants/token';
import PToken from 'models/model/pTokenModel';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import enhanceChangeField, { TInner as TInnerChangeField } from 'pages/Swap/Swap.enhanceChangeField';
import React from 'react';
import { compose } from 'redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { useAppSelector } from 'state/hooks';
import { groupNetworkSelectors } from 'state/token';

import enhanceAddressValidation, { TInner as TInnerAddress } from './FormDeposit.enhanceAddressValidator';
import enhanceAmountValidator, { TInner as TInnerAmount } from './FormDeposit.enhanceAmountValidator';
import enhanceInit from './FormDeposit.enhanceInit';
import enhanceSelect, { TInter as TInnerSelect } from './FormDeposit.enhanceSelect';
import { TInter as TInnerSend } from './FormDeposit.enhanceSend';
import enhanceDeposit from './FormDeposit.enhanceSend';
import { IDeposit } from './FormDeposit.hook';

export interface IMergeProps
  extends InjectedFormProps<any, any>,
    IDeposit,
    TInnerChangeField,
    TInnerAddress,
    TInnerAmount,
    TInnerSelect,
    TInnerSend {}

const enhance = (WrappedComponent: any) => {
  const FormDepositComp = (props: IMergeProps & any) => {
    const { account, chainID, onSelectToken } = props;
    const refUpdate = React.useRef(false);
    const network = useAppSelector(groupNetworkSelectors);
    // handle update default token

    const updateToken = () => {
      let tokens: PToken[] = [];
      switch (chainID) {
        case SupportedChainId.MAINNET:
        case SupportedChainId.KOVAN:
          tokens = network[MAIN_NETWORK_NAME.ETHEREUM];
          break;
        case SupportedChainId.BSC:
        case SupportedChainId.BSC_TESTNET:
          tokens = network[MAIN_NETWORK_NAME.BSC];
          break;
        case SupportedChainId.FTM:
        case SupportedChainId.FTM_TESTNET:
          tokens = network[MAIN_NETWORK_NAME.FANTOM];
          break;
        case SupportedChainId.POLYGON:
        case SupportedChainId.POLYGON_MUMBAI:
          tokens = network[MAIN_NETWORK_NAME.POLYGON];
          break;
        case SupportedChainId.AVAX:
        case SupportedChainId.AVAX_TESTNET:
          tokens = network[MAIN_NETWORK_NAME.AVALANCHE];
          break;
        case SupportedChainId.AURORA:
        case SupportedChainId.AURORA_TESTNET:
          tokens = network[MAIN_NETWORK_NAME.AURORA];
          break;
        case SupportedChainId.NEAR:
        case SupportedChainId.NEAR_TESTNET:
          tokens = network[MAIN_NETWORK_NAME.NEAR];
          break;
      }
      if (tokens && tokens.length > 0) {
        onSelectToken({ token: tokens[0] });
        refUpdate.current = true;
      }
    };

    React.useEffect(() => {
      if ((refUpdate && refUpdate.current) || !account) return;
      updateToken();
    }, [refUpdate, account, chainID]);

    return <WrappedComponent {...{ ...props }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhance';
  return FormDepositComp;
};

export default compose(
  reduxForm({
    form: FORM_CONFIGS.formName,
  }),
  enhanceInit,
  enhanceChangeField,
  enhanceAmountValidator,
  enhanceAddressValidation,
  enhanceSelect,
  enhanceDeposit,
  enhance
) as any;
