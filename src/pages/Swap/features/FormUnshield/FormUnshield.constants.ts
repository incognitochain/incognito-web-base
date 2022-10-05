import { PRIVATE_TOKEN_CURRENCY_TYPE, PRV } from 'constants/token';
import { getTokenIdentify } from 'models/model/pTokenModel';

export const BLACKLIST_SELL_TOKEN_ID = [
  getTokenIdentify({ tokenID: PRV.id, currencyType: PRIVATE_TOKEN_CURRENCY_TYPE.ERC20 }),
  getTokenIdentify({ tokenID: PRV.id, currencyType: PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20 }),
];

export const BLACKLIST_PRV = [
  getTokenIdentify({ tokenID: PRV.id, currencyType: PRIVATE_TOKEN_CURRENCY_TYPE.PRV }),
  getTokenIdentify({ tokenID: PRV.id, currencyType: PRIVATE_TOKEN_CURRENCY_TYPE.ERC20 }),
  getTokenIdentify({ tokenID: PRV.id, currencyType: PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20 }),
];
