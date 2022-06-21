import { nanoid } from '@reduxjs/toolkit';
import {
  ApplicationActions,
  ApplicationActionType,
  IApplicationReducer,
} from '@src/app-redux/state/application';
import { DEFAULT_TXN_DISMISS_MS } from 'constants/misc';
import { Reducer } from 'redux';

const initialState: IApplicationReducer = {
  chainId: null,
  openModal: null,
  popupList: [],
};

export const reducer: Reducer<IApplicationReducer, ApplicationActions> = (
  state = initialState,
  action: ApplicationActions,
) => {
  switch (action.type) {
    case ApplicationActionType.UPDATE_CHAIN_ID: {
      const { chainId } = action.payload;
      return {
        ...state,
        chainId,
      };
    }
    case ApplicationActionType.SET_OPEN_MODAL: {
      return {
        ...state,
        openModal: action.payload,
      };
    }
    case ApplicationActionType.ADD_POPUP: {
      const { content, key, removeAfterMs = DEFAULT_TXN_DISMISS_MS } = action.payload;
      const popupList = (
        key ? state.popupList.filter((popup) => popup.key !== key) : state.popupList
      ).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ]);
      return {
        ...state,
        popupList,
      };
    }
    case ApplicationActionType.REMOVE_POPUP: {
      const { key } = action.payload;
      let popupList = state.popupList;
      popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false;
        }
      });
      return {
        ...state,
        popupList,
      };
    }
    default:
      return state;
  }
};

export default reducer;
