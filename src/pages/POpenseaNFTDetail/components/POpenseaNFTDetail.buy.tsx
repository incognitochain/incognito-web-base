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
import { actionSetErrorMsg } from 'pages/Swap/features/FormUnshield/FormUnshield.actions';
import { getTokenPayments } from 'pages/Swap/features/FormUnshield/FormUnshield.utils';
import { setSwapTx } from 'pages/Swap/Swap.storage';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';
import rpcPOpensea, { postEstimateFee } from 'services/rpcPOpensea';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import { networkFeePOpenseaSelectors } from 'state/pOpensea';
import { getPrivacyByTokenIdentifySelectors, unshieldableTokens } from 'state/token';

import store from '../../../state';
import { ArrowDown } from '../POpenseaNFTDetail.styled';
import ReciptientAddress, { FIELD_NAME, FORM_NAME } from './POpenseaNFTDetail.buy.form';

interface POpenseaNFTDetailBuyProps {
  selectedNFT: POpenseaNft;
}

const POpenseaNFTDetailBuy = (props: POpenseaNFTDetailBuyProps) => {
  const { selectedNFT } = props;

  const dispatch = useDispatch();
  const { setModal, clearAllModal } = useModal();
  const { requestSignTransaction, isIncognitoInstalled, requestIncognitoAccount, showPopup } = useIncognitoWallet();

  const [selectedToken, setSelectedToken] = useState<PToken | undefined>();
  const [buyFee, setBuyFee] = useState<POpenseaBuyFee | undefined>();

  const incAccount = useSelector(incognitoWalletAccountSelector);
  const networkFee = useSelector(networkFeePOpenseaSelectors);
  const tokens = useSelector(unshieldableTokens).filter(
    (token) => token.isMainETH || token.tokenID === BIG_COINS.ETH_UNIFIED.tokenID
  );
  const selectedTokenPrivacy = useSelector(getPrivacyByTokenIdentifySelectors)(
    selectedToken ? selectedToken.identify : ''
  );

  const formSelector = formValueSelector(FORM_NAME);
  const isValidReciptientAddress = isValid(FORM_NAME)(store.getState());
  const reciptientAddress = formSelector(store.getState(), FIELD_NAME);

  const seaportSellOrder = selectedNFT.getSeaportSellOrder();
  const assetContract = selectedNFT.assetContract;

  const childToken =
    selectedToken && selectedToken.isUnified
      ? selectedToken?.listUnifiedToken.find((token) => token.networkID === 1)
      : undefined;

  const buyPriceFormatAmount = seaportSellOrder
    ? seaportSellOrder.getPricingFormatAmount(childToken?.decimals || 18)
    : '0';
  const buyFeeFormatAmount = buyFee ? buyFee.getFeeFormatAmount(childToken?.pDecimals || 9) : '0';
  const totalBuyAmount = new BigNumber(buyPriceFormatAmount).toNumber() + new BigNumber(buyFeeFormatAmount).toNumber();

  const burnOriginalAmount = seaportSellOrder
    ? seaportSellOrder.getBurnOriginalAmount(childToken?.decimals || 18, childToken?.pDecimals || 0)
    : undefined;

  const userBalanceFormatedText = selectedTokenPrivacy
    ? `${selectedTokenPrivacy.formatAmount || 0} ${selectedTokenPrivacy.symbol || ''}`
    : '';

  const isCanBuy =
    selectedTokenPrivacy &&
    selectedTokenPrivacy.formatAmount &&
    new BigNumber(selectedTokenPrivacy.formatAmount).toNumber() >= totalBuyAmount;

  useEffect(() => {
    tokens.length > 0 && selectedToken === undefined && setSelectedToken(tokens[0]);
  }, [tokens]);

  useEffect(() => {
    if (isValidReciptientAddress && reciptientAddress && selectedToken) {
      estimateFee();
    }
  }, [selectedToken, reciptientAddress, isValidReciptientAddress]);

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
          seaportSellOrder.getCurrentPrice(),
          reciptientAddress
        );
        if (res && res.Calldata) {
          const fee = Convert.toPOpenseaBuyFee(res);
          setBuyFee(fee);
        }
      } catch (error) {}
    }
  };

  const getBurnPayments = async (): Promise<any> => {
    try {
      let prvPayments: any[] = [];
      let tokenPayments: any[] = [];

      tokenPayments = await getTokenPayments({
        data: [
          {
            paymentAddress: buyFee?.fee?.feeAddress,
            amount: buyFee?.getFeeAmout(),
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

  const getMetadata = async (): Promise<any> => {
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

  const onClickBuy = async () => {
    if (!isIncognitoInstalled()) {
      return requestIncognitoAccount();
    }
    if (buyFee && selectedToken && isCanBuy) {
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
            buyAmountText: buyPriceFormatAmount,
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
          {buyPriceFormatAmount} {selectedToken?.symbol}
        </p>
      </div>
    );

  const renderFee = () =>
    buyFee && (
      <p className="current-price">
        {buyFeeFormatAmount} {selectedToken?.symbol} = {buyFee.getFeeUsdStr()} $
      </p>
    );

  const renderUserBalance = () => <p className="current-balance">Balance: {userBalanceFormatedText}</p>;
  const renderError = () => (
    <p className="current-error">{!isCanBuy && incAccount && 'Your balance is insufficient.'}</p>
  );

  return (
    <React.Fragment>
      {seaportSellOrder && seaportSellOrder.currentPrice && (
        <div className="price-container">
          <div className="view-content">
            <img src={icClock} />
            <p className="time-sale">{`Sale ends ${seaportSellOrder.getSaleEnd()}`}</p>
          </div>
          <div className="price-indicator" />
          <div className="reciptient-container">
            <ReciptientAddress />
            {renderSelectTokenList()}
          </div>
          <div className="price-indicator" />
          <div className="buy-container">
            <div className="price-view">
              <p className="current-price">Current price</p>
              {renderCurrentPrice()}
              {renderFee()}
              {renderUserBalance()}
              {renderError()}
            </div>

            <button className="btn-buy" onClick={!incAccount ? showPopup : onClickBuy}>
              <p className="text-buy">
                {!incAccount ? (isIncognitoInstalled() ? 'Connect wallet' : 'Install wallet') : 'Buy'}
              </p>
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default memo(POpenseaNFTDetailBuy);
