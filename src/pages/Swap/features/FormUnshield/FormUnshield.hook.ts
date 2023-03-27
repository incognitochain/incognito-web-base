import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { MAIN_NETWORK_NAME } from 'constants/token';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { WalletState } from 'pages/IncWebWallet/core/types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from 'state/hooks';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import { webWalletStateSelector } from 'state/masterKey';

import useWalletController from '../../../IncWebWallet/hooks/useWalletController';
import { unshieldDataSelector } from './FormUnshield.selectors';
import { FormTypes, ISwapExchangeData, SwapExchange } from './FormUnshield.types';
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
  enoughNetworkFee: boolean;
  burnFeeText: string;

  estReceiveAmount: string | number;
  expectedReceiveAmount: string | number;

  enoughPRVFee: boolean;
  formType: FormTypes;

  // Swap data
  exchangeSelected: SwapExchange | null;
  exchangeSelectedData: ISwapExchangeData;
  exchangeSupports: any[];
  swapFee: any;
  tradePath: string;
  errorMsg: string | null;
  swapNetwork: MAIN_NETWORK_NAME | null;
  isUseTokenFee?: boolean;
  slippage: string;
  rate: string;

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
    enoughNetworkFee,
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
  const webWalletState = useSelector(webWalletStateSelector);
  const incAccount = useAppSelector(incognitoWalletAccountSelector);
  const { isIncognitoInstalled } = useIncognitoWallet();
  const walletController = useWalletController();
  const button = useMemo(() => {
    let text = '';

    if (walletController.isWalletExtension) {
      if (!isIncognitoInstalled()) {
        text = 'Install Wallet';
      } else if (!incAccount) {
        text = 'Connect Wallet';
      } else {
        text = 'Swap';
      }
    } else if (walletController.isWalletWeb) {
      if (webWalletState === WalletState.uninitialized) {
        text = 'Install Wallet';
      } else if (!incAccount || webWalletState === WalletState.locked) {
        text = 'Unlock Wallet';
      } else {
        text = 'Swap';
      }
    } else {
      text = 'Install Wallet';
    }

    return {
      // text: isIncognitoInstalled() ? (!incAccount ? 'Connect Wallet' : 'Swap') : 'Install Wallet 12345',
      text,
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
    enoughNetworkFee,
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

    minUnshield,
    minUnshieldText,
  };
};
