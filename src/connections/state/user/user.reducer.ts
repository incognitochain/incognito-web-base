import { Wallet } from '@connections/connectors';
import { createSlice } from '@reduxjs/toolkit';
const currentTimestamp = () => new Date().getTime();

export interface IUserReducer {
  // We want the user to be able to define which wallet they want to use, even if there are multiple connected wallets via web3-react.
  // If a user had previously connected a wallet but didn't have a wallet override set (because they connected prior to this field being added),
  // we want to handle that case by backfilling them manually. Once we backfill, we set the backfilled field to `true`.
  // After some period of time, our active users will have this property set so we can likely remove the backfilling logic.
  selectedWalletBackfilled: boolean;
  selectedWallet?: Wallet;
}

export const initialState: IUserReducer = {
  selectedWallet: undefined,
  selectedWalletBackfilled: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateSelectedWallet(state, { payload: { wallet } }) {
      state.selectedWallet = wallet;
      state.selectedWalletBackfilled = true;
    },
  },
});

export const { updateSelectedWallet } = userSlice.actions;
export default userSlice.reducer;
