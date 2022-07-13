import { MAIN_NETWORK_NAME } from 'constants/token';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
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
  inputOriginalAmount: string;

  userAmountNoClip?: string;
  userAmount?: string;
  userAmountFormatedText: string;
  maxAmountText: string;
  minAmountText: string;

  incAddress: string;

  disabledForm: boolean;
  fee: IFee;
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

    userAmountNoClip,
    userAmount,
    userAmountFormatedText,
    minAmountText,
    maxAmountText,

    incAddress,
    disabledForm,
    fee,
  } = useAppSelector(unshieldDataSelector);

  const { account: web3Account } = useActiveWeb3React();

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
    inputOriginalAmount,

    userAmountNoClip,
    userAmount,
    userAmountFormatedText,
    minAmountText,
    maxAmountText,

    disabledForm,
    fee,
  };
};
