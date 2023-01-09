import { rpcPBlur } from 'services';
import { AppDispatch, AppState } from 'state';

import { ICollection } from './Blur.interface';
import { BlurActionType, SetCollectionsAction } from './Blur.types';

const actionSetCollections = (payload: ICollection[]): SetCollectionsAction => ({
  type: BlurActionType.SET_COLLECTIONS,
  payload,
});

const actionFetchCollections = () => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    const collections = await rpcPBlur.getCollections();
    dispatch(actionSetCollections(collections));
    console.log('LOGS actionFetchCollections ', collections);
  } catch (error) {
    console.log('ACTION FETCH COLLECTIONS ERROR: ', error);
  }
};

export { actionFetchCollections, actionSetCollections };
