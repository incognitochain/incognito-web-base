import { isMainnet } from 'config';
import * as R from 'ramda';

const { ACCOUNT_CONSTANT } = require('incognito-chain-web-js/build/wallet');

export const NETWORK_FEE = ACCOUNT_CONSTANT.MAX_FEE_PER_TX;
export const MINIMUM_PRV_REQUIRE_TO_BURN = 10000000000;

export const INC_CONTRACT_ADDRESS = isMainnet
  ? '0x01f6549BeF494C8b0B00C2790577AcC1A3Fa0Bd0'
  : '0x01f6549BeF494C8b0B00C2790577AcC1A3Fa0Bd0';

export const removeBold = (text: string | null): string | null => (text ? text.replace(/\*\*/g, '') : text);
export const removeItalics = (text: string | null): string | null => (text ? text.replace(/__/g, '') : text);

export const removeMarkdownStyle = R.compose(removeBold, removeItalics);

export const getMinimumPRVBalanceRequire = (_currentPRVBalance: number, fee: number) => {
  const minPRVBalanceRequire = MINIMUM_PRV_REQUIRE_TO_BURN + fee + NETWORK_FEE;
  return minPRVBalanceRequire;
};
