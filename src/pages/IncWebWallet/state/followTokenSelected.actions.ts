import SelectedPrivacy from 'models/model/SelectedPrivacyModel';

import {
  FollowTokenSelectedType,
  SetFollowTokenSelectedByTokenAction,
  SetFollowTokenSelectedByTokenIDAction,
} from './followTokenSelected.types';

const setFollowTokenSelectedByTokenID = (tokenID: string): SetFollowTokenSelectedByTokenIDAction => ({
  type: FollowTokenSelectedType.SET_TOKEN_ID,
  payload: {
    tokenID,
  },
});

const setFollowTokenSelectedByToken = (token: SelectedPrivacy): SetFollowTokenSelectedByTokenAction => ({
  type: FollowTokenSelectedType.SET_TOKEN,
  payload: {
    token,
  },
});

export { setFollowTokenSelectedByToken, setFollowTokenSelectedByTokenID };
