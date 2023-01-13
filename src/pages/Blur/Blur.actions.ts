import { rpcPBlur } from 'services';
import { AppDispatch, AppState } from 'state';

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
  SetFetchingCollections,
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
  ({ burnTokenID, burnAmount }: { burnTokenID: string; burnAmount: string }) =>
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
        burnAmount: '',
        recipient: inputAddress,
      };
      console.log('LOGS: BLUR ESTIMATE FEE PAYLOAD: ', payload);
      const fee = convertBlurFee({
        Fee: {
          feeAddress:
            '12stZ9UxpNNd8oKjuf5Bpfb44AvrogVVZCVjjF2u9K2Q1s55LHrQxXypSRZ9BV1PtphRf1JxiBaKbmhmKdj3c7DWt4kkcKV4HyWcuws8YPiZbHuDxFxdar9vQvbB3pvYGQAaj4PR38Sr52fiTDPn',
          feeAddressShardID: 6,
          tokenid: burnTokenID,
          feeAmount: 17090244,
          privacyFee: 6300000,
          feeInUSD: 23.512191480804578,
        },
        Calldata:
          'd948d46800000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000664e7acab24000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000006400000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000000000000000000000000000b5a581c6ea895fbfd0d7529ac04e24bf12804c2d00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000052000000000000000000000000000000000000000000000000000000000000005a00000000000000000000000002794de4d1ac1b4c630bab46df9029651f38446cb000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c000000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000063c023b00000000000000000000000000000000000000000000000000000000063e566320000000000000000000000000000000000000000000000000000000000000000360c6ebe00000000000000000000000000000000000000007381fb7a807323960000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000ae99a698156ee8f8d07cbe7f271c31eeaac0708700000000000000000000000000000000000000000000000000000000000007060000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001af525754c3240000000000000000000000000000000000000000000000000001af525754c3240000000000000000000000000002794de4d1ac1b4c630bab46df9029651f38446cb00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ba8478cab5400000000000000000000000000000000000000000000000000000ba8478cab540000000000000000000000000000000a26b00c1f0df003000390027140000faa719000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000017508f1956a8000000000000000000000000000000000000000000000000000017508f1956a8000000000000000000000000000e117bbe206ed80adbd4ee0e999984dda7d769e010000000000000000000000000000000000000000000000000000000000000041c27a0327284ec82deb3004042c83eb32706d149c5e1ccadae062ad6eeb6f4c936fdd560715e9d4df85523c99837b178584cc4f41a6ae2366870e2ca971206c451b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        CallContract: 'b050abe3cdf852686750133ba878dd8b1250db76',
        ReceiveToken: '6722ec501be09fb221bcc8a46f9660868d0a6c63',
      });
      setTimeout(() => {
        dispatch(actionSetEstimatedFee({ isEstimating: false, fee }));
      }, 1500);
    } catch (error) {
      console.log('ACTION FETCH MORE TOKENS ERROR: ', error);
    }
  };

export {
  actionEstimateFee,
  actionFetchCollections,
  actionFetchCollectionTokens,
  actionFetchMoreCollectionTokens,
  actionSetCollections,
};
