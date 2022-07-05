import PToken from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { AppState } from 'state';
import { groupNetworkSelectors } from 'state/token';

import { IFormDepositReducer } from './FormDeposit.types';

export interface IDepositData {
  selectableSellTokens: PToken[];
  selectedSellToken: SelectedPrivacy;
  selectedNetworkName: string;
}

const getDepositData = ({
  deposit,
  getDataByTokenID,
  getDepositTokenData,
  state,
}: {
  deposit: IFormDepositReducer;
  getDataByTokenID: (tokenID: string) => SelectedPrivacy;
  getDepositTokenData: (tokenID: string) => SelectedPrivacy | null;
  state: AppState;
}): IDepositData => {
  const { sellToken, buyToken } = deposit;
  const { networkName: sellNetworkName, tokenID: sellTokenID } = sellToken;
  const groupNetwork = groupNetworkSelectors(state);

  // Sell tokens
  const selectableSellTokens = groupNetwork[sellNetworkName];
  const selectedSellToken = getDataByTokenID(sellToken.tokenID);
  const sellParentToken = getDataByTokenID(selectedSellToken.parentTokenID);
  return {
    selectableSellTokens,
    selectedSellToken,
    selectedNetworkName: sellNetworkName,
  };
};

export { getDepositData };
