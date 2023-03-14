import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { Reducer } from 'redux';

import { FollowTokenSelectedAction, FollowTokenSelectedType } from './followTokenSelected.types';

export interface State {
  tokenID?: string;
  token?: SelectedPrivacy;
}

const initialState: State = {
  tokenID: '',
  token: undefined,
};

export const reducer: Reducer<State, FollowTokenSelectedAction> = (
  state = initialState,
  action: FollowTokenSelectedAction
): State => {
  switch (action.type) {
    case FollowTokenSelectedType.SET_TOKEN: {
      return { ...state, token: action.payload.token, tokenID: action.payload.token?.tokenID };
    }
    case FollowTokenSelectedType.SET_TOKEN_ID: {
      return { ...state, tokenID: action.payload.tokenID };
    }
    default:
      return state;
  }
};
