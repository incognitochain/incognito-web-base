import { isMainnet } from 'config';
import * as R from 'ramda';

const { ACCOUNT_CONSTANT } = require('incognito-chain-web-js/build/wallet');

export const NETWORK_FEE = ACCOUNT_CONSTANT.MAX_FEE_PER_TX;

export const MINIMUM_PRV_HUMAN_AMOUNT_REQUIRE = isMainnet ? 100 : 10;
export const MINIMUM_PRV_REQUIRE_TO_BURN = MINIMUM_PRV_HUMAN_AMOUNT_REQUIRE * 1e9;

export const INC_CONTRACT_ADDRESS = isMainnet
  ? '0x6D82713dE1FBB2bAa0d9d2A81Fca1244b87808eC'
  : '0x01f6549BeF494C8b0B00C2790577AcC1A3Fa0Bd0';

export const removeBold = (text: string | null): string | null => (text ? text.replace(/\*\*/g, '') : text);
export const removeItalics = (text: string | null): string | null => (text ? text.replace(/__/g, '') : text);

export const removeMarkdownStyle = R.compose(removeBold, removeItalics);

export const getMinimumPRVBalanceRequire = (_currentPRVBalance: number, fee: number) => {
  const minPRVBalanceRequire = MINIMUM_PRV_REQUIRE_TO_BURN + fee + 2 * NETWORK_FEE;
  return minPRVBalanceRequire;
};
