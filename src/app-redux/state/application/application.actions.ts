import {
  AddPopupPayload,
  ApplicationActions,
  ApplicationActionType,
  RemovePopupPayload,
  SetOpenModalPayload,
  UpdateChainIdPayload,
} from '@src/app-redux/state/application';

const actionUpdateChainID = (payload: UpdateChainIdPayload): ApplicationActions => ({
  type: ApplicationActionType.UPDATE_CHAIN_ID,
  payload,
});

const actionAddPopup = (payload: AddPopupPayload): ApplicationActions => ({
  type: ApplicationActionType.ADD_POPUP,
  payload,
});

const actionSetOpenModal = (payload: SetOpenModalPayload): ApplicationActions => ({
  type: ApplicationActionType.SET_OPEN_MODAL,
  payload,
});

const actionRemovePopup = (payload: RemovePopupPayload): ApplicationActions => ({
  type: ApplicationActionType.REMOVE_POPUP,
  payload,
});

export { actionAddPopup, actionRemovePopup, actionSetOpenModal, actionUpdateChainID };
