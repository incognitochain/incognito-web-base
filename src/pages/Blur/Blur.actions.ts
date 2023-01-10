import { rpcPBlur } from 'services';
import { AppDispatch, AppState } from 'state';

import { ICollection, IResToken, IToken } from './Blur.interface';
import {
  BlurActionType,
  SetCollectionsAction,
  SetMoreLoadingTokensAction,
  SetMoreTokensAction,
  SetResTokenAction,
} from './Blur.types';

export const LOADING_COUNT = 100;

const actionSetCollections = (payload: ICollection[]): SetCollectionsAction => ({
  type: BlurActionType.SET_COLLECTIONS,
  payload,
});

const actionSetBlurRespToken = (payload: IResToken): SetResTokenAction => ({
  type: BlurActionType.SET_RES_TOKEN,
  payload,
});

const actionSetMoreTokens = (payload: IToken[]): SetMoreTokensAction => ({
  type: BlurActionType.SET_MORE_TOKENS,
  payload,
});

const actionSetMoreLoadingTokens = (payload: IToken[]): SetMoreLoadingTokensAction => ({
  type: BlurActionType.SET_MORE_LOADING_TOKENS,
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

const actionFetchCollectionTokens =
  (collectionName: string) => async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      dispatch(
        actionSetMoreLoadingTokens([...new Array(LOADING_COUNT)].map(() => ({ isLoading: true } as unknown as IToken)))
      );
      const res = await rpcPBlur.getCollectionTokens(collectionName);
      dispatch(actionSetBlurRespToken(res));
    } catch (error) {
      console.log('ACTION FETCH COLLECTION TOKENS ERROR: ', error);
    }
  };

const actionFetchMoreCollectionTokens =
  (collectionName: string, lastToken: IToken) => async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      dispatch(
        actionSetMoreLoadingTokens([...new Array(LOADING_COUNT)].map(() => ({ isLoading: true } as unknown as IToken)))
      );
      const cursor = {
        price: { unit: lastToken.price.unit, time: lastToken.price.listAt, amount: lastToken.price.amount },
        tokenId: lastToken.tokenId,
      };
      const res = await rpcPBlur.getCollectionTokens(collectionName, cursor);
      dispatch(actionSetMoreTokens(res.tokens));
    } catch (error) {
      console.log('ACTION FETCH MORE TOKENS ERROR: ', error);
    }
  };

export { actionFetchCollections, actionFetchCollectionTokens, actionFetchMoreCollectionTokens, actionSetCollections };
