import {
  UpdateWalletErrorPayload,
  WalletActions,
  WalletActionType,
} from '@connections/state/wallet';

const actionUpdateWalletError = (payload: UpdateWalletErrorPayload): WalletActions => ({
  type: WalletActionType.UPDATE_WALLET_ERROR,
  payload,
});

export { actionUpdateWalletError };
