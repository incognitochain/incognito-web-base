import { rpcPBlur } from 'services';
import { AppDispatch, AppState } from 'state';

import { BlurActionType, SetCollectionsAction } from './Blur.types';

const actionSetCollections = (): SetCollectionsAction => ({
  type: BlurActionType.SET_COLLECTIONS,
});

const actionFetchCollections = () => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    // Handle Fetch collections here
    return rpcPBlur.getCollections();
  } catch (error) {
    console.log('ACTION FETCH COLLECTIONS ERROR: ', error);
  }
};

export { actionFetchCollections, actionSetCollections };
