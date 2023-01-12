/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import icVerify from 'assets/svg/ic-verify.svg';
import { BigNumber } from 'bignumber.js';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { useModal } from 'components/Modal';
import { BIG_COINS } from 'constants/token';
import { POpenseaNft, POpenseaOfferFee } from 'models/model/POpenseaNFT';
import PToken from 'models/model/pTokenModel';
import moment from 'moment';
import { FORM_OFFER_POPENSEA } from 'pages/POpenseaNFTDetail/POpenseaNFTDetail.constant';
import React, { memo, useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formValueSelector } from 'redux-form';
import store from 'state';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import {
  actionGetPOpenseaCollectionDetail,
  networkFeePOpenseaSelectors,
  selectedpOpenseaCollectionSelector,
} from 'state/pOpensea';
import { getPrivacyByTokenIdentifySelectors, unshieldableTokens } from 'state/token';
import format from 'utils/format';

import POpenseaSelectDurationDropdown from '../DropdownSelectDuration/POpenseaSelectDuration.dropdown';
import { IPOpenseaMakeOfferAction, POpenseaMakeOfferAction } from './POpenseaMakeOffer.modal.action';
import ModalOfferForm from './POpenseaMakeOffer.modal.form';
import { Spinner, Styled } from './POpenseaMakeOffer.modal.styled';

interface POpenseaModalOfferProps {
  selectedNFT: POpenseaNft;
  contract: string;
  onDeposit: () => void;
}

const POpenseaMakeOffer = (props: POpenseaModalOfferProps) => {
  const { selectedNFT } = props;

  const selectedCollection = useSelector(selectedpOpenseaCollectionSelector);

  const history = useHistory();
  const dispatch = useDispatch();

  const { clearAllModal, setModal } = useModal();
  const { isIncognitoInstalled, showPopup, requestSignTransaction } = useIncognitoWallet();

  const [selectedToken, setSelectedToken] = useState<PToken | undefined>();
  const [duration, setDuration] = useState<number | undefined>(24 * 3); // Default 3 day
  const [offerDate, setOfferDate] = useState(moment().add(duration, 'h').toDate());
  const [isValidBalance, setIsValidBalance] = useState<boolean>(false);

  const [offerFee, setOfferFee] = useState<POpenseaOfferFee | undefined>();
  const [loadingFee, setLoadingFee] = useState<boolean>(false);
  const [overlayContent, setOverlayContent] = useState<React.ReactNode | undefined>();

  const incAccount = useSelector(incognitoWalletAccountSelector);
  const tokens = useSelector(unshieldableTokens).filter(
    (token) => token.isMainETH || token.tokenID === BIG_COINS.ETH_UNIFIED.tokenID
  );
  const selectedTokenPrivacy = useSelector(getPrivacyByTokenIdentifySelectors)(
    selectedToken ? selectedToken.identify : ''
  );
  const networkFee = useSelector(networkFeePOpenseaSelectors);

  const formSelector = formValueSelector(FORM_OFFER_POPENSEA.formName);
  const reciptientAddress = formSelector(store.getState(), FORM_OFFER_POPENSEA.recipitentAddress);
  const priceOffer = formSelector(store.getState(), FORM_OFFER_POPENSEA.offerPriceAddress);

  const childToken =
    selectedToken && selectedToken.isUnified
      ? selectedToken?.listUnifiedToken.find((token) => token.networkID === 1)
      : selectedToken;

  const userBalanceFormatedText = selectedTokenPrivacy
    ? `${selectedTokenPrivacy.formatAmount || 0} ${selectedTokenPrivacy.symbol || ''}`
    : '';
  const offerFeeFormatAmount = offerFee ? offerFee.getFeeFormatAmount(childToken?.pDecimals || 9) : '0';
  const priceOfferFormatAmount = priceOffer
    ? format.amountVer2({ originalAmount: new BigNumber(priceOffer).toNumber(), decimals: 0 })
    : '0';
  const currBalance =
    selectedTokenPrivacy && selectedTokenPrivacy.formatAmount
      ? new BigNumber(selectedTokenPrivacy.formatAmount).toNumber()
      : 0;
  const priceOfferAmount = new BigNumber(priceOfferFormatAmount).toNumber();

  const offerActions: IPOpenseaMakeOfferAction = React.useRef(
    new POpenseaMakeOfferAction({
      component: {
        setLoadingFee,
        setModal,
        clearAllModal,
        setOfferFee,
        setOverlayContent,
      },
      dispatch,
    })
  ).current;

  useEffect(() => {
    tokens.length > 0 && selectedToken === undefined && setSelectedToken(tokens[0]);
  }, [tokens]);

  useEffect(() => {
    !selectedCollection.name && dispatch(actionGetPOpenseaCollectionDetail(props.contract));
  }, [selectedCollection]);

  useEffect(() => {
    if (priceOffer && selectedToken && reciptientAddress && offerDate) {
      if (currBalance >= priceOfferAmount) {
        offerActions.estimateOfferFee(
          props.contract,
          offerDate.getTime(),
          selectedToken,
          childToken,
          priceOffer,
          reciptientAddress,
          selectedNFT
        );
      }
    } else {
      setIsValidBalance(false);
    }
  }, [selectedToken, priceOffer, reciptientAddress, offerDate]);

  useEffect(() => {
    if (priceOffer && selectedToken) {
      let totalOfferAmount = priceOfferAmount;
      if (offerFee) {
        totalOfferAmount = priceOfferAmount + new BigNumber(offerFeeFormatAmount).toNumber();
      }
      setIsValidBalance(currBalance >= totalOfferAmount);
    } else {
      setIsValidBalance(false);
    }
  }, [offerFee, selectedToken, priceOffer]);

  const onChangeTimePicker = (date: Date) => {
    setDuration(undefined);
    setOfferDate(date);
  };

  const onSelectDuration = (duration?: number) => {
    setDuration(duration);
    duration && setOfferDate(moment().add(duration, 'h').toDate());
  };

  const onSelectToken = (token: PToken) => {
    setSelectedToken(token);
  };

  const onClickCollection = () => {
    clearAllModal();
    history.push(`/papps/popensea/detail/${props.contract}`);
  };

  const onViewHistory = () => {
    history.push('/papps/popensea/history');
  };

  const onClickOffer = () => {
    if (isValidBalance) {
      offerActions.offerNFT(
        requestSignTransaction,
        reciptientAddress,
        networkFee,
        offerDate.getTime(),
        props.contract,
        onViewHistory,
        selectedNFT,
        priceOffer,
        selectedToken,
        childToken,
        offerFee,
        selectedCollection.stats?.floorPrice || 0
      );
    }
  };

  const renderOverviewCollection = () => (
    <div className="collection-container">
      <img className="collection-img" src={selectedNFT.collection?.imageUrl} />
      <div>
        <p className="collection-nft-name">{selectedNFT.getOriginalName()}</p>
        <div className="collection-name-container">
          <p className="collection-name" onClick={onClickCollection}>
            {selectedNFT.collection?.name}
          </p>
          {selectedNFT.collection && selectedNFT.collection.getIsVerify() && <img src={icVerify} />}
        </div>
      </div>
    </div>
  );

  const renderFloorPrice = () => (
    <div className="floor-price-container">
      <div>
        <div className="floor-price-content">
          <p className="floor-price-title">Balance</p>
          <p className="floor-price-unit">{userBalanceFormatedText}</p>
        </div>
        <div className="floor-price-content margin-top-8">
          <p className="floor-price-title">Floor price</p>
          <p className="floor-price-unit">{selectedCollection?.getFloorPriceFormatAmount()} ETH</p>
        </div>
      </div>
    </div>
  );

  const renderPrice = () => {
    const totalOfferAmount = format.amountVer2({
      originalAmount: new BigNumber(priceOfferFormatAmount).toNumber() + new BigNumber(offerFeeFormatAmount).toNumber(),
      decimals: 0,
    });

    return (
      <div className="container-price">
        {!loadingFee && offerFee && (
          <p className="current-fee">
            {offerFeeFormatAmount} {selectedToken?.symbol} = {offerFee.getFeeUsdStr()} $
          </p>
        )}
        {loadingFee && <Spinner className="spinner" />}
        <p className="total-offer">
          {offerFee ? `Total offer amount: ${totalOfferAmount} ${selectedToken ? selectedToken?.symbol : ''}` : ''}
        </p>
      </div>
    );
  };

  return (
    <Styled>
      {renderOverviewCollection()}
      {renderFloorPrice()}
      <div>
        <ModalOfferForm
          isValidBalance={isValidBalance}
          incAccount={incAccount}
          onDeposit={props.onDeposit}
          selectedToken={selectedToken}
          tokens={tokens}
          onSelectToken={onSelectToken}
          priceOffer={priceOffer}
        />
        {renderPrice()}
        <div className="duration-container">
          <p className="duration-title">Duration</p>
          <div className="duration-content">
            <POpenseaSelectDurationDropdown selectedDuration={duration} onSelectDuration={onSelectDuration} />
            <DateTimePicker
              className="duration-calendar"
              minDate={moment().toDate()}
              maxDate={moment().add(6, 'M').toDate()}
              onChange={onChangeTimePicker}
              value={offerDate}
              clearIcon={null}
              disableClock={true}
              calendarIcon={null}
              showLeadingZeros
            />
          </div>
        </div>
        <button
          className="btn-offer"
          disabled={!isValidBalance || !offerFee}
          onClick={!incAccount ? showPopup : onClickOffer}
        >
          <p className="text-offer">
            {!incAccount ? (isIncognitoInstalled() ? 'Connect wallet' : 'Install wallet') : 'Make offer'}
          </p>
        </button>
      </div>
      {overlayContent && (
        <div className="loading-container">
          <div className="loading-content">{overlayContent}</div>
        </div>
      )}
    </Styled>
  );
};

export default memo(POpenseaMakeOffer);
