import { rpcPBlur } from 'services';
import { AppDispatch, AppState } from 'state';

import { ICollection, IToken } from './Blur.interface';
import {
  BlurActionType,
  SetCollectionsAction,
  SetFetchingCollections,
  SetMoreLoadingTokensAction,
  SetMoreTokensAction,
  SetResTokenAction,
} from './Blur.types';

export const LOADING_COUNT = 100;

const actionFetchingCollections = (payload: { isFetching: boolean }): SetFetchingCollections => ({
  type: BlurActionType.SET_FETCHING_COLLECTION,
  payload,
});

const actionSetCollections = (payload: ICollection[]): SetCollectionsAction => ({
  type: BlurActionType.SET_COLLECTIONS,
  payload,
});

const actionSetBlurRespToken = (payload: IToken[]): SetResTokenAction => ({
  type: BlurActionType.SET_TOKENS,
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

const actionFetchCollections =
  ({ page }: { page: number }) =>
  async (dispatch: AppDispatch) => {
    try {
      if (!page) return;
      dispatch(actionFetchingCollections({ isFetching: true }));
      const collections = await rpcPBlur.getCollections({ page });
      dispatch(actionSetCollections(collections));
      console.log('LOGS actionFetchCollections ', collections);
    } catch (error) {
      console.log('ACTION FETCH COLLECTIONS ERROR: ', error);
    } finally {
      dispatch(actionFetchingCollections({ isFetching: false }));
    }
  };

const actionFetchCollectionTokens = (slug: string) => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    dispatch(
      actionSetMoreLoadingTokens([...new Array(LOADING_COUNT)].map(() => ({ isLoading: true } as unknown as IToken)))
    );
    const res = await rpcPBlur.getCollectionTokens(slug);
    dispatch(actionSetBlurRespToken(res));
  } catch (error) {
    console.log('ACTION FETCH COLLECTION TOKENS ERROR: ', error);
  }
};

const actionFetchMoreCollectionTokens =
  (slug: string, lastToken: IToken) => async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      dispatch(
        actionSetMoreLoadingTokens([...new Array(LOADING_COUNT)].map(() => ({ isLoading: true } as unknown as IToken)))
      );
      const { detail } = lastToken;
      const cursor = {
        price: { unit: detail.price.unit, time: detail.price.listAt, amount: detail.price.amount },
        tokenId: detail.tokenId,
      };
      const res = await rpcPBlur.getCollectionTokens(slug, cursor);
      dispatch(actionSetMoreTokens(res));
    } catch (error) {
      console.log('ACTION FETCH MORE TOKENS ERROR: ', error);
    }
  };

export { actionFetchCollections, actionFetchCollectionTokens, actionFetchMoreCollectionTokens, actionSetCollections };
