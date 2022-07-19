import { MAIN_NETWORK_NAME } from 'constants/token';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { useMemo } from 'react';
import { useAppSelector } from 'state/hooks';

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

  buttonText: string;
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

  const buttonText = useMemo(() => (isFetching ? 'Estimating fee...' : 'Swap'), [isFetching]);

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

    buttonText,
    networkFeeText,
    burnFeeText,

    estReceiveAmount,
  };
};
