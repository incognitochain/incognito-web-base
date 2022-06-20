import {
  UpdateWalletErrorPayload,
  WalletActions,
  WalletActionType,
} from '@src/app-redux/state/wallet/index';

const actionUpdateWalletError = (payload: UpdateWalletErrorPayload): WalletActions => ({
  type: WalletActionType.UPDATE_WALLET_ERROR,
  payload,
});

export { actionUpdateWalletError };
