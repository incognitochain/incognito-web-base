import { defaultAccountOTAKeySelector } from 'state/account/account.selectors';
import { defaultAccountPaymentAddressSelector } from 'state/account/account.selectors';
import { incognitoWalletSetAccount } from 'state/incognitoWallet';
import { AppGetState, AppThunkDispatch } from 'state/index';

import { walletRequestAccounts } from './wallet.actions';

export const getIncognitoAccounts = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    const { result }: any = await dispatch(walletRequestAccounts());
    if (result && result.accounts && result.accounts.length > 0) {
      dispatch(incognitoWalletSetAccount(result.accounts));
    }
  } catch (error) {}
};

// export const getDefaultFollowTokensBalance = async (): Promise<{
//   balance: IBalance[];
//   OTAKey: string;
// }> => {
//   const tokens = await getTokensDefault();
//   const { accountSender, keyDefine } = await getAccountInstanceAndKeyDefine();
//   if (!accountSender || !keyDefine) return { balance: [], OTAKey: '' };

//   // if scanning coin get default balances else get from FollowTokens
//   const coinsStore = await accountSender.getStorageCoinsScan();
//   const isFinishScan = coinsStore && coinsStore.finishScan;
//   if (!isFinishScan) {
//     return { balance: tokens.map((token) => ({ amount: '0', id: token, swipable: true })) as IBalance[], OTAKey: '' };
//   }

//   const { balance }: { balance: IBalance[] } = await accountSender.getFollowTokensBalance({
//     defaultTokens: tokens,
//     version: PrivacyVersion.ver3,
//   });
//   const _balance = uniqBy(balance, 'id');
//   return { balance: _balance, OTAKey: keyDefine };
// };

export const getBalanceFromDApp = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  const reduxState = getState();
  if (!reduxState) return;

  // get data from memory, improve performance
  const keyDefine = defaultAccountOTAKeySelector(getState());
  const paymentAddress = defaultAccountPaymentAddressSelector(getState());
  // const { balance: _balance } = await getDefaultFollowTokensBalance();

  return {
    keyDefine,
    // balances: _balance,
    balances: {},
    paymentAddress,
  };
};
