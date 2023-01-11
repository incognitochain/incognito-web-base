/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import icClock from 'assets/svg/ic-clock.svg';
import BigNumber from 'bignumber.js';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { useModal } from 'components/Modal';
import { BIG_COINS } from 'constants/token';
import { POpenseaBuyFee, POpenseaNft } from 'models/model/POpenseaNFT';
import PToken from 'models/model/pTokenModel';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formValueSelector, isValid, reduxForm } from 'redux-form';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import { networkFeePOpenseaSelectors } from 'state/pOpensea';
import { getPrivacyByTokenIdentifySelectors, unshieldableTokens } from 'state/token';

import store from '../../../state';
import { actionSetToken } from '../../Swap/features/FormDeposit/FormDeposit.actions';
import { FORM_BUY_POPENSEA, FORM_OFFER_POPENSEA } from '../POpenseaNFTDetail.constant';
import POpenseaSelectTokenDropdown from './DropdownSelectToken/POpenseaSelectToken.dropdown';
import POpenseaMakeOfferModal from './ModalMakeOffer/POpenseaMakeOffer.modal';
import { IPOpenseaNFTDetailBuyAction, POpenseaNFTDetailBuyAction } from './POpenseaNFTDetail.buy.action';
import ReciptientAddress from './POpenseaNFTDetail.buy.form';
import { Spinner, Styled } from './POpenseaNFTDetail.buy.styled';

interface POpenseaNFTDetailBuyProps {
  selectedNFT: POpenseaNft;
  contract: string;
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

  const formSelector = formValueSelector(FORM_BUY_POPENSEA.formName);

  const isValidForm = isValid(FORM_BUY_POPENSEA.formName)(store.getState());
  const reciptientAddress = formSelector(store.getState(), FORM_BUY_POPENSEA.recipitentAddress);

  const seaportSellOrder = selectedNFT.getSeaportSellOrder();

  const childToken =
    selectedToken && selectedToken.isUnified
      ? selectedToken?.listUnifiedToken.find((token) => token.networkID === 1)
      : selectedToken;

  const buyPriceFormatAmount = seaportSellOrder
    ? seaportSellOrder.getPricingFormatAmount(childToken?.decimals || 18)
    : '0';

  const buyFeeFormatAmount = buyFee ? buyFee.getFeeFormatAmount(childToken?.pDecimals || 9) : '0';

  useEffect(() => {
    tokens.length > 0 && selectedToken === undefined && setSelectedToken(tokens[0]);
  }, [tokens]);

  useEffect(() => {
    if (isValidForm && selectedToken) {
      buyActions.estimateFee(selectedToken, reciptientAddress, selectedNFT);
    }
  }, [selectedToken, isValidForm]);

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

  const onDeposit = () => {
    clearAllModal();
    history.push('/deposit');
    const token: any = selectedToken?.isUnified
      ? selectedToken.listUnifiedToken.find((token) => token.currencyType === 1)
      : selectedToken;
    if (token) {
      dispatch(actionSetToken({ sellToken: token }));
    }
  };

  const onClickMakeOffer = () => {
    const POpenseaMakeOffer = reduxForm({
      form: FORM_OFFER_POPENSEA.formName,
      destroyOnUnmount: true,
    })(() => <POpenseaMakeOfferModal selectedNFT={selectedNFT} contract={props.contract} onDeposit={onDeposit} />);

    setModal({
      closable: true,
      data: <POpenseaMakeOffer />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Make an offer',
      maxWidth: '590px',
    });
  };

  const onSelectToken = (token: PToken) => {
    setSelectedToken(token);
  };

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
        <span onClick={onDeposit} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
          deposit now
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
            {renderUserBalance()}
            <POpenseaSelectTokenDropdown selectedToken={selectedToken} tokens={tokens} onSelectToken={onSelectToken} />
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
          </div>
          <div className="buy-container">
            <button className="btn-buy" onClick={!incAccount ? showPopup : onClickBuy}>
              <p className="text-buy">
                {!incAccount ? (isIncognitoInstalled() ? 'Connect wallet' : 'Install wallet') : 'Buy'}
              </p>
            </button>
            {incAccount && (
              <button className="btn-offer" onClick={onClickMakeOffer}>
                <p className="text-buy">{'Make offer'}</p>
              </button>
            )}
          </div>
        </div>
      )}
      <button className="btn-offer" onClick={onClickMakeOffer}>
        <p className="text-buy">{'Make offer'}</p>
      </button>
    </Styled>
  );
};

export default memo(POpenseaNFTDetailBuy);
