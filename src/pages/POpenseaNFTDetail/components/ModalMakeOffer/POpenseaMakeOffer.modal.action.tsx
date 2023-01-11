import { Trans } from '@lingui/macro';
import { RowBetween } from 'components/Core/Row';
import { TransactionSubmittedContent } from 'components/Core/TransactionConfirmationModal';
import LoadingTransaction from 'components/Modal/Modal.transaction';
import { PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import { Convert } from 'models/model/POpenseaNFT';
import { POpenseaNft, POpenseaOfferFee } from 'models/model/POpenseaNFT';
import PToken from 'models/model/pTokenModel';
import { setLocalPOpenseaOffers } from 'pages/POpenseaHistory/components/OffersMade/OffersMade.storage';
import { actionSetErrorMsg } from 'pages/Swap/features/FormUnshield/FormUnshield.actions';
import { getTokenPayments } from 'pages/Swap/features/FormUnshield/FormUnshield.utils';
import React from 'react';
import { Text } from 'rebass';
import rpcPOpensea from 'services/rpcPOpensea';
import convert from 'utils/convert';

import { CloseIcon, ViewHistory } from './POpenseaMakeOffer.modal.styled';

const getIncognitoInject = () => window.incognito;

interface IComponent {
  setLoadingFee: (data: boolean) => void;
  setModal: (data: any) => void;
  clearAllModal: () => void;
  setOfferFee: (data?: POpenseaOfferFee) => void;
  setOverlayContent: (data: React.ReactNode) => void;
}
export interface IPOpenseaMakeOfferAction {
  estimateOfferFee: (
    contract: string,
    endtime: number,
    selectedToken: PToken,
    price?: string,
    reciptientAddress?: string | undefined,
    selectedNFT?: POpenseaNft | undefined
  ) => void;
  offerNFT: (
    requestSignTransaction: (payload: any) => any,
    reciptientAddress: string,
    networkFee: number,
    offerTime: number,
    contract: string,
    onViewHistory: () => void,
    selectedNFT?: POpenseaNft,
    price?: string,
    selectedToken?: PToken,
    childToken?: PToken,
    offerFee?: POpenseaOfferFee,
    floorPrice?: number
  ) => void;
}

export class POpenseaMakeOfferAction implements IPOpenseaMakeOfferAction {
  protected component: IComponent;
  protected dispatch: any;

  incognito = getIncognitoInject();
  resultSignature: any = {}; // { signature; signerAddress; }
  resultAccount: any = {}; // { otaReceiver; otaReceiverWithCfg; }
  offer = ''; // From call api generateOffer

  constructor(props: { component: IComponent; dispatch: any }) {
    this.component = props.component;
    this.dispatch = props.dispatch;
  }

  estimateOfferFee = async (
    contract: string,
    endtime: number,
    selectedToken: PToken,
    price?: string,
    reciptientAddress?: string | undefined,
    selectedNFT?: POpenseaNft | undefined
  ) => {
    if (selectedNFT && selectedNFT.tokenId && reciptientAddress && price) {
      this.component.setLoadingFee(true);
      this.component.setOfferFee(undefined);
      try {
        const res = await rpcPOpensea.generateOffer(
          `${convert.toOriginalAmount({
            humanAmount: price,
            decimals: selectedToken?.pDecimals || 9,
            round: true,
          })}`,
          reciptientAddress,
          selectedNFT.tokenId,
          contract,
          endtime
        );

        if (res && res.offer_sign_data && res.offer) {
          // Get Signature and Signer address
          const { result: resultSignature }: { result: any } = await this.incognito.request({
            method: 'wallet_make_signature',
            params: {
              signData: res.offer_sign_data,
              signerAddress: null,
            },
          });
          this.resultSignature = resultSignature;
          this.offer = res.offer;

          // Get Account
          const { result: resultAccount }: { result: any } = await this.incognito.request({
            method: 'wallet_requestAccounts',
            params: { senderShardID: 0 },
          });
          this.resultAccount = resultAccount;

          // Estimate Fee
          const data = await rpcPOpensea.estimateOfferFee(
            res.offer,
            resultSignature.signature,
            selectedToken.tokenID,
            resultAccount.otaReceiver
          );

          if (data && data.Calldata) {
            const fee = Convert.toPOpenseaBuyFee(data);
            this.component.setOfferFee(fee);
          }
        }
      } catch (error) {
        this.dispatch(actionSetErrorMsg(typeof error === 'string' ? error : 'Something went wrong!'));
        this.component.setOfferFee(undefined);
      } finally {
        this.component.setLoadingFee(false);
      }
    }
  };

  offerNFT = async (
    requestSignTransaction: (payload: any) => any,
    reciptientAddress: string,
    networkFee: number,
    offerTime: number,
    contract: string,
    onViewHistory: () => void,
    selectedNFT?: POpenseaNft,
    price?: string,
    selectedToken?: PToken,
    childToken?: PToken,
    offerFee?: POpenseaOfferFee,
    floorPrice?: number
  ) => {
    if (selectedToken && offerFee && price && selectedNFT) {
      this.component.setOverlayContent(<LoadingTransaction pendingText="Waiting For Confirmation" />);
      try {
        const burnOriginalAmount = convert.toOriginalAmount({
          humanAmount: price,
          decimals: selectedToken?.pDecimals || 9,
          round: true,
        });

        const resultMetadata = await this.getMetadata(
          reciptientAddress,
          offerFee,
          selectedToken,
          burnOriginalAmount,
          childToken
        );

        const { prvPayments, tokenPayments } = await this.getBurnPayments(offerFee, burnOriginalAmount);

        const payload = {
          metadata: resultMetadata.metadata,
          info: '',
          networkFee,
          prvPayments,
          tokenPayments,
          tokenID: selectedToken.tokenID,
          txType: 7,
          receiverAddress: reciptientAddress,
          isSignAndSendTransaction: false,
        };

        const tx = await requestSignTransaction(payload);

        await rpcPOpensea.submitOfferTx({
          txRaw: tx.rawData,
          feeRefundOTA: resultMetadata.feeRefundOTA,
          offer: this.offer,
        });

        if (tx.txHash) {
          //Save local history offers
          setLocalPOpenseaOffers({
            txHash: tx.txHash,
            signerAddress: this.resultSignature.signerAddress,
            createTime: new Date().getTime(),
            appName: 'opensea',
            offerTokenID: selectedToken.tokenID,
            offerAmountText: `${price} ${selectedToken.symbol}`,
            offerTime,
            offerFloorPrice: `${floorPrice} ${selectedToken.symbol}`,
            nftTokenId: selectedNFT.tokenId || '',
            nftContract: contract,
            nftName: selectedNFT.name || '',
            nftImg: selectedNFT.getImageUrl() || '',
            nftAnimationUrl: selectedNFT.animationUrl,
          });

          this.component.setOverlayContent(
            <TransactionSubmittedContent
              chainId={PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO}
              hash={tx.txHash}
              closeComponent={() => (
                <RowBetween>
                  <div />
                  <CloseIcon
                    onClick={() => {
                      this.component.clearAllModal();
                      this.component.setOverlayContent(null);
                    }}
                  />
                </RowBetween>
              )}
              extraComponent={() => (
                <ViewHistory
                  onClick={() => {
                    this.component.clearAllModal();
                    this.component.setOverlayContent(null);
                    onViewHistory();
                  }}
                >
                  <Text fontWeight={500} fontSize={14} color={'#1C55B8'}>
                    <Trans>View history</Trans>
                  </Text>
                </ViewHistory>
              )}
            />
          );
        }
      } catch (e) {
        this.component.setOverlayContent(null);
        this.dispatch(actionSetErrorMsg(typeof e === 'string' ? e : 'Something went wrong!'));
      }
    }
  };

  private getBurnPayments = async (offerFee: POpenseaOfferFee, burnOriginalAmount?: number): Promise<any> => {
    try {
      let prvPayments: any[] = [];
      let tokenPayments: any[] = [];

      tokenPayments = await getTokenPayments({
        data: [
          {
            paymentAddress: offerFee.fee?.feeAddress,
            amount: offerFee.getFeeAmout(),
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
    offerFee: POpenseaOfferFee,
    selectedToken: PToken,
    burnOriginalAmount?: number,
    childToken?: PToken
  ): Promise<any> => {
    if (offerFee && selectedToken && this.resultAccount && this.resultAccount.otaReceiver) {
      try {
        // Get OTA Receiver and Burner address
        const otaReceiver = this.resultAccount.otaReceiver;
        const feeRefundOTA = this.resultAccount.otaReceiverWithCfg;

        // get child token with burn network
        const incTokenID = childToken?.tokenID;

        let callContract = offerFee.callContract;
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
              ExternalCalldata: offerFee.calldata,
              ExternalCallAddress: callContract,
              ReceiveToken: offerFee.receiveToken,
              WithdrawAddress: withdrawAddress,
            },
          ],
          BurnTokenID: selectedToken.tokenID,
          Type: 348,
        };
        return {
          metadata,
          feeRefundOTA,
        };
      } catch (error) {
        throw error;
      }
    }
  };
}
