import { MAIN_NETWORK_NAME } from 'constants/token';
import { ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { useAppSelector } from 'state/hooks';

import { unshieldDataSelector } from './FormUnshield.selectors';

export interface IUnshield {
  unshieldAddress: string;

  sellToken: SelectedPrivacy;
  sellTokenList: SelectedPrivacy[];

  buyToken: SelectedPrivacy;
  buyNetworkList: ITokenNetwork[] | undefined;
  buyCurrency: number;
  buyNetworkName: MAIN_NETWORK_NAME;
}

export const useUnshield = (): IUnshield => {
  const { unshieldAddress, sellToken, sellTokenList, buyToken, buyNetworkList, buyCurrency, buyNetworkName } =
    useAppSelector(unshieldDataSelector);
  return {
    sellToken,
    unshieldAddress,
    sellTokenList,

    buyToken,
    buyNetworkList,
    buyCurrency,
    buyNetworkName,
  };
};
