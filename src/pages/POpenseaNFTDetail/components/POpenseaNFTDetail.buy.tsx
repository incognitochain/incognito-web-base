/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import icClock from 'assets/svg/ic-clock.svg';
import BigNumber from 'bignumber.js';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { useModal } from 'components/Modal';
import ModalTokens from 'components/Modal/Modal.tokens';
import { BIG_COINS } from 'constants/token';
import { POpenseaBuyFee, POpenseaNft } from 'models/model/POpenseaNFT';
import PToken from 'models/model/pTokenModel';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formValueSelector, isValid } from 'redux-form';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import { networkFeePOpenseaSelectors } from 'state/pOpensea';
import { getPrivacyByTokenIdentifySelectors, unshieldableTokens } from 'state/token';

import store from '../../../state';
import { actionSetToken } from '../../Swap/features/FormDeposit/FormDeposit.actions';
import { IPOpenseaNFTDetailBuyAction, POpenseaNFTDetailBuyAction } from './POpenseaNFTDetail.buy.action';
import ReciptientAddress, { FIELD_NAME, FORM_NAME } from './POpenseaNFTDetail.buy.form';
import { ArrowDown, Spinner, Styled } from './POpenseaNFTDetail.buy.styled';

interface POpenseaNFTDetailBuyProps {
  selectedNFT: POpenseaNft;
}

const POpenseaNFTDetailBuy = (props: POpenseaNFTDetailBuyProps) => {
  const { selectedNFT } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  const { setModal, clearAllModal } = useModal();
  const { requestSignTransaction, isIncognitoInstalled, requestIncognitoAccount, showPopup } = useIncognitoWallet();

  const [selectedToken, setSelectedToken] = useState<PToken | undefined>();
  const [buyFee, setBuyFee] = useState<POpenseaBuyFee | undefined>();
  const [loadingFee, setLoadingFee] = useState<boolean>(false);
  const [isCanBuy, setIsCanBuy] = useState<boolean>(true);

  const buyActions: IPOpenseaNFTDetailBuyAction = new POpenseaNFTDetailBuyAction({
    component: {
      setBuyFee,
      setLoadingFee,
      setModal,
      clearAllModal,
      requestSignTransaction,
    },
    dispatch,
  });

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

  const childToken =
    selectedToken && selectedToken.isUnified
      ? selectedToken?.listUnifiedToken.find((token) => token.networkID === 1)
      : undefined;

  const buyPriceFormatAmount = seaportSellOrder
    ? seaportSellOrder.getPricingFormatAmount(childToken?.decimals || 18)
    : '0';

  const buyFeeFormatAmount = buyFee ? buyFee.getFeeFormatAmount(childToken?.pDecimals || 9) : '0';

  useEffect(() => {
    tokens.length > 0 && selectedToken === undefined && setSelectedToken(tokens[0]);
  }, [tokens]);

  useEffect(() => {
    if (isValidReciptientAddress && selectedToken) {
      buyActions.estimateFee(selectedToken, reciptientAddress, selectedNFT);
    }
  }, [selectedToken, isValidReciptientAddress]);

  const onClickBuy = async () => {
    if (!isIncognitoInstalled()) {
      return requestIncognitoAccount();
    }

    const totalBuyAmount =
      new BigNumber(buyPriceFormatAmount).toNumber() + new BigNumber(buyFeeFormatAmount).toNumber();
    const _isCanBuy =
      selectedTokenPrivacy &&
      selectedTokenPrivacy.formatAmount &&
      new BigNumber(selectedTokenPrivacy.formatAmount).toNumber() >= totalBuyAmount
        ? true
        : false;

    setIsCanBuy(_isCanBuy);

    if (_isCanBuy) {
      buyActions.buyNFT(
        reciptientAddress,
        networkFee,
        buyPriceFormatAmount,
        selectedToken,
        childToken,
        buyFee,
        seaportSellOrder
      );
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

  const renderFee = () => (
    <div>
      {!loadingFee && buyFee && (
        <p className="current-fee">
          {buyFeeFormatAmount} {selectedToken?.symbol} = {buyFee.getFeeUsdStr()} $
        </p>
      )}
      {loadingFee && <Spinner />}
    </div>
  );

  const renderUserBalance = () => {
    const userBalanceFormatedText = selectedTokenPrivacy
      ? `${selectedTokenPrivacy.formatAmount || 0} ${selectedTokenPrivacy.symbol || ''}`
      : '';
    return <p className="current-balance">Balance: {userBalanceFormatedText}</p>;
  };

  const renderError = () => (
    <p className="current-error">
      {!isCanBuy && incAccount && 'Your balance is insufficient.'}{' '}
      {!isCanBuy && incAccount && (
        <span
          onClick={() => {
            history.push('/deposit');
            const token: any = selectedToken?.isUnified
              ? selectedToken.listUnifiedToken.find((token) => token.currencyType === 1)
              : selectedToken;
            if (token) {
              dispatch(actionSetToken({ sellToken: token }));
            }
          }}
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          shield now
        </span>
      )}
    </p>
  );

  return (
    <Styled>
      {seaportSellOrder && seaportSellOrder.currentPrice && (
        <div className="price-container">
          <div className="view-content">
            <img src={icClock} />
            <p className="time-sale">{`Sale ends ${seaportSellOrder.getSaleEnd()}`}</p>
          </div>
          <div className="price-indicator" />
          <div className="balance-container">
            <div>{renderUserBalance()}</div>
            {renderSelectTokenList()}
          </div>
          <ReciptientAddress />

          <div className="price-indicator" />
          <div className="buy-container">
            <div className="price-view">
              <p className="current-price">Current price</p>
              {renderCurrentPrice()}
              {renderFee()}
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
    </Styled>
  );
};

export default memo(POpenseaNFTDetailBuy);
