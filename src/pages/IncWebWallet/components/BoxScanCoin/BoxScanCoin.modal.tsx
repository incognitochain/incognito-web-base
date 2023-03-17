import { useModal } from 'components/Modal';
import ScanCoinHanlder from 'pages/IncWebWallet/actions/scanCoinHandler';
import { Account } from 'pages/IncWebWallet/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultAccountWalletSelector, getScanCoinKeySelector } from 'state/account/account.selectors';
import { actionFistTimeScanCoins } from 'state/scanCoins/scanCoins.actions';

import { ButtonPrimary } from '../../../../components/Core/Button';
import { Styled } from './BoxScanCoin.styled';

const BoxScanCoinModal = () => {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const accountSender: Account = useSelector(defaultAccountWalletSelector);
  const scanCoinKey = useSelector(getScanCoinKeySelector);

  if (!scanCoinKey || !accountSender) return null;

  const hideModal = () => {
    if (closeModal) closeModal();
  };

  const onSkipPressed = async () => {
    hideModal();
    await dispatch(actionFistTimeScanCoins({ isScanning: false, otaKey: scanCoinKey }));
    await accountSender.setNewAccountCoinsScan();
  };

  const onSurePressed = async () => {
    hideModal();
    await dispatch(actionFistTimeScanCoins({ isScanning: true, otaKey: scanCoinKey }));
    ScanCoinHanlder.startScan();
  };

  return (
    <Styled>
      <div className="header">
        <p className="title">Confirm</p>
        <p className="h8 description">
          You can skip this step if this is newly created keychain. Otherwise, scan your coins to recalculate your
          private balance. Please wait for a few hours. You can check its progress at the top right label.
        </p>
      </div>

      <div className="row">
        <ButtonPrimary className="skip-btn" onClick={onSkipPressed}>
          Skip
        </ButtonPrimary>
        <div className="space"></div>
        <ButtonPrimary className="confirm-btn" onClick={onSurePressed}>
          Sure
        </ButtonPrimary>
      </div>
    </Styled>
  );
};

export default React.memo(BoxScanCoinModal);
