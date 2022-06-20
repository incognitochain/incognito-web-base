import {
  UpdateSelectedWalletPayload,
  UserActions,
  UserActionType,
} from '@src/app-redux/state/user/index';

const actionUpdateSelectedWallet = (
  payload: UpdateSelectedWalletPayload,
): UserActions => ({
  type: UserActionType.UPDATE_SELECTED_WALLET,
  payload,
});

export { actionUpdateSelectedWallet };
