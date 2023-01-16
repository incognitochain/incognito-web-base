import { rpcPBlur } from 'services';
import { AppDispatch, AppState } from 'state';

import { CANCEL_MESSAGE } from '../../services/axios';
import { convertBlurFee } from './Blur.builder';
import { ICollection, IMapTokens, IToken } from './Blur.interface';
import { MAX_GET_ITEM } from './Blur.reducer';
import { buyCollectionSelector, selectedTokensSelector } from './Blur.selectors';
import {
  AppendLoadingTokensAction,
  AppendTokensAction,
  BlurActionType,
  ClearSelectedTokenIdsAction,
  ISetEstimatedFeePayload,
  SelectMaxBuyTokensAction,
  SetCollectionsAction,
  SetEstimatedFeeAction,
  SetEstimatedFeeErrorAction,
  SetFetchingCollections,
  SetSelectedPrivacyTokenIDAction,
  SetSelectedTokenIdAction,
  SetTokensAction,
  UpdateTokenAction,
} from './Blur.types';

const actionFetchingCollections = (payload: { isFetching: boolean }): SetFetchingCollections => ({
  type: BlurActionType.SET_FETCHING_COLLECTION,
  payload,
});

const actionSetEstimatedFee = (payload: ISetEstimatedFeePayload): SetEstimatedFeeAction => ({
  type: BlurActionType.SET_ESTIMATED_FEE,
  payload,
});

const actionSetEstimateFeeError = (payload: string): SetEstimatedFeeErrorAction => ({
  type: BlurActionType.SET_ESTIMATED_FEE_ERROR,
  payload,
});

const actionSelectedPrivacyTokenID = (payload: string): SetSelectedPrivacyTokenIDAction => ({
  type: BlurActionType.SET_SELECTED_PRIVACY_TOKEN_ID,
  payload,
});

const actionSetCollections = (payload: ICollection[]): SetCollectionsAction => ({
  type: BlurActionType.SET_COLLECTIONS,
  payload,
});

const actionSetTokens = (payload: IMapTokens): SetTokensAction => ({
  type: BlurActionType.SET_TOKENS,
  payload,
});

const actionSetMoreTokens = (payload: IToken[]): AppendTokensAction => ({
  type: BlurActionType.APPEND_TOKENS,
  payload,
});

const actionSetMoreLoadingTokens = (payload: IToken[]): AppendLoadingTokensAction => ({
  type: BlurActionType.APPEND_LOADING_TOKENS,
  payload,
});

export const actionUpdateToken = (payload: IToken): UpdateTokenAction => ({
  type: BlurActionType.UPDATE_TOKEN,
  payload,
});

export const actionSetSelectedTokenId = (payload: string): SetSelectedTokenIdAction => ({
  type: BlurActionType.SET_SELECTED_TOKEN_ID,
  payload,
});

export const clearSelectedTokens = (): ClearSelectedTokenIdsAction => ({
  type: BlurActionType.CLEAR_SELECTED_TOKEN_IDS,
});

export const selectMaxBuyTokens = (): SelectMaxBuyTokensAction => ({
  type: BlurActionType.SELECT_MAX_BUY_TOKENS,
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

const actionFetchCollectionTokens =
  (slug: string, query?: string) => async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      dispatch(
        actionSetMoreLoadingTokens([...new Array(MAX_GET_ITEM)].map(() => ({ isLoading: true } as unknown as IToken)))
      );
      const { tokens, collection } = await rpcPBlur.getCollectionTokens({ slug, page: 1, query });
      dispatch(actionSetTokens({ tokens, collection }));
    } catch (error) {
      console.log('ACTION FETCH COLLECTION TOKENS ERROR: ', error);
    }
  };

const actionFetchMoreCollectionTokens =
  (page: number, slug: string, query?: string) => async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      dispatch(
        actionSetMoreLoadingTokens([...new Array(MAX_GET_ITEM)].map(() => ({ isLoading: true } as unknown as IToken)))
      );
      const { tokens } = await rpcPBlur.getCollectionTokens({ slug, page, query });
      dispatch(actionSetMoreTokens(tokens));
    } catch (error) {
      console.log('ACTION FETCH MORE TOKENS ERROR: ', error);
    }
  };

const actionEstimateFee =
  ({ burnTokenID, burnOriginalAmount }: { burnTokenID: string; burnOriginalAmount: string }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      const state = getState();
      const selectedItems = selectedTokensSelector(state);
      const { inputAddress, valid } = buyCollectionSelector(state);

      if (!selectedItems || selectedItems.length < 1) throw 'Please select items';
      if (!valid || !inputAddress) throw 'Please enter valid address';

      dispatch(actionSetEstimatedFee({ isEstimating: true, fee: undefined }));

      const nftIDs = selectedItems.map((item) => item.tokenId);
      const payload = {
        contractAddress: selectedItems[0].contractAddress,
        nftIDs,
        burnTokenID,
        burnAmount: burnOriginalAmount,
        recipient: inputAddress,
      };
      console.log('LOGS: BLUR ESTIMATE FEE PAYLOAD: ', payload);
      const json = await rpcPBlur.estimateFee(payload);
      const fee = convertBlurFee(json);
      dispatch(actionSetEstimatedFee({ isEstimating: false, fee }));
    } catch (error) {
      console.log('BLUR ESTIMATE FEE ERROR: ', error, error?.message);
      if (error?.message === CANCEL_MESSAGE || error === CANCEL_MESSAGE) return;
      const errorMessage = typeof error === 'string' ? error : error?.message || '';
      dispatch(actionSetEstimateFeeError(typeof error === 'string' ? error : error?.message || ''));
    }
  };

export {
  actionEstimateFee,
  actionFetchCollections,
  actionFetchCollectionTokens,
  actionFetchMoreCollectionTokens,
  actionSelectedPrivacyTokenID,
  actionSetCollections,
};
