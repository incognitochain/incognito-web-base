import { SupportedChainId } from '@constants/chains';
import { ApplicationActionType } from '@src/app-redux/state/application/application.constants';
import { Action } from 'redux';

export type PopupContent =
  | { txn: { hash: string } }
  | { failedSwitchNetwork: SupportedChainId };

export enum ApplicationModal {
  WALLET,
}

type PopupList = Array<{
  key: string;
  show: boolean;
  content: PopupContent;
  removeAfterMs: number | null;
}>;

export interface IApplicationReducer {
  chainId: number | null;
  openModal: ApplicationModal | null;
  popupList: PopupList;
}

//----------------------------------------------
// Payload Definition here!
//----------------------------------------------
export interface UpdateChainIdPayload {
  chainId: number;
}

export interface SetOpenModalPayload {
  openModal: ApplicationModal | null;
}

export interface AddPopupPayload {
  content: PopupContent;
  key: string;
  removeAfterMs: number | null;
}

export interface RemovePopupPayload {
  key: string;
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------
export interface UpdateChainIDAction extends Action {
  type: ApplicationActionType.UPDATE_CHAIN_ID;
  payload: UpdateChainIdPayload;
}

export interface SetOpenModalAction extends Action {
  type: ApplicationActionType.SET_OPEN_MODAL;
  payload: SetOpenModalPayload;
}

export interface AddPopupAction extends Action {
  type: ApplicationActionType.ADD_POPUP;
  payload: AddPopupPayload;
}

export interface RemovePopupAction extends Action {
  type: ApplicationActionType.REMOVE_POPUP;
  payload: RemovePopupPayload;
}

//-----------------------------------
export type ApplicationActions =
  | UpdateChainIDAction
  | SetOpenModalAction
  | AddPopupAction
  | RemovePopupAction;
