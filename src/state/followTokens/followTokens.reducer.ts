import PTokenModel from 'models/model/pTokenModel';
import { Reducer } from 'redux';

import { FollowTokenActions, FollowTokenActionType, SelectedPrivacy } from './followTokens.types';

export interface FollowTokenState {
  followTokens?: SelectedPrivacy[];
  pTokens: PTokenModel[];
}

const initialState: FollowTokenState = {
  followTokens: [],
  pTokens: [],
};

export const reducer: Reducer<FollowTokenState, FollowTokenActions> = (
  state = initialState,
  action: FollowTokenActions
): FollowTokenState => {
  switch (action.type) {
    case FollowTokenActionType.SET: {
      return { ...state, followTokens: action.payload.followTokenList };
    }
    case FollowTokenActionType.SET_PTOKEN: {
      return { ...state, pTokens: action.payload.pTokens };
    }
    default:
      return state;
  }
};
