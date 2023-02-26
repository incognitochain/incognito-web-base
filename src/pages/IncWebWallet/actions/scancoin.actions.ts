import { defaultAccountOTAKeySelector } from 'state/account/account.selectors';
import { defaultAccountPaymentAddressSelector } from 'state/account/account.selectors';
import { incognitoWalletSetAccount } from 'state/incognitoWallet';
import { AppGetState, AppThunkDispatch } from 'state/index';

import { walletRequestAccounts } from './wallet.actions';

const MOCKUP_DATA_BALANCE = [
  {
    amount: '0',
    id: '3ee31eba6376fc16cadb52c8765f20b6ebff92c0b1c5ab5fc78c8c25703bb19e',
    swipable: true,
  },
  {
    amount: '0',
    id: '076a4423fa20922526bd50b0d7b0dc1c593ce16e15ba141ede5fb5a28aa3f229',
    swipable: true,
  },
  {
    amount: '0',
    id: '545ef6e26d4d428b16117523935b6be85ec0a63e8c2afeb0162315eb0ce3d151',
    swipable: true,
  },
  {
    amount: '0',
    id: '0d953a47a7a488cee562e64c80c25d3dbe29d3b477ccd2b54408c0553a93f126',
    swipable: true,
  },
  {
    amount: '0',
    id: '26df4d1bca9fd1a8871a24b9b84fc97f3dd62ca8809975c6d971d1b79d1d9f31',
    swipable: true,
  },
  {
    amount: '0',
    id: 'b832e5d3b1f01a4f0623f7fe91d6673461e1f5d37d91fe78c5c2e6183ff39696',
    swipable: true,
  },
  {
    amount: '0',
    id: 'e5032c083f0da67ca141331b6005e4a3740c50218f151a5e829e9d03227e33e2',
    swipable: true,
  },
  {
    amount: '0',
    id: 'c01e7dc1d1aba995c19b257412340b057f8ad1482ccb6a9bb0adce61afbf05d4',
    swipable: true,
  },
  {
    amount: '0',
    id: '0000000000000000000000000000000000000000000000000000000000000004',
    swipable: false,
  },
];
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
    balances: MOCKUP_DATA_BALANCE,
    paymentAddress,
  };
};
