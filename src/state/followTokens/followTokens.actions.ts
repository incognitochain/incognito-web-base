import PTokenModel from 'models/model/pTokenModel';

import { FollowTokenActionType, SelectedPrivacy, SetPTokenListAction } from './followTokens.types';

const setFollowToken = (followTokenList: SelectedPrivacy[]) => ({
  type: FollowTokenActionType.SET,
  payload: {
    followTokenList,
  },
});

const setPToken = (pTokens: PTokenModel[]): SetPTokenListAction => ({
  type: FollowTokenActionType.SET_PTOKEN,
  payload: {
    pTokens,
  },
});

export { setFollowToken, setPToken };
