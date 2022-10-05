import { BigNumber } from 'bignumber.js';
import { getIncognitoInject, useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { TransactionSubmittedContent } from 'components/Core/TransactionConfirmationModal';
import { useModal } from 'components/Modal';
import LoadingTransaction from 'components/Modal/Modal.transaction';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
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
import { FormTypes, NetworkTypePayload } from './FormUnshield.types';
import { getBurningMetaDataTypeForUnshield, getPrvPayments, getTokenPayments } from './FormUnshield.utils';

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
      return {
        otaReceiver,
        burnerAddress,
        feeRefundOTA,
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
        prvPayments = await getPrvPayments([
          {
            paymentAddress: feeBurnCombine.address,
            amount: feeBurnCombine.amount,
          },
        ]);
        tokenPayments = await getTokenPayments({
          data: [],
          burnAmount: parseInt(burnOriginalAmount),
        });
      }
      return {
        prvPayments,
        tokenPayments,
      };
    };
    const getTokenAndPrivacyPayments = async () => {
      let prvPayments: any[] = [];
      let tokenPayments: any[] = [];

      if (formType === FormTypes.UNSHIELD && sellToken.isCentralized) {
        const { prvPayments: _prvPayments, tokenPayments: _tokenPayments } = await getPaymentsCentralized();
        prvPayments = _prvPayments;
        tokenPayments = _tokenPayments;
      } else {
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
    const getUnshieldMetadata = ({ otaReceiver, burnerAddress }: { otaReceiver: string; burnerAddress: string }) => {
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
    const getSwapMetadata = ({ otaReceiver }: { otaReceiver: string }) => {
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
        const { otaReceiver, burnerAddress, feeRefundOTA } = await getKeySetINC();

        let payload: any;
        if (formType === FormTypes.UNSHIELD) {
          // Case Decentralized
          if (sellToken.isDecentralized) {
            const metadata = getUnshieldMetadata({ otaReceiver, burnerAddress });
            payload = {
              info: String(id),
              isSignAndSendTransaction: true,
              metadata,
            };
          } else if (sellToken.isCentralized) {
            payload = {
              info: String(id),
              isSignAndSendTransaction: true,
            };
          }
        } else {
          const metadata = getSwapMetadata({ otaReceiver });
          payload = {
            info: '',
            isSignAndSendTransaction: false,
            metadata,
          };
        }

        payload = {
          ...payload,
          networkFee,
          prvPayments,
          tokenPayments,
          tokenID: sellToken?.tokenID,
          txType: 7,
          receiverAddress: remoteAddress,
        };

        return new Promise(async (resolve, reject) => {
          try {
            // Get OTA Receiver
            if (formType === FormTypes.SWAP && !feeRefundOTA) {
              reject('Cant get OTA receiver');
            }
            const tx = await requestSignTransaction(payload);

            // Submit tx swap to backend after burned;
            if (formType === FormTypes.SWAP) {
              const submitTxResult: any = await rpcClient.submitSwapTx({
                // txHash: tx.txHash,
                txRaw: tx.rawData,
                feeRefundOTA,
              });
              setSwapTx({
                txHash: tx.txHash,
                incAddress,
                time: new Date().getTime(),
              });
              console.log({ submitTxResult });
            } else {
              let networkName: NetworkTypePayload = NetworkTypePayload.ETHEREUM;
              if (buyNetworkName === MAIN_NETWORK_NAME.ETHEREUM) {
                networkName = NetworkTypePayload.ETHEREUM;
              } else if (buyNetworkName === MAIN_NETWORK_NAME.BSC) {
                networkName = NetworkTypePayload.BINANCE_SMART_CHAIN;
              } else if (buyNetworkName === MAIN_NETWORK_NAME.POLYGON) {
                networkName = NetworkTypePayload.POLYGON;
              } else if (buyNetworkName === MAIN_NETWORK_NAME.FANTOM) {
                networkName = NetworkTypePayload.FANTOM;
              }
              // Submit tx unshield to backend after burn
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
              });
              console.log({ submitTxUnshieldResponse });
            }
            updateMetric().then();
            resolve(tx);
          } catch (e) {
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
