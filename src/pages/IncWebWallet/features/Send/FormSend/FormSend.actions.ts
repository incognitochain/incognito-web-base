// import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
// import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
// import { AppDispatch, AppState } from 'state';
// import { getDepositTokenDataSelector, getPrivacyByTokenIdentifySelectors } from 'state/token';

// import { DepositSetTokenAction, DepositSetTokenPayLoad, FormDepositActionType } from './FormSend.types';

// export const actionSetToken = (payload: DepositSetTokenPayLoad): DepositSetTokenAction => ({
//   type: FormDepositActionType.SET_TOKEN,
//   payload,
// });

// export const actionFilterSetToken =
//   ({ token }: { token: PToken }) =>
//   async (dispatch: AppDispatch, getState: AppState & any) => {
//     try {
//       const parentToken = getPrivacyByTokenIdentifySelectors(getState())(token.parentTokenID);
//       if (token.chainID === null || token.chainID === undefined || !token.networkName) return;
//       const sellToken: ITokenNetwork = {
//         identify: token.identify,
//         chainID: token.chainID,
//         currency: token.currencyType,
//         networkName: token.networkName,
//       };
//       const buyToken: ITokenNetwork = {
//         identify: parentToken.identify,
//         chainID: parentToken.chainID,
//         currency: parentToken.currencyType || PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN,
//         networkName: parentToken.networkName || MAIN_NETWORK_NAME.INCOGNITO,
//       };
//       dispatch(
//         actionSetToken({
//           sellToken,
//           buyToken,
//         })
//       );
//     } catch (error) {
//       console.log('ACTION FILTER TOKEN ERROR: ', error);
//     }
//   };

// export const actionFilterTokenByNetwork =
//   ({ network }: { network: ITokenNetwork }) =>
//   async (dispatch: AppDispatch, getState: AppState & any) => {
//     try {
//       const token = getDepositTokenDataSelector(getState())(network.identify);
//       const parentToken = getPrivacyByTokenIdentifySelectors(getState())(token.parentTokenID);

//       if (!network.currency) return;
//       const sellToken: ITokenNetwork = {
//         identify: network.identify,
//         chainID: network.chainID,
//         currency: network.currency,
//         networkName: network.networkName,
//       };
//       const buyToken: ITokenNetwork = {
//         identify: parentToken.identify,
//         chainID: parentToken.chainID,
//         currency: parentToken.currencyType,
//         networkName: parentToken.networkName || MAIN_NETWORK_NAME.INCOGNITO,
//       };
//       dispatch(
//         actionSetToken({
//           sellToken,
//           buyToken,
//         })
//       );
//     } catch (error) {
//       console.log('ACTION FILTER TOKEN BY NETWORK ERROR: ', error);
//     }
//   };

export {};
