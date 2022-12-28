/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import icClock from 'assets/svg/ic-clock.svg';
import BigNumber from 'bignumber.js';
import { getIncognitoInject, useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { TransactionSubmittedContent } from 'components/Core/TransactionConfirmationModal';
import { useModal } from 'components/Modal';
import ModalTokens from 'components/Modal/Modal.tokens';
import LoadingTransaction from 'components/Modal/Modal.transaction';
import { BIG_COINS, PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import { Convert, POpenseaBuyFee, POpenseaNft } from 'models/model/POpenseaNFT';
import PToken from 'models/model/pTokenModel';
import moment from 'moment';
import { actionSetErrorMsg } from 'pages/Swap/features/FormUnshield/FormUnshield.actions';
import { getTokenPayments } from 'pages/Swap/features/FormUnshield/FormUnshield.utils';
import { setSwapTx } from 'pages/Swap/Swap.storage';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import rpcPOpensea, { postEstimateFee } from 'services/rpcPOpensea';
import { networkFeePOpenseaSelectors } from 'state/pOpensea';
import { unshieldableTokens } from 'state/token';
import convert from 'utils/convert';
import format from 'utils/format';

import { ArrowDown, TextInputStyled } from '../POpenseaNFTDetail.styled';

interface POpenseaNFTDetailBuyProps {
  selectedNFT: POpenseaNft;
  onEstimateFee?: () => void;
  onClickBuy?: () => void;
}

const POpenseaNFTDetailBuy = (props: POpenseaNFTDetailBuyProps) => {
  const { selectedNFT } = props;

  const dispatch = useDispatch();
  const { setModal, clearAllModal } = useModal();
  const { requestSignTransaction, isIncognitoInstalled, requestIncognitoAccount } = useIncognitoWallet();

  const [reciptientAddress, setReciptientAddress] = useState('');
  const [selectedToken, setSelectedToken] = useState<PToken | undefined>();
  const [buyFee, setBuyFee] = useState<POpenseaBuyFee | undefined>();

  const networkFee = useSelector(networkFeePOpenseaSelectors);
  const tokens = useSelector(unshieldableTokens).filter(
    (token) => token.isMainETH || token.tokenID === BIG_COINS.ETH_UNIFIED.tokenID
  );

  const seaportSellOrder =
    selectedNFT.seaportSellOrders && selectedNFT.seaportSellOrders.length > 0
      ? selectedNFT.seaportSellOrders[0]
      : undefined;
  const assetContract = selectedNFT.assetContract;

  const childToken =
    selectedToken && selectedToken.isUnified
      ? selectedToken?.listUnifiedToken.find((token) => token.networkID === 1)
      : undefined;

  const buyPriceAmount = seaportSellOrder
    ? format.amountVer2({
        originalAmount: new BigNumber(seaportSellOrder.currentPrice || 0).toNumber(),
        decimals: childToken?.decimals || 18,
      })
    : '0';

  useEffect(() => {
    tokens.length > 0 && selectedToken === undefined && setSelectedToken(tokens[0]);
  }, [tokens]);

  useEffect(() => {
    if (reciptientAddress && selectedToken) {
      estimateFee();
    }
  }, [selectedToken, reciptientAddress]);

  const estimateFee = async () => {
    const tokenId = selectedNFT.tokenId;
    if (
      reciptientAddress &&
      selectedToken &&
      selectedNFT &&
      tokenId &&
      assetContract &&
      assetContract.address &&
      seaportSellOrder
    ) {
      const contract = assetContract.address;
      try {
        const res = await postEstimateFee(
          contract,
          tokenId,
          selectedToken.tokenID,
          seaportSellOrder.currentPrice,
          reciptientAddress
        );
        if (res && res.Calldata) {
          const fee = Convert.toPOpenseaBuyFee(res);
          setBuyFee(fee);
        }
      } catch (error) {}
    }
  };

  const getBurnOriginalAmount = () => {
    const burnHumanAmount = convert.toHumanAmount({
      originalAmount: new BigNumber(seaportSellOrder?.currentPrice || 0).toNumber(),
      decimals: childToken?.decimals || 18,
    });
    return convert.toOriginalAmount({
      humanAmount: new BigNumber(burnHumanAmount).toString(),
      decimals: childToken?.pDecimals || 0,
      round: true,
    });
  };

  const getBurnPayments = async (): Promise<any> => {
    try {
      let prvPayments: any[] = [];
      let tokenPayments: any[] = [];

      tokenPayments = await getTokenPayments({
        data: [
          {
            paymentAddress: buyFee?.fee?.feeAddress,
            amount: buyFee?.fee.feeAmount || 0,
          },
        ],
        burnAmount: getBurnOriginalAmount(),
      });
      return {
        prvPayments,
        tokenPayments,
      };
    } catch (error) {
      throw error;
    }
  };

  const getMetadata = async (): Promise<any> => {
    if (buyFee && selectedToken && seaportSellOrder) {
      try {
        const incognito = getIncognitoInject();

        // Get OTA Receiver and Burner address
        const shardID = buyFee.fee.feeAddressShardID;
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
              BurningAmount: getBurnOriginalAmount(),
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

  const onClickBuy = async () => {
    if (!isIncognitoInstalled()) {
      return requestIncognitoAccount();
    }
    if (buyFee && selectedToken) {
      setModal({
        isTransparent: false,
        closable: true,
        data: <LoadingTransaction pendingText="Waiting For Confirmation" />,
      });
      const { metadata, feeRefundOTA } = await getMetadata();
      const { prvPayments, tokenPayments } = await getBurnPayments();

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
        const tx = await requestSignTransaction(payload);
        await rpcPOpensea.submitBuyTx({
          txRaw: tx.rawData,
          feeRefundOTA,
        });

        if (tx.txHash) {
          setSwapTx({
            txHash: tx.txHash,
            time: new Date().getTime(),
            appName: 'opensea',
            buyTokenID: selectedToken.tokenID,
            buyAmountText: buyPriceAmount,
          });
        }

        clearAllModal();
        setModal({
          isTransparent: false,
          closable: true,
          data: <TransactionSubmittedContent chainId={PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO} hash={tx.txHash} />,
        });
      } catch (e) {
        dispatch(actionSetErrorMsg(typeof e === 'string' ? e : ''));
        clearAllModal();
      }
    }
  };

  const onSelectToken = ({ token }: { token: PToken }) => {
    setSelectedToken(token);
  };

  const showTokensList = () => {
    setModal({
      closable: true,
      data: <ModalTokens tokens={tokens} onSelect={onSelectToken} showNetwork={true} />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Select a Token',
      isSearchTokenModal: true,
    });
  };

  const onChangeReciptientAddress = (e: any) => {
    setReciptientAddress(e.target.value);
  };

  const renderSelectTokenList = () => (
    <div className="select-tokens-list" onClick={showTokensList}>
      {selectedToken && <img className="selected-token-icon" src={selectedToken.iconUrl} />}
      {selectedToken && <p>{selectedToken.symbol}</p>}
      <ArrowDown />
    </div>
  );

  const renderCurrentPrice = () =>
    seaportSellOrder && (
      <div className="price">
        <p className="price-coin">
          {buyPriceAmount} {selectedToken?.symbol}
        </p>
      </div>
    );

  const renderFee = () =>
    buyFee && (
      <p className="current-price">
        {format.amountVer2({
          originalAmount: new BigNumber(buyFee?.fee.feeAmount || 0).toNumber(),
          decimals: childToken?.pDecimals || 18,
        })}{' '}
        {selectedToken?.symbol} ={' '}
        {format.amountVer2({
          originalAmount: buyFee.fee.feeInUSD,
          decimals: 0,
        })}{' '}
        $
      </p>
    );

  // const renderError = () => {
  //   return <p>Your balance is insufficient.</p>;
  // };

  return (
    <React.Fragment>
      {seaportSellOrder && seaportSellOrder.currentPrice && (
        <div className="price-container">
          <div className="view-content">
            <img src={icClock} />
            <p className="time-sale">{`Sale ends ${
              seaportSellOrder ? moment(seaportSellOrder.closingDate).format('MMMM DD, YYYY [at] hh:mm AZ') : ''
            }`}</p>
          </div>
          <div className="price-indicator" />
          <div className="buy-container">
            <TextInputStyled
              placeholder={'Reciptient Address'}
              type={'text'}
              onChange={onChangeReciptientAddress}
              value={reciptientAddress}
              autoFocus={false}
            />
            {renderSelectTokenList()}
          </div>
          <div className="price-indicator" />
          <div className="buy-container">
            <div className="price-view">
              <p className="current-price">Current price</p>
              {renderCurrentPrice()}
              {renderFee()}
              {/* {renderError()} */}
            </div>

            <button className="btn-buy" onClick={onClickBuy}>
              <p className="text-buy">Buy</p>
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default memo(POpenseaNFTDetailBuy);
