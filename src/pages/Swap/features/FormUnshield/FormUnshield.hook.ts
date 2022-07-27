import { MAIN_NETWORK_NAME } from 'constants/token';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { useMemo } from 'react';
import { useAppSelector } from 'state/hooks';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';

import { unshieldDataSelector } from './FormUnshield.selectors';
import { IFee } from './FormUnshield.utils';

export interface IUnshield {
  sellToken: SelectedPrivacy;
  sellTokenList: SelectedPrivacy[];

  buyToken: SelectedPrivacy;
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
  maxAmountText: string;
  minAmountText: string;

  incAddress: string;

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
}

export const useUnshield = (): IUnshield => {
  const {
    unshieldAddress,
    sellToken,
    sellTokenList,
    buyToken,
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
  } = useAppSelector(unshieldDataSelector);

  const { account: web3Account } = useActiveWeb3React();
  const incAccount = useAppSelector(incognitoWalletAccountSelector);

  const button = useMemo(
    () => ({
      text: !incAccount ? 'Connect Wallet' : isFetching ? 'Estimating fee...' : 'Swap',
      isConnected: !!incAccount,
    }),
    [isFetching, incAccount]
  );

  return {
    sellToken,
    sellTokenList,

    buyToken,
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
    minAmountText,
    maxAmountText,

    disabledForm,
    fee,

    inputAddress,

    button,
    networkFeeText,
    burnFeeText,

    estReceiveAmount,
    inputOriginalAmount,
  };
};
