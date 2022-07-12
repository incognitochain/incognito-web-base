import { MAIN_NETWORK_NAME } from 'constants/token';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { useMemo } from 'react';
import { useAppSelector } from 'state/hooks';

import { unshieldDataSelector } from './FormUnshield.selectors';

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

  amount: {
    maxAmountNoClip?: string;
    maxAmountText?: string;
    maxAmountFormatedText: string;
  };
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

    maxAmountNoClip,
    maxAmountText,
    maxAmountFormatedText,
  } = useAppSelector(unshieldDataSelector);

  const { account: web3Account } = useActiveWeb3React();

  const amount = useMemo(() => {
    return {
      maxAmountNoClip,
      maxAmountText,
      maxAmountFormatedText,
    };
  }, [maxAmountNoClip, maxAmountText, maxAmountFormatedText]);

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

    amount,
  };
};
