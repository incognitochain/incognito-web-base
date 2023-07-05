import { BigNumber } from 'bignumber.js';
import { BIG_COINS, MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE, PRV } from 'constants/token';
import { maxBy } from 'lodash';
import PToken, { getTokenIdentify, ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import { getQueryPAppName } from 'pages/Swap/Swap.hooks';
import { batch } from 'react-redux';
import { change } from 'redux-form';
import { rpcClient } from 'services';
import { CANCEL_MESSAGE } from 'services/axios';
import { AppDispatch, AppState } from 'state';
import { getShardIDByAddress } from 'state/incognitoWallet/incognitoWallet.utils';
import { getPrivacyByTokenIdentifySelectors } from 'state/token';
import convert from 'utils/convert';
import format from 'utils/format';
import { getAcronymNetwork } from 'utils/token';

import { GROUP_NETWORK_ID_BY_EXCHANGE } from './FormUnshield.constants';
import { isMaxSelector, unshieldDataSelector } from './FormUnshield.selectors';
import { combineExchange } from './FormUnshield.swapEstBuilder';
import {
  FormTypes,
  FormUnshieldActionType,
  FreeSwapFormAction,
  ISwapExchangeData,
  NetworkTypePayload,
  SetIsMaxAction,
  UnshieldFetchingUserFeePayLoad,
  UnshieldSetFetchingUserFeeAction,
  UnshieldSetTokenAction,
  UnshieldSetTokenPayLoad,
  UnshieldSetUserFeeAction,
  UnshieldSetUserFeePayLoad,
} from './FormUnshield.types';
import { getINCTokenWithNetworkName } from './FormUnshield.utils';

export const actionSetToken = (payload: UnshieldSetTokenPayLoad): UnshieldSetTokenAction => ({
  type: FormUnshieldActionType.SET_TOKEN,
  payload,
});

export const actionFreeSwapForm = (): FreeSwapFormAction => ({
  type: FormUnshieldActionType.FREE_SWAP_FORM,
});

const actionSetUserFee = (payload: UnshieldSetUserFeePayLoad): UnshieldSetUserFeeAction => ({
  type: FormUnshieldActionType.SET_USER_FEE,
  payload,
});

const actionSetFetchingFee = (payload: UnshieldFetchingUserFeePayLoad): UnshieldSetFetchingUserFeeAction => ({
  type: FormUnshieldActionType.FETCHING_FEE,
  payload,
});

export const actionResetFee = () => ({
  type: FormUnshieldActionType.RESET_FEE,
});

export const actionSetSwapExchangeSupports = (payload: any) => ({
  type: FormUnshieldActionType.SET_SWAP_EXCHANGE_SUPPORT,
  payload,
});

export const actionSetVaults = (payload: any) => ({
  type: FormUnshieldActionType.SET_VAULTS,
  payload,
});

export const actionSetExchangeSelected = (payload: string | null) => ({
  type: FormUnshieldActionType.SET_SWAP_EXCHANGE_SELECTED,
  payload,
});

export const actionSetErrorMsg = (payload: string) => ({
  type: FormUnshieldActionType.SET_ERROR_MSG,
  payload,
});

export const actionSetSwapNetwork = (payload: MAIN_NETWORK_NAME) => ({
  type: FormUnshieldActionType.SET_SWAP_NETWORK,
  payload,
});

export const actionSetIsMax = (payload: boolean): SetIsMaxAction => ({
  type: FormUnshieldActionType.SET_IS_MAX,
  payload,
});

export const actionChangeSellToken =
  ({ token }: { token: PToken }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      const { buyToken, formType, sellToken: currentSellToken, buyNetworkName } = unshieldDataSelector(getState());
      const sellParentToken = getPrivacyByTokenIdentifySelectors(getState())(token.parentTokenID);
      if (!token.networkName || sellParentToken.currencyType === undefined) return;

      const _sellToken: ITokenNetwork = {
        parentIdentify: token.parentTokenID,
        identify: token.identify,
        chainID: token.chainID,
        currency: token.currencyType,
        networkName: token.networkName,
      };

      if (
        currentSellToken.networkName === buyNetworkName &&
        (currentSellToken.isBTC || currentSellToken.isCentralized) &&
        currentSellToken.parentTokenID === buyToken.parentTokenID
      ) {
        const _buyToken: ITokenNetwork = {
          parentIdentify: buyToken.parentTokenID,
          identify: buyToken.identify,
          chainID: buyToken.chainID,
          currency: buyToken.currencyType,
          networkName: MAIN_NETWORK_NAME.INCOGNITO,
        };
        dispatch(actionSetSwapNetwork(MAIN_NETWORK_NAME.INCOGNITO));
        dispatch(
          actionSetToken({
            sellToken: _sellToken,
            buyToken: _buyToken,
          })
        );
      } else {
        let _buyToken = sellParentToken;
        if (_buyToken.hasChild) {
          _buyToken = _buyToken.listUnifiedToken[0];
        }
        // Case unshield
        if (sellParentToken.parentTokenID === buyToken.parentTokenID) {
          const defaultBuyToken: ITokenNetwork = {
            parentIdentify: token.parentTokenID,
            identify: _buyToken.identify,
            chainID: _buyToken.chainID,
            currency: _buyToken.currencyType,
            networkName: _buyToken.networkName || MAIN_NETWORK_NAME.INCOGNITO,
          };
          dispatch(
            actionSetToken({
              sellToken: _sellToken,
              buyToken: defaultBuyToken,
            })
          );
          dispatch(actionSetSwapNetwork(_buyToken.networkName || MAIN_NETWORK_NAME.INCOGNITO));
        } else {
          dispatch(
            actionSetToken({
              sellToken: _sellToken,
            })
          );
        }
      }
      if (formType === FormTypes.SWAP) {
        dispatch(actionSetExchangeSelected(null));
        dispatch(actionSetSwapExchangeSupports([]));
      }
    } catch (error) {
      console.log('ACTION FILTER TOKEN ERROR: ', error);
    }
  };

export const actionChangeBuyToken =
  ({ token }: { token: PToken }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      const parentToken = getPrivacyByTokenIdentifySelectors(getState())(token.parentTokenID);
      if (!token.networkName || parentToken.currencyType === undefined) return;
      const { sellToken, buyNetworkName } = unshieldDataSelector(getState());

      // case swap INCOGNITO
      let _buyToken = parentToken;

      // case unshield
      if (parentToken.hasChild && _buyToken.parentTokenID === sellToken.parentTokenID) {
        _buyToken = parentToken.listUnifiedToken[0];
      }
      // case swap outchain
      if (buyNetworkName !== MAIN_NETWORK_NAME.INCOGNITO) {
        const tokenMap = getINCTokenWithNetworkName({
          parentToken,
          token,
          networkName: buyNetworkName,
        });
        if (tokenMap) _buyToken = tokenMap;
      }

      const buyTokenObj: ITokenNetwork = {
        parentIdentify: _buyToken.parentTokenID,
        identify: _buyToken.identify,
        chainID: _buyToken.chainID,
        currency: _buyToken.currencyType,
        networkName: _buyToken.networkName || MAIN_NETWORK_NAME.INCOGNITO,
      };

      dispatch(
        actionSetToken({
          buyToken: buyTokenObj,
        })
      );
    } catch (error) {
      console.log('ACTION FILTER TOKEN ERROR: ', error);
    }
  };

export const actionChangeSellNetwork =
  ({ network }: { network: ITokenNetwork }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    try {
      dispatch(
        actionSetToken({
          sellToken: {
            ...network,
          },
        })
      );
    } catch (error) {
      console.log('ACTION CHANGE BUY NETWORK ERROR: ', error);
    }
  };

export const actionChangeBuyNetwork =
  ({ network }: { network: ITokenNetwork }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    const { sellToken, sellParentToken, buyToken, buyParentToken } = unshieldDataSelector(getState());

    const parentID = getTokenIdentify({
      tokenID: !sellToken.parentTokenID.toLowerCase().includes(BIG_COINS.USDC_UNIFIED.tokenID.toLowerCase())
        ? BIG_COINS.USDC_UNIFIED.tokenID
        : BIG_COINS.ETH_UNIFIED.tokenID,
      currencyType: PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN,
    });

    const defBuyToken = {
      parentIdentify: parentID,
      identify: parentID,
      chainID: 0,
      currency: PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN,
      networkName: network.networkName,
    };

    try {
      // set network and token centralized + BTC
      if ((sellToken.isBTC || sellToken.isCentralized) && network.networkName === sellToken.networkName) {
        dispatch(actionSetToken({ buyToken: { ...network } }));
      } else {
        // unshield
        if (sellToken.parentTokenID === buyToken.parentTokenID) {
          // reset field
          if (network.networkName === MAIN_NETWORK_NAME.INCOGNITO) {
            dispatch(actionSetToken({ buyToken: { ...defBuyToken } }));
          } else {
            dispatch(actionSetToken({ buyToken: { ...network } }));
          }
        } else {
          // case swap INCOGNITO
          if (network.networkName === MAIN_NETWORK_NAME.INCOGNITO) {
            // set unified token
            if (buyToken.tokenID !== buyToken.parentTokenID) {
              dispatch(
                actionSetToken({
                  buyToken: {
                    parentIdentify: buyParentToken.parentTokenID,
                    identify: buyParentToken.identify,
                    chainID: buyParentToken.chainID,
                    currency: buyParentToken.currencyType,
                    networkName: network.networkName,
                  },
                })
              );
            }
          } else {
            let _buyToken = getINCTokenWithNetworkName({
              parentToken: buyParentToken,
              token: buyToken,
              networkName: network.networkName,
            });
            if (!_buyToken) {
              // reset buy token with sell token mapping buy network
              _buyToken = getINCTokenWithNetworkName({
                parentToken: sellParentToken,
                token: sellToken,
                networkName: network.networkName,
              });
            }
            if (!!_buyToken) {
              dispatch(
                actionSetToken({
                  buyToken: {
                    parentIdentify: _buyToken.parentTokenID,
                    identify: _buyToken.identify,
                    chainID: _buyToken.chainID,
                    currency: _buyToken.currencyType,
                    networkName: network.networkName,
                  },
                })
              );
            }
          }
        }
      }
      dispatch(actionSetSwapNetwork(network?.networkName));
    } catch (error) {
      console.log('ACTION CHANGE BUY NETWORK ERROR: ', error);
    }
  };

export const actionEstimateFee = () => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    const { inputAmount, inputOriginalAmount, buyToken, incAddress, unshieldAddress, sellToken } = unshieldDataSelector(
      getState()
    );
    if (!incAddress || !unshieldAddress || !inputOriginalAmount) return;
    dispatch(actionSetErrorMsg(''));
    dispatch(actionSetFetchingFee({ isFetchingFee: true }));
    const network: any = getAcronymNetwork(buyToken);

    const incognitoAmount = new BigNumber(
      inputOriginalAmount ||
        convert.toOriginalAmount({ humanAmount: '1', round: false, decimals: buyToken.pDecimals }).toString()
    ).toString();

    // with address payload
    const withPayload = {
      network,
      incognitoAmount,
      paymentAddress: unshieldAddress,
      privacyTokenAddress: buyToken.tokenID,
      requestedAmount: inputAmount || '1',
      walletAddress: incAddress,
      unifiedTokenID: sellToken.isUnified ? sellToken.tokenID : '',
      currencyType: buyToken.currencyType,
    };

    // without address payload
    const withoutPayload = {
      network,
      tokenID: sellToken.tokenID,
      amount: convert.toOriginalAmount({
        humanAmount: inputAmount || '0',
        round: false,
        decimals: sellToken.pDecimals,
      }),
      isUnified: sellToken.isUnified,
    };
    const isUnshieldWithoutAddress =
      !sellToken.isCentralized && !sellToken.isBTC && !sellToken.isNearToken && !sellToken.isMainNEAR;
    const data = isUnshieldWithoutAddress
      ? await rpcClient.estimateUnshieldWithoutAddress(withoutPayload)
      : await rpcClient.estimateUnshieldWithAddress(withPayload);

    dispatch(actionSetUserFee({ fee: data }));
  } catch (error) {
    dispatch(actionSetErrorMsg(typeof error === 'string' ? error : error?.message || ''));
    console.log('ACTION ESTIMATE UNSHIELD FEE ERROR: ', error);
  } finally {
    setTimeout(() => {
      dispatch(actionSetFetchingFee({ isFetchingFee: false }));
    }, 200);
  }
};

export const actionEstimateSwapFee =
  ({ isResetForm = false, incAddress = '' }: { isResetForm: boolean; incAddress?: string }) =>
  async (dispatch: AppDispatch, getState: AppState & any) => {
    let isCancelMsg = false;
    let isReEstByMax = false;
    try {
      const {
        inputAmount,
        buyParentToken,
        buyNetworkName,
        sellToken,
        slippage,
        exchangeSelected,
        isSubmitting,
        vaults,
        inputOriginalAmount,
        fee: combineFee,
      } = unshieldDataSelector(getState());
      if (
        !inputAmount ||
        !parseFloat(inputAmount) ||
        !sellToken?.tokenID ||
        !buyParentToken?.tokenID ||
        // !incAddress ||
        !buyNetworkName ||
        isSubmitting
      ) {
        return;
      }
      dispatch(actionSetFetchingFee({ isFetchingFee: true, isResetForm }));
      let network: NetworkTypePayload;
      switch (buyNetworkName) {
        case MAIN_NETWORK_NAME.ETHEREUM:
          network = NetworkTypePayload.ETHEREUM;
          break;
        case MAIN_NETWORK_NAME.BSC:
          network = NetworkTypePayload.BINANCE_SMART_CHAIN;
          break;
        case MAIN_NETWORK_NAME.POLYGON:
          network = NetworkTypePayload.POLYGON;
          break;
        case MAIN_NETWORK_NAME.FANTOM:
          network = NetworkTypePayload.FANTOM;
          break;
        case MAIN_NETWORK_NAME.AVALANCHE:
          network = NetworkTypePayload.AVALANCHE;
          break;
        case MAIN_NETWORK_NAME.AURORA:
          network = NetworkTypePayload.AURORA;
          break;
        default:
          network = NetworkTypePayload.INCOGNITO;
      }

      const shardIDStr = incAddress ? getShardIDByAddress({ incAddress }).toString() : '';

      const payload = {
        network,
        amount: inputAmount,
        fromToken: sellToken.tokenID,
        toToken: buyParentToken.tokenID,
        slippage,
        shardIDStr,
      };

      // Call api estimate swap fee
      const data = await rpcClient.estimateSwapFee(payload);
      if (!data) throw new Error('Can not estimate trade');

      // mapping exchange
      const pdexExchanges = combineExchange({
        data,
        network: NetworkTypePayload.INCOGNITO,
        networkText: 'PDex',
        token: sellToken,
      });
      const ethExchanges = combineExchange({
        data,
        network: NetworkTypePayload.ETHEREUM,
        networkText: 'Ethereum',
        token: sellToken,
      });
      const bscExchanges = combineExchange({
        data,
        network: NetworkTypePayload.BINANCE_SMART_CHAIN,
        networkText: 'BNB Chain',
        token: sellToken,
      });
      const plgExchanges = combineExchange({
        data,
        network: NetworkTypePayload.POLYGON,
        networkText: 'Polygon',
        token: sellToken,
      });
      const ftmExchanges = combineExchange({
        data,
        network: NetworkTypePayload.FANTOM,
        networkText: 'Fantom',
        token: sellToken,
      });
      const auroraExchanges = combineExchange({
        data,
        network: NetworkTypePayload.AURORA,
        networkText: 'Aurora',
        token: sellToken,
      });
      const avaxExchanges = combineExchange({
        data,
        network: NetworkTypePayload.AVALANCHE,
        networkText: 'Avalanche',
        token: sellToken,
      });

      const interExchanges = combineExchange({
        data,
        network: NetworkTypePayload.INTER_SWAP,
        networkText: 'Inter-liquidity pools',
        token: sellToken,
      });

      let exchangeSupports = [
        ...ethExchanges,
        ...ftmExchanges,
        ...plgExchanges,
        ...bscExchanges,
        ...avaxExchanges,
        ...auroraExchanges,
        ...pdexExchanges,
        ...interExchanges,
      ];

      const queryPAppName = getQueryPAppName();
      if (queryPAppName.isValid && queryPAppName.pAppName) {
        exchangeSupports = exchangeSupports.filter((exchange) => exchange.appName === queryPAppName.pAppName);
      }

      if (!exchangeSupports?.length) {
        if (queryPAppName?.isPDex) {
          throw 'The amount exceeds the swap limit. Please retry with smaller amount.';
        }
        if (sellToken?.isUnified && vaults?.UnifiedTokenVaults) {
          const tokenVault = vaults?.UnifiedTokenVaults[sellToken?.tokenID] || {};
          const networkIDs = queryPAppName.isValid
            ? GROUP_NETWORK_ID_BY_EXCHANGE[queryPAppName.pAppName]
            : sellToken.listUnifiedToken.map((token) => token.networkID);
          const incTokens = Object.values(tokenVault).filter(
            (item: any) => item?.NetworkID && networkIDs.includes(item?.NetworkID)
          );
          const maxTokenVault = maxBy(incTokens, function (o: any) {
            return o.Amount;
          });

          if (inputOriginalAmount >= maxTokenVault.Amount) {
            const formatAmount = format.amountVer2({
              originalAmount: Number(maxTokenVault?.Amount || 0),
              decimals: 9,
            });
            throw new Error(`Max amount you can swap with this pair is ${formatAmount} ${sellToken.symbol}`);
          }
        }
      }

      if (!exchangeSupports?.length) {
        throw new Error('Can not find any trading platform that supports for this pair token');
      }

      // Find best rate by list exchange
      // const bestRate: ISwapExchangeData = exchangeSupports[0];
      let bestRate: ISwapExchangeData | undefined;

      if (
        !isResetForm &&
        exchangeSelected &&
        exchangeSupports.some((exchange) => exchange.exchangeName === exchangeSelected)
      ) {
        bestRate = exchangeSupports.find((exchange) => exchange.exchangeName === exchangeSelected);
      }
      if (!bestRate) {
        bestRate = exchangeSupports.reduce((prev, current) => {
          let prevFee = '0';
          let curFee = '0';
          if (prev.fees) prevFee = prev.fees[0].amountInBuyToken;
          if (current.fees) curFee = current.fees[0].amountInBuyToken;
          const prevValue = new BigNumber(prev.amountOut).minus(prevFee);
          const currValue = new BigNumber(current.amountOut).minus(curFee);
          return new BigNumber(prevValue).gt(currValue) ? prev : current;
        });
      }

      const isMax = isMaxSelector(getState());
      if (bestRate && isMax) {
        const apiFee = bestRate.fees[0];
        let userBalance = sellToken.amount;
        const amountFee = apiFee.amount; // human amount
        const feeTokenID = apiFee.tokenId;

        if (sellToken.tokenID === PRV.id) {
          userBalance = new BigNumber(userBalance || 0).minus(combineFee.networkFee).toNumber();
        }

        // check burn token equal fee token
        if (feeTokenID === sellToken.tokenID) {
          const isOutOfBalance = new BigNumber(inputOriginalAmount).plus(amountFee).gt(userBalance || 0);
          if (isOutOfBalance) {
            isReEstByMax = true;
            let newInputOriginalAmount = new BigNumber(userBalance || 0).minus(amountFee).toNumber();
            if (newInputOriginalAmount <= 0) {
              newInputOriginalAmount = 0;
            }
            const newInput = format
              .formatAmount({
                originalAmount: newInputOriginalAmount,
                decimals: sellToken.pDecimals,
                clipAmount: false,
              })
              .toString();
            return batch(() => {
              dispatch(actionSetIsMax(false));
              dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.sellAmount, newInput));
            });
          }
        }
      }

      // Set default exchange has best rate
      const defaultExchange: string = bestRate?.exchangeName;
      dispatch(actionSetExchangeSelected(defaultExchange));

      dispatch(actionSetSwapExchangeSupports(exchangeSupports));
    } catch (error) {
      if (error?.message === CANCEL_MESSAGE) {
        isCancelMsg = true;
      }
      if (!isCancelMsg) {
        dispatch(actionSetErrorMsg(typeof error === 'string' ? error : error?.message || ''));
      }
    } finally {
      if (!isCancelMsg && !isReEstByMax) {
        setTimeout(() => {
          dispatch(actionSetFetchingFee({ isFetchingFee: false }));
        }, 200);
      }
    }
  };

export const actionRotateSwapTokens = () => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    const { buyParentToken, sellParentToken } = unshieldDataSelector(getState());

    const getTokenObject = (token: SelectedPrivacy): ITokenNetwork => ({
      parentIdentify: token.parentTokenID,
      identify: token.identify,
      chainID: token.chainID,
      currency: token.currencyType,
      networkName: token.networkName || MAIN_NETWORK_NAME.INCOGNITO,
    });

    dispatch(
      actionSetToken({
        sellToken: getTokenObject(buyParentToken),
        buyToken: getTokenObject(sellParentToken),
      })
    );
    dispatch(actionSetSwapNetwork(MAIN_NETWORK_NAME.INCOGNITO));
  } catch (error) {
    console.log('ACTION FILTER TOKEN ERROR: ', error);
  }
};

export const actionGetVaults = () => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    const data = await rpcClient.getVaults();
    dispatch(actionSetVaults(data));
  } catch (error) {
    console.log('ACTION CHANGE BUY NETWORK ERROR: ', error);
  }
};
