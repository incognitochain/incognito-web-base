/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import icClock from 'assets/svg/ic-clock.svg';
import BigNumber from 'bignumber.js';
import { getIncognitoInject, useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { useModal } from 'components/Modal';
import ModalTokens from 'components/Modal/Modal.tokens';
import { Convert, POpenseaBuyFee, POpenseaNft } from 'models/model/POpenseaNFT';
import PToken from 'models/model/pTokenModel';
import { getTokenPayments } from 'pages/Swap/features/FormUnshield/FormUnshield.utils';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import rpcClient from 'services/rpcClient';
import { postEstimateFee } from 'services/rpcPOpensea';
import { networkFeePOpenseaSelectors } from 'state/pOpensea';
import { unshieldableTokens } from 'state/token';
import convert from 'utils/convert';
import format from 'utils/format';

import { ArrowDown, TextInputStyled } from '../POpenseaNFTDetail.styled';

interface POpenseaNFTDetailBuyProps {
  selectedNFT: POpenseaNft;
}
const POpenseaNFTDetailBuy = (props: POpenseaNFTDetailBuyProps) => {
  const { selectedNFT } = props;
  const tokens = useSelector(unshieldableTokens).filter((token) => token.isMainETH);

  const networkFee = useSelector(networkFeePOpenseaSelectors);
  const { requestSignTransaction } = useIncognitoWallet();

  const seaportSellOrder =
    selectedNFT.seaportSellOrders && selectedNFT.seaportSellOrders.length > 0
      ? selectedNFT.seaportSellOrders[0]
      : undefined;
  const assetContract = selectedNFT.assetContract;

  const { setModal } = useModal();

  const [reciptientAddress, setReciptientAddress] = useState('');
  const [selectedToken, setSelectedToken] = useState<PToken | undefined>();
  const [buyFee, setBuyFee] = useState<POpenseaBuyFee | undefined>();

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
      decimals: selectedToken?.decimals || 18,
    });
    return convert.toOriginalAmount({
      humanAmount: new BigNumber(burnHumanAmount).toString(),
      decimals: selectedToken?.pDecimals || 0,
      round: true,
    });
  };

  const getBurnPayments = async (): Promise<any> => {
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
  };

  const getMetadata = async (): Promise<any> => {
    if (buyFee && selectedToken && seaportSellOrder) {
      const incognito = getIncognitoInject();

      // Get OTA Receiver and Burner address
      const shardID = buyFee.fee.feeAddressShardID;
      const { result }: { result: any } = await incognito.request({
        method: 'wallet_requestAccounts',
        params: { senderShardID: shardID },
      });
      const otaReceiver = result?.otaReceiver;

      // get child token with burn network
      const childToken = selectedToken.isUnified
        ? selectedToken?.listUnifiedToken.find((token) => token.networkID === 1)
        : selectedToken;
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
    }
  };

  const onClickBuy = async () => {
    const { metadata, feeRefundOTA } = await getMetadata();
    const { prvPayments, tokenPayments } = await getBurnPayments();

    const payload = {
      metadata,
      info: '',
      networkFee,
      prvPayments,
      tokenPayments,
      tokenID: selectedToken?.tokenID,
      txType: 7,
      receiverAddress: reciptientAddress,
      isSignAndSendTransaction: false,
    };

    console.log('LOGS PAYLOAD: ', payload);
    try {
      const tx = await requestSignTransaction(payload);
      console.log('LOGS TX: ', { tx });

      await rpcClient.submitSwapTx({
        txRaw: tx.rawData,
        feeRefundOTA,
      });

      const buyTx = {
        txHash: tx.txHash,
        incAddress: '',
        time: new Date().getTime(),
        appName: 'pOpensea',
        sellTokenID: selectedToken?.tokenID,
        buyTokenID: selectedToken?.tokenID,
        sellAmountText: '',
        buyAmountText: '',
      };

      console.log('LOGS RESULT: ', buyTx);
    } catch (e) {
      console.log('BUY NFT WITH ERROR: ', e);
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
          {format.amountVer2({
            originalAmount: new BigNumber(seaportSellOrder.currentPrice || 0).toNumber(),
            decimals: selectedToken?.decimals || 18,
          })}{' '}
          {selectedToken?.symbol}
        </p>
      </div>
    );

  const renderFee = () =>
    buyFee && (
      <p className="current-price">
        {format.amountVer2({
          originalAmount: new BigNumber(buyFee?.fee.feeAmount || 0).toNumber(),
          decimals: selectedToken?.pDecimals || 18,
        })}{' '}
        {selectedToken?.symbol} ={' '}
        {format.amountVer2({
          originalAmount: buyFee.fee.feeInUSD,
          decimals: 0,
        })}{' '}
        $
      </p>
    );

  return (
    <div className="price-container">
      <div className="view-content">
        <img src={icClock} />
        <p className="time-sale">{`Sale ends ${seaportSellOrder ? seaportSellOrder.closingDate : ''}`}</p>
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
        </div>
        <button className="btn-buy" onClick={onClickBuy}>
          <p className="text-buy">Buy</p>
        </button>
      </div>
    </div>
  );
};

export default memo(POpenseaNFTDetailBuy);
