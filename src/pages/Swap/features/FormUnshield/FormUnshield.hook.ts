import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { MAIN_NETWORK_NAME } from 'constants/token';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { useMemo } from 'react';
import { useAppSelector } from 'state/hooks';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';

import { unshieldDataSelector } from './FormUnshield.selectors';
import { FormTypes, SwapExchange } from './FormUnshield.types';
import { IFee } from './FormUnshield.utils';

export interface IUnshield {
  sellToken: SelectedPrivacy;
  sellTokenList: SelectedPrivacy[];
  sellCurrency: number;
  buyParentToken: any;
  sellNetworkName: string;
  buyToken: SelectedPrivacy;
  buyTokenList: SelectedPrivacy[];
  buyNetworkList: ITokenNetwork[] | undefined;
  buyCurrency: number;
  buyNetworkName: MAIN_NETWORK_NAME;

  unshieldAddress: string;
  isExternalAddress: boolean;
  web3Account?: string;

  inputAmount: string;
  inputOriginalAmount: number;
  burnOriginalAmount: string;

  userBalanceNoClip?: string;
  userBalance?: string;
  userBalanceFormatedText: string;
  userBuyBalanceFormatedText: string;
  maxAmountText: string;
  minAmountText: string;

  incAddress: string;

  isFetching: boolean;
  disabledForm: boolean;
  fee: IFee;

  inputAddress: string;

  button: {
    text: string;
    isConnected: boolean;
  };
  networkFeeText: string;
  burnFeeText: string;

  estReceiveAmount: string | number;
  expectedReceiveAmount: string | number;

  enoughPRVFee: boolean;
  formType: FormTypes;

  // Swap data
  exchangeSelected: SwapExchange | null;
  exchangeSelectedData: any;
  exchangeSupports: any[];
  swapFee: any;
  tradePath: string;
  errorMsg: string | null;
  swapNetwork: MAIN_NETWORK_NAME | null;
  isUseTokenFee?: boolean;
  slippage: string;
  rate: string;

  isIncognitoInstalled: boolean;

  minUnshield: number;
  minUnshieldText: string;
}

export const useUnshield = (): IUnshield => {
  const {
    unshieldAddress,
    sellToken,
    sellTokenList,
    sellNetworkName,
    sellCurrency,
    buyParentToken,
    buyToken,
    buyTokenList,
    buyNetworkList,
    buyCurrency,
    buyNetworkName,
    isExternalAddress,

    inputAmount,
    inputOriginalAmount,
    burnOriginalAmount,

    userBalanceNoClip,
    userBalance,
    userBalanceFormatedText,
    userBuyBalanceFormatedText,

    minAmountText,
    maxAmountText,

    incAddress,
    disabledForm,
    fee,
    inputAddress,
    isFetching,
    networkFeeText,
    burnFeeText,
    estReceiveAmount,
    expectedReceiveAmount,
    enoughPRVFee,
    formType,

    // Swap data
    exchangeSelected,
    exchangeSelectedData,
    exchangeSupports,
    swapFee,
    isUseTokenFee,
    tradePath,
    errorMsg,
    swapNetwork,
    slippage,
    rate,
    minUnshield,
    minUnshieldText,
  } = useAppSelector(unshieldDataSelector);

  const { account: web3Account } = useActiveWeb3React();
  const incAccount = useAppSelector(incognitoWalletAccountSelector);
  const { isIncognitoInstalled } = useIncognitoWallet();

  const button = useMemo(() => {
    return {
      text: isIncognitoInstalled() ? (!incAccount ? 'Connect Wallet' : 'Swap') : 'Install Wallet',
      isConnected: !!incAccount,
    };
  }, [isFetching, incAccount, isIncognitoInstalled]);

  return {
    sellToken,
    sellTokenList,
    sellCurrency,
    sellNetworkName,
    buyParentToken,
    buyToken,
    buyTokenList,
    buyNetworkList,
    buyCurrency,
    buyNetworkName,

    unshieldAddress,
    web3Account,
    isExternalAddress,

    incAddress,

    inputAmount,
    burnOriginalAmount,

    userBalanceNoClip,
    userBalance,
    userBalanceFormatedText,
    userBuyBalanceFormatedText,
    minAmountText,
    maxAmountText,

    disabledForm,
    fee,

    inputAddress,

    button,
    networkFeeText,
    burnFeeText,

    estReceiveAmount,
    expectedReceiveAmount,

    inputOriginalAmount,
    enoughPRVFee,
    formType,

    // Swap data
    exchangeSelected,
    exchangeSelectedData,
    exchangeSupports,
    swapFee,
    tradePath,
    isUseTokenFee,
    errorMsg,
    swapNetwork,
    isFetching,

    slippage,
    rate,

    isIncognitoInstalled: isIncognitoInstalled(),
    minUnshield,
    minUnshieldText,
  };
};
