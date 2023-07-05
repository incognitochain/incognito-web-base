import { combineReducers } from 'redux';
import { reducer as account } from 'state/account/account.reducer';
import { reducer as followTokensReducer } from 'state/followTokens/followTokens.reducer';
import { reducer as masterKey } from 'state/masterKey/masterKey.reducer';
import { reducer as networkReducer } from 'state/network/network.reducer';
import { reducer as scanCoinsReducer } from 'state/scanCoins/scanCoins.reducer';
import { reducer as webToken } from 'state/webToken/webToken.reducer';
import { reducer as webWallet } from 'state/webWallet/webWallet.reducer';

const webWalletReducer = combineReducers({
  webWallet,
  account,
  masterKey,
  webToken,
  scanCoinsReducer,
  networkReducer,
  followTokensReducer,
});

export default webWalletReducer;
