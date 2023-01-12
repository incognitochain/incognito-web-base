import { getIncognitoInject } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { TransactionSubmittedContent } from 'components/Core/TransactionConfirmationModal';
import LoadingTransaction from 'components/Modal/Modal.transaction';
import { PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import { Convert, POpenseaBuyFee, POpenseaNft, SeaportSellOrders } from 'models/model/POpenseaNFT';
import PToken from 'models/model/pTokenModel';
import { actionSetErrorMsg } from 'pages/Swap/features/FormUnshield/FormUnshield.actions';
import { getTokenPayments } from 'pages/Swap/features/FormUnshield/FormUnshield.utils';
import { setSwapTx } from 'pages/Swap/Swap.storage';
import rpcPOpensea, { postEstimateFee } from 'services/rpcPOpensea';

interface IComponent {
  setBuyFee: (fee: POpenseaBuyFee | undefined) => void;
  setLoadingFee: (data: boolean) => void;
  setModal: (data: any) => void;
  clearAllModal: () => void;
  requestSignTransaction: (payload: any) => any;
}
export interface IPOpenseaNFTDetailBuyAction {
  estimateFee: (selectedToken: PToken, reciptientAddress?: string, selectedNFT?: POpenseaNft) => void;
  buyNFT: (
    reciptientAddress: string,
    networkFee: number,
    buyPriceFormatAmount: string,
    selectedToken?: PToken,
    childToken?: PToken,
    buyFee?: POpenseaBuyFee,
    seaportSellOrder?: SeaportSellOrders
  ) => void;
}

export class POpenseaNFTDetailBuyAction implements IPOpenseaNFTDetailBuyAction {
  protected component: IComponent;
  protected dispatch: any;

  constructor(props: { component: IComponent; dispatch: any }) {
    this.component = props.component;
    this.dispatch = props.dispatch;
  }

  estimateFee = async (
    selectedToken: PToken,
    reciptientAddress?: string | undefined,
    selectedNFT?: POpenseaNft | undefined
  ) => {
    if (selectedNFT) {
      const seaportSellOrder = selectedNFT.getSeaportSellOrder();
      const assetContract = selectedNFT.assetContract;
      const tokenId = selectedNFT.tokenId;

      if (reciptientAddress && seaportSellOrder && assetContract && assetContract.address && tokenId) {
        this.component.setLoadingFee(true);
        const contract = assetContract.address;
        try {
          const res = await postEstimateFee(
            contract,
            tokenId,
            selectedToken.tokenID,
            seaportSellOrder.getCurrentPrice(),
            reciptientAddress
          );
          if (res && res.Calldata) {
            const fee = Convert.toPOpenseaBuyFee(res);
            this.component.setBuyFee(fee);
          }
        } catch (error) {
          console.log('ESTIMATE FEE ERROR: ', error);
        } finally {
          this.component.setLoadingFee(false);
        }
      }
    }
  };

  buyNFT = async (
    reciptientAddress: string,
    networkFee: number,
    buyPriceFormatAmount: string,
    selectedToken?: PToken,
    childToken?: PToken,
    buyFee?: POpenseaBuyFee,
    seaportSellOrder?: SeaportSellOrders
  ) => {
    if (selectedToken && buyFee && seaportSellOrder) {
      const burnOriginalAmount = seaportSellOrder.getBurnOriginalAmount(
        childToken?.decimals || 18,
        childToken?.pDecimals || 0
      );

      this.component.setModal({
        isTransparent: false,
        closable: false,
        data: <LoadingTransaction pendingText="Waiting For Confirmation" />,
      });
      const { metadata, feeRefundOTA } = await this.getMetadata(
        reciptientAddress,
        buyFee,
        selectedToken,
        seaportSellOrder,
        burnOriginalAmount,
        childToken
      );
      const { prvPayments, tokenPayments } = await this.getBurnPayments(buyFee, burnOriginalAmount);

      const payload = {
        metadata,
        info: '',
        networkFee,
        prvPayments,
        tokenPayments,
        tokenID: selectedToken.tokenID,
        txType: 7,
        receiverAddress: reciptientAddress,
        isSignAndSendTransaction: false,
      };

      try {
        const tx = await this.component.requestSignTransaction(payload);
        await rpcPOpensea.submitBuyTx({
          txRaw: tx.rawData,
          feeRefundOTA,
        });

        if (tx.txHash) {
          //Save local history TX
          setSwapTx({
            interPAppName: '',
            interPAppNetwork: '',
            txHash: tx.txHash,
            time: new Date().getTime(),
            appName: 'opensea',
            buyTokenID: selectedToken.tokenID,
            buyAmountText: buyPriceFormatAmount,
          });
        }

        this.component.clearAllModal();
        this.component.setModal({
          isTransparent: false,
          closable: true,
          data: <TransactionSubmittedContent chainId={PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO} hash={tx.txHash} />,
        });
      } catch (e) {
        this.dispatch(actionSetErrorMsg(typeof e === 'string' ? e : ''));
        this.component.clearAllModal();
      }
    }
  };

  private getBurnPayments = async (buyFee: POpenseaBuyFee, burnOriginalAmount?: number): Promise<any> => {
    try {
      let prvPayments: any[] = [];
      let tokenPayments: any[] = [];

      tokenPayments = await getTokenPayments({
        data: [
          {
            paymentAddress: buyFee.fee?.feeAddress,
            amount: buyFee.getFeeAmout(),
          },
        ],
        burnAmount: burnOriginalAmount,
      });
      return {
        prvPayments,
        tokenPayments,
      };
    } catch (error) {
      throw error;
    }
  };

  private getMetadata = async (
    reciptientAddress: string,
    buyFee: POpenseaBuyFee,
    selectedToken: PToken,
    seaportSellOrder: SeaportSellOrders,
    burnOriginalAmount?: number,
    childToken?: PToken
  ): Promise<any> => {
    if (buyFee && selectedToken && seaportSellOrder) {
      try {
        const incognito = getIncognitoInject();

        // Get OTA Receiver and Burner address
        const shardID = buyFee.getFeeAddressShardID();
        const { result }: { result: any } = await incognito.request({
          method: 'wallet_requestAccounts',
          params: { senderShardID: shardID },
        });
        const otaReceiver = result?.otaReceiver;

        // get child token with burn network
        const incTokenID = childToken?.tokenID;

        let callContract = buyFee.callContract;
        if (callContract.startsWith('0x')) {
          callContract = callContract.slice(2);
        }

        let withdrawAddress = reciptientAddress;
        if (withdrawAddress.startsWith('0x')) {
          withdrawAddress = withdrawAddress.slice(2);
        }

        const metadata = {
          Data: [
            {
              IncTokenID: incTokenID,
              RedepositReceiver: otaReceiver,
              BurningAmount: burnOriginalAmount,
              ExternalNetworkID: 1,
              ExternalCalldata: buyFee.calldata,
              ExternalCallAddress: callContract,
              ReceiveToken: buyFee.receiveToken,
              WithdrawAddress: withdrawAddress,
            },
          ],
          BurnTokenID: selectedToken.tokenID,
          Type: 348,
        };
        return {
          metadata,
          feeRefundOTA: result.otaReceiverWithCfg,
        };
      } catch (error) {
        throw error;
      }
    }
  };
}
