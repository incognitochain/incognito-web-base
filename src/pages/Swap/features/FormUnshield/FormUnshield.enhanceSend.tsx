import { BigNumber } from 'bignumber.js';
import { getIncognitoInject, useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { TransactionSubmittedContent } from 'components/Core/TransactionConfirmationModal';
import { useModal } from 'components/Modal';
import LoadingTransaction from 'components/Modal/Modal.transaction';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE, PRV } from 'constants/token';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import { setSwapTx } from 'pages/Swap/Swap.storage';
import React from 'react';
import { batch } from 'react-redux';
import { change, focus, untouch } from 'redux-form';
import { rpcClient } from 'services';
import rpcMetric, { METRIC_TYPE } from 'services/rpcMetric';
import { useAppDispatch } from 'state/hooks';

import { actionEstimateFee, actionSetErrorMsg } from './FormUnshield.actions';
import { IMergeProps } from './FormUnshield.enhance';
import { FormTypes, NetworkTypePayload, SwapExchange } from './FormUnshield.types';
import { getBurningMetaDataTypeForUnshield, getPrvPayments, getTokenPayments } from './FormUnshield.utils';

const { getBurningAddress } = require('incognito-chain-web-js/build/wallet');
export interface TInner {
  onSend: () => void;
}

const enhanceSend = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: IMergeProps) => {
    const {
      disabledForm,
      buyToken,
      sellToken,
      fee,
      burnOriginalAmount,
      inputAddress,
      formType,
      swapFee,
      exchangeSelectedData,
      errorMsg,
      buyNetworkName,
      buyParentToken,
      isFetching,
      incAddress,
      isUseTokenFee,
      expectedReceiveAmount,
      inputAmount,
    } = props;
    const dispatch = useAppDispatch();
    const { requestSignTransaction, isIncognitoInstalled, requestIncognitoAccount } = useIncognitoWallet();
    const { setModal, clearAllModal } = useModal();
    const updateMetric = () => rpcMetric.updateMetric({ type: METRIC_TYPE.CONFIRM_SWAP });

    const remoteAddress = React.useMemo(() => {
      let remoteAddress: string = inputAddress || '';
      if (remoteAddress.startsWith('0x')) {
        remoteAddress = remoteAddress.slice(2);
      }
      return remoteAddress;
    }, [inputAddress]);

    const feeBurnCombine = React.useMemo(() => {
      const _feeAmount = formType === FormTypes.SWAP ? swapFee?.amount : parseInt(fee.burnFee || '0');
      const _feeReceiverAddress = formType === FormTypes.SWAP ? exchangeSelectedData?.feeAddress : fee.feeAddress;
      return {
        amount: _feeAmount,
        address: _feeReceiverAddress,
      };
    }, [fee.burnFee, fee.feeAddress, formType, swapFee?.amount, exchangeSelectedData?.feeAddress]);

    // Case PRV force isDecentralized = true
    const isDecentralized = React.useMemo(() => {
      let isDecentralized = true;
      if (!sellToken.isPRV) {
        isDecentralized = (
          (sellToken.hasChild
            ? sellToken.listUnifiedToken.find((token: any) => token.networkName === buyNetworkName)
            : sellToken) || sellToken
        ).isDecentralized;
      }
      return isDecentralized;
    }, [sellToken.identify, buyNetworkName]);

    const getKeySetINC = async () => {
      const incognito = getIncognitoInject();

      // Get OTA Receiver and Burner address
      const { result }: { result: any } = await incognito.request({
        method: 'wallet_requestAccounts',
        params: { senderShardID: (exchangeSelectedData || {}).feeAddressShardID },
      });
      const otaReceiver = result?.otaReceiver;
      const burnerAddress = result?.burnerAddress;
      let feeRefundOTA = '';
      if (result?.otaReceiverWithCfg && formType === FormTypes.SWAP) {
        feeRefundOTA = result?.otaReceiverWithCfg;
      }
      const newCoins = result.newCoins;
      return {
        otaReceiver,
        burnerAddress,
        feeRefundOTA,
        newCoins,
      };
    };
    const getPaymentsCentralized = async () => {
      const { networkFee, centralizedAddress } = fee;
      const prvPayments: any[] = [];
      let tokenPayments: any[] = [];
      if (isUseTokenFee) {
        tokenPayments = await getTokenPayments({
          data: [
            {
              paymentAddress: feeBurnCombine.address,
              amount: feeBurnCombine.amount,
            },
            {
              paymentAddress: centralizedAddress,
              amount: new BigNumber(parseInt(burnOriginalAmount)).toString(),
            },
          ],
        });
      } else {
        tokenPayments = await getTokenPayments({
          data: [
            {
              paymentAddress: centralizedAddress,
              amount: new BigNumber(parseInt(burnOriginalAmount)).toString(),
            },
          ],
        });
        prvPayments.push({
          PaymentAddress: feeBurnCombine.address,
          Amount: new BigNumber(feeBurnCombine.amount).toString(),
          Message: '',
        });
      }
      prvPayments.push({
        PaymentAddress: centralizedAddress,
        Amount: new BigNumber(networkFee).toString(),
        Message: '',
      });
      return { prvPayments, tokenPayments };
    };
    const getPaymentsUnshieldDecentralizedAndPApps = async () => {
      let prvPayments: any[] = [];
      let tokenPayments: any[] = [];
      if (isUseTokenFee) {
        tokenPayments = await getTokenPayments({
          data: [
            {
              paymentAddress: feeBurnCombine.address,
              amount: feeBurnCombine.amount,
            },
          ],
          burnAmount: parseInt(burnOriginalAmount),
        });
      } else {
        const payment = [
          {
            paymentAddress: feeBurnCombine.address,
            amount: feeBurnCombine.amount,
          },
        ];
        if (sellToken.isPRV) {
          prvPayments = await getTokenPayments({
            data: [...payment],
            burnAmount: parseInt(burnOriginalAmount),
          });
        } else {
          prvPayments = await getPrvPayments([...payment]);
          tokenPayments = await getTokenPayments({
            data: [],
            burnAmount: parseInt(burnOriginalAmount),
          });
        }
      }
      return {
        prvPayments,
        tokenPayments,
      };
    };
    const getPaymentsSwapPDEX = async () => {
      const incBurningAddress = await getBurningAddress();
      let prvPayments: any[] = [];
      let tokenPayments: any[] = [];
      if (sellToken.tokenID === PRV.id) {
        prvPayments = await getTokenPayments({
          data: [
            {
              paymentAddress: incBurningAddress,
              amount: new BigNumber(feeBurnCombine.amount).plus(parseInt(burnOriginalAmount)).toString(),
            },
          ],
        });
      } else {
        if (isUseTokenFee) {
          const tokenBurnAmount = new BigNumber(feeBurnCombine.amount).plus(parseInt(burnOriginalAmount)).toString();
          tokenPayments = await getTokenPayments({
            data: [
              {
                paymentAddress: incBurningAddress,
                amount: tokenBurnAmount,
              },
            ],
          });
        } else {
          prvPayments = await getTokenPayments({
            data: [
              {
                paymentAddress: incBurningAddress,
                amount: feeBurnCombine.amount,
              },
            ],
          });
          tokenPayments = await getTokenPayments({
            data: [
              {
                paymentAddress: incBurningAddress,
                amount: new BigNumber(parseInt(burnOriginalAmount)).toString(),
              },
            ],
          });
        }
      }
      return { prvPayments, tokenPayments };
    };
    const getPaymentsUnshieldBTC = async () => {
      const incBurningAddress = await getBurningAddress();
      const prvPayments: any[] = [];
      const tokenPayments = await getTokenPayments({
        data: [
          {
            paymentAddress: incBurningAddress,
            amount: parseInt(burnOriginalAmount),
          },
        ],
      });
      return { prvPayments, tokenPayments };
    };
    const getPaymentsUnshieldPRV = async () => {
      const prvPayments = await getTokenPayments({
        data: [
          {
            paymentAddress: feeBurnCombine.address,
            amount: feeBurnCombine.amount,
          },
        ],
        burnAmount: parseInt(burnOriginalAmount),
      });
      return {
        prvPayments,
      };
    };
    const getTokenAndPrivacyPayments = async () => {
      let prvPayments: any[] = [];
      let tokenPayments: any[] = [];
      if (formType === FormTypes.UNSHIELD && sellToken.isCentralized) {
        /** Unshield Centralized */
        const { prvPayments: _prvPayments, tokenPayments: _tokenPayments } = await getPaymentsCentralized();
        prvPayments = _prvPayments;
        tokenPayments = _tokenPayments;
      } else if (formType === FormTypes.UNSHIELD && sellToken.isPRV) {
        /** Unshield PRV */
        const { prvPayments: _prvPayments } = await getPaymentsUnshieldPRV();
        prvPayments = _prvPayments;
      } else if (formType === FormTypes.UNSHIELD && sellToken.isBTC) {
        /** Unshield BITCOIN */
        const { tokenPayments: _tokenPayments } = await getPaymentsUnshieldBTC();
        tokenPayments = _tokenPayments;
      } else if (formType === FormTypes.SWAP && exchangeSelectedData.appName === SwapExchange.PDEX) {
        /** Swap PDEX */
        const { prvPayments: _prvPayments, tokenPayments: _tokenPayments } = await getPaymentsSwapPDEX();
        prvPayments = _prvPayments;
        tokenPayments = _tokenPayments;
      } else {
        /** Unshield Decentralized + Swap PApps */
        const { prvPayments: _prvPayments, tokenPayments: _tokenPayments } =
          await getPaymentsUnshieldDecentralizedAndPApps();
        prvPayments = _prvPayments;
        tokenPayments = _tokenPayments;
      }

      return {
        prvPayments,
        tokenPayments,
      };
    };

    const getUnshieldDecentralizedMetadata = ({
      otaReceiver,
      burnerAddress,
    }: {
      otaReceiver: string;
      burnerAddress: string;
    }) => {
      const { estimatedExpectedAmount } = fee;
      const burningMetaDataType: number = getBurningMetaDataTypeForUnshield(sellToken);
      let metadata = {};
      if (sellToken?.isUnified) {
        metadata = {
          Type: burningMetaDataType,
          UnifiedTokenID: sellToken?.isUnified ? sellToken?.tokenID : null,
          Data: [
            {
              IncTokenID: buyToken.tokenID,
              BurningAmount: burnOriginalAmount,
              RemoteAddress: remoteAddress,
              MinExpectedAmount: estimatedExpectedAmount,
            },
          ],
          Receiver: otaReceiver,
          IsDepositToSC: false,
        };
      } else {
        metadata = {
          BurnerAddress: burnerAddress,
          BurningAmount: burnOriginalAmount,
          TokenID: sellToken?.tokenID,
          RemoteAddress: remoteAddress,
          Type: burningMetaDataType,
        };
      }
      return metadata;
    };
    const getSwapPAppMetadata = ({ otaReceiver }: { otaReceiver: string }) => {
      // Get swap payload data
      let externalCallData: string = exchangeSelectedData?.callData;
      let externalCallAddress: string = exchangeSelectedData?.callContract;

      if (externalCallData.startsWith('0x')) {
        externalCallData = externalCallData.slice(2);
      }

      if (externalCallAddress.startsWith('0x')) {
        externalCallAddress = externalCallAddress.slice(2);
      }

      let buyTokenContract: string = buyParentToken.contractID;
      if (buyParentToken?.isUnified) {
        const childBuyToken = buyParentToken?.listUnifiedToken?.find(
          (token: any) => token?.networkID === exchangeSelectedData?.networkID
        );
        buyTokenContract = childBuyToken?.contractIDSwap;
      }

      if (buyTokenContract.startsWith('0x')) {
        buyTokenContract = buyTokenContract.slice(2);
      }

      const withdrawAddress: string =
        buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO ? '0000000000000000000000000000000000000000' : remoteAddress;

      const metadata = {
        Data: [
          {
            IncTokenID: exchangeSelectedData?.incTokenID,
            RedepositReceiver: otaReceiver,
            BurningAmount: burnOriginalAmount,
            ExternalNetworkID: exchangeSelectedData?.networkID,
            ExternalCalldata: externalCallData,
            ExternalCallAddress: externalCallAddress,
            ReceiveToken: buyTokenContract,
            WithdrawAddress: withdrawAddress,
          },
        ],
        BurnTokenID: sellToken?.tokenID,
        Type: 348,
      };
      return metadata;
    };
    const getSwapPDexMetadata = ({ otaReceivers }: { otaReceivers: string[] }) => {
      const metadata = {
        TradePath: exchangeSelectedData.poolPairs,
        TokenToSell: sellToken.tokenID,
        SellAmount: burnOriginalAmount,
        TradingFee: feeBurnCombine.amount,
        Receiver: {
          [sellToken.tokenID]: otaReceivers[0],
          [buyToken.tokenID]: otaReceivers[1],
        },
        Type: 285,
        MinAcceptableAmount: `${exchangeSelectedData.amountOutRaw}`,
        FeeToken: isUseTokenFee ? sellToken.tokenID : PRV.id,
        TokenToBuy: buyToken.tokenID,
      };
      return metadata;
    };
    const getUnshieldBTCMetadata = async (newCoin: any) => {
      const metadata = {
        OTAPubKeyStr: newCoin.PublicKey,
        TxRandomStr: newCoin.TxRandom,
        RemoteAddress: remoteAddress,
        TokenID: sellToken.tokenID,
        UnshieldAmount: parseInt(burnOriginalAmount),
        Type: 262,
      };
      return metadata;
    };
    const getUnshieldPRVMetadata = async ({ burnerAddress }: { burnerAddress: string }) => {
      const metadata = {
        BurnerAddress: burnerAddress,
        BurningAmount: parseInt(burnOriginalAmount),
        TokenID: sellToken.tokenID,
        RemoteAddress: remoteAddress,
        Type: buyNetworkName === MAIN_NETWORK_NAME.ETHEREUM ? 274 : 275,
      };
      return metadata;
    };

    const handleUnshieldToken = async () => {
      const { networkFee, id, estimatedBurnAmount, estimatedExpectedAmount, useFast2xFee } = fee;
      if (
        formType === FormTypes.UNSHIELD &&
        sellToken.isUnified &&
        (!estimatedBurnAmount || !estimatedExpectedAmount)
      ) {
        return;
      }
      if (formType === FormTypes.SWAP && (errorMsg || isFetching)) return;
      try {
        const { prvPayments, tokenPayments } = await getTokenAndPrivacyPayments();
        const { otaReceiver, burnerAddress, feeRefundOTA, newCoins } = await getKeySetINC();

        let payload: any;
        let isSignAndSendTransaction = true;
        if (formType === FormTypes.UNSHIELD) {
          /** Case Unshield Decentralized */
          if (sellToken.isBTC) {
            /** Case Unshield BTC */
            const metadata = await getUnshieldBTCMetadata(newCoins);
            isSignAndSendTransaction = true;
            payload = { metadata };
          } else if (sellToken.isPRV) {
            const metadata = await getUnshieldPRVMetadata({ burnerAddress });
            payload = { metadata };
            isSignAndSendTransaction = true;
            /** Case Unshield PEGGING */
          } else if (sellToken.isCentralized) {
            /** Case Unshield Centralized */
            isSignAndSendTransaction = true;
          } else {
            console.log('SANG TEST: ');
            const metadata = getUnshieldDecentralizedMetadata({ otaReceiver, burnerAddress });
            isSignAndSendTransaction = true;
            payload = {
              info: String(id),
              metadata,
            };
          }
        } else if (formType === FormTypes.SWAP) {
          /** Swap PDEX */
          if (exchangeSelectedData.appName === SwapExchange.PDEX) {
            const { otaReceiver: otaReceiver2 } = await getKeySetINC();
            const metadata = getSwapPDexMetadata({ otaReceivers: [otaReceiver, otaReceiver2] });
            isSignAndSendTransaction = true;
            payload = {
              metadata,
            };
          } else {
            /** Swap PApps */
            // Get OTA Receiver
            if (!feeRefundOTA) {
              throw new Error('Cant get OTA receiver');
            }
            const metadata = getSwapPAppMetadata({ otaReceiver });
            isSignAndSendTransaction = false;
            payload = {
              metadata,
            };
          }
        }

        payload = {
          ...payload,
          info: payload?.info || '',
          networkFee,
          prvPayments,
          tokenPayments,
          tokenID: sellToken?.tokenID,
          txType: 7,
          receiverAddress: inputAddress,
          isSignAndSendTransaction,
        };

        console.log('LOGS PAYLOAD 111: ', payload);
        console.log('LOGS PAYLOAD 222: ', { sellToken, buyToken, buyNetworkName, formType, exchangeSelectedData });
        return new Promise(async (resolve, reject) => {
          try {
            const tx = await requestSignTransaction(payload);
            console.log('LOGS PAYLOAD 333: ', { txHash: tx.txHash });
            if (formType === FormTypes.SWAP) {
              if (exchangeSelectedData.appName !== SwapExchange.PDEX) {
                /** Submit tx swap PApps to backend after burned */
                await rpcClient.submitSwapTx({
                  // txHash: tx.txHash,
                  txRaw: tx.rawData,
                  feeRefundOTA,
                });
              }
              if (tx.txHash) {
                setSwapTx({
                  txHash: tx.txHash,
                  incAddress,
                  time: new Date().getTime(),
                  appName: exchangeSelectedData.appName,
                  sellTokenID: sellToken.tokenID,
                  buyTokenID: buyToken.tokenID,
                  sellAmountText: inputAmount,
                  buyAmountText: `${expectedReceiveAmount || 0}`,
                });
              }
            } else if (!sellToken.isBTC) {
              let networkName: NetworkTypePayload = NetworkTypePayload.ETHEREUM;
              if (buyNetworkName === MAIN_NETWORK_NAME.ETHEREUM) {
                networkName = NetworkTypePayload.ETHEREUM;
              } else if (buyNetworkName === MAIN_NETWORK_NAME.BSC) {
                networkName = NetworkTypePayload.BINANCE_SMART_CHAIN;
              } else if (buyNetworkName === MAIN_NETWORK_NAME.POLYGON) {
                networkName = NetworkTypePayload.POLYGON;
              } else if (buyNetworkName === MAIN_NETWORK_NAME.FANTOM) {
                networkName = NetworkTypePayload.FANTOM;
              } else {
                networkName = NetworkTypePayload.CENTRALIZED;
              }
              // Submit tx unshield to backend after burn
              // @ts-ignore
              const unshieldCurrencyType = (
                buyToken.hasChild
                  ? buyToken.listUnifiedToken.find((token: any) => token.networkName === buyNetworkName)
                  : buyToken
              ).currencyType;

              console.log('LOGS PAYLOAD 444: ', { unshieldCurrencyType, isDecentralized, buyNetworkName });

              const submitTxUnshieldResponse = await rpcClient.submitUnshieldTx2({
                network: networkName,
                userFeeLevel: useFast2xFee ? 2 : 1,
                id: id || 0,
                incognitoAmount: String(burnOriginalAmount),
                incognitoTx: tx.txHash,
                paymentAddress: inputAddress,
                privacyTokenAddress: buyToken.tokenID,
                userFeeSelection: isUseTokenFee ? 1 : 2,
                walletAddress: incAddress,
                fee: feeBurnCombine.amount,
                isDecentralized,
                isUseTokenFee,
                centralizedAddress: fee.centralizedAddress,
                tokenID: sellToken.tokenID,
                erc20TokenAddress: buyToken.contractID,
                currencyType: unshieldCurrencyType,
              });
              console.log({ submitTxUnshieldResponse });
            }
            updateMetric().then();
            resolve(tx);
          } catch (e) {
            console.log('HANDLE UNSHIELD WITH ERROR ', e);
            reject(e);
          }
        });
      } catch (e) {
        console.log('HANDLE UNSHIELD WITH ERROR ', e);
      }
    };

    const onSend = async () => {
      if (disabledForm) {
        return batch(() => {
          dispatch(focus(FORM_CONFIGS.formName, FORM_CONFIGS.formAddress));
          dispatch(focus(FORM_CONFIGS.formName, FORM_CONFIGS.sellAmount));
        });
      }
      if (!isIncognitoInstalled()) {
        return requestIncognitoAccount();
      }

      setModal({
        isTransparent: false,
        rightHeader: undefined,
        title: '',
        closable: true,
        data: <LoadingTransaction pendingText="Waiting For Confirmation" />,
      });
      try {
        const resolve: any = await handleUnshieldToken();
        if (!resolve && !resolve?.txHash) return;
        clearAllModal();
        dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.sellAmount, ''));
        dispatch(untouch(FORM_CONFIGS.formName, FORM_CONFIGS.sellAmount));
        setModal({
          isTransparent: false,
          rightHeader: undefined,
          title: '',
          closable: true,
          data: <TransactionSubmittedContent chainId={PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO} hash={resolve.txHash} />,
        });
      } catch (e) {
        dispatch(actionSetErrorMsg(typeof e === 'string' ? e : ''));
        clearAllModal();
      } finally {
        if (formType === FormTypes.UNSHIELD) {
          setTimeout(() => {
            dispatch(actionEstimateFee());
          }, 300);
        }
      }
    };
    return <WrappedComponent {...{ ...props, onSend }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceSend';
  return FormUnshieldComp;
};

export default enhanceSend;
