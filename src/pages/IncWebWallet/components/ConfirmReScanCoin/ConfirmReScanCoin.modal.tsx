import { useModal } from 'components/Modal';
import ScanCoinHanlder from 'pages/IncWebWallet/actions/scanCoinHandler';
import { Account } from 'pages/IncWebWallet/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultAccountWalletSelector, getScanCoinKeySelector } from 'state/account/account.selectors';
import { actionFistTimeScanCoins } from 'state/scanCoins/scanCoins.actions';

import { ButtonPrimary } from '../../../../components/Core/Button';
import { Styled } from './ConfirmReScanCoin.styled';

const ConfirmReScanCoinModal = () => {
  const dispatch = useDispatch();

  const { clearAllModal } = useModal();

  const accountSender: Account = useSelector(defaultAccountWalletSelector);
  const scanCoinKey = useSelector(getScanCoinKeySelector);

  if (!scanCoinKey || !accountSender) return null;

  const hideModal = () => {
    if (clearAllModal) clearAllModal();
  };

  const onSkipPressed = async () => {
    hideModal();
  };

  const onSurePressed = async () => {
    hideModal();
    await ScanCoinHanlder.clearScan();
    await ScanCoinHanlder.stopScan();

    await dispatch(actionFistTimeScanCoins({ isScanning: true, otaKey: scanCoinKey }));
    await ScanCoinHanlder.startScan();
  };

  return (
    <Styled>
      <div className="header">
        <p className="title">Rescan coins</p>
        <p className="h8 description">Clear storage coins and rescan</p>
      </div>

      <div className="row">
        <ButtonPrimary className="skip-btn" onClick={onSkipPressed}>
          Cancel
        </ButtonPrimary>
        <div className="space"></div>
        <ButtonPrimary className="confirm-btn" onClick={onSurePressed}>
          Sure
        </ButtonPrimary>
      </div>
    </Styled>
  );
};

export default React.memo(ConfirmReScanCoinModal);
