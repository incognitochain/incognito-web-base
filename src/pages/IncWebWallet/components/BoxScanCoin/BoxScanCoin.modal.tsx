import { useModal } from 'components/Modal';
import ScanCoinHanlder from 'pages/IncWebWallet/actions/scanCoinHandler';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultAccountWalletSelector, getKeyDefineAccountSelector } from 'state/account/account.selectors';
import { actionFistTimeScanCoins } from 'state/scanCoins/scanCoins.actions';

import { ButtonPrimary } from '../../../../components/Core/Button';
import { Styled } from './BoxScanCoin.styled';

const BoxScanCoinModal = () => {
  const dispatch = useDispatch();

  const { clearAllModal } = useModal();

  const accountSender = useSelector(defaultAccountWalletSelector);
  const keyDefine = useSelector(getKeyDefineAccountSelector);

  if (!keyDefine || !accountSender) return null;

  const hideModal = () => {
    if (clearAllModal) clearAllModal();
  };

  const onSkipPressed = async () => {
    hideModal();
    await dispatch(actionFistTimeScanCoins({ isScanning: false, otaKey: keyDefine }));
    await accountSender.setNewAccountCoinsScan();
  };

  const onSurePressed = async () => {
    hideModal();
    await dispatch(actionFistTimeScanCoins({ isScanning: true, otaKey: keyDefine }));
    ScanCoinHanlder.startScan();
    // await accountSender.setNewAccountCoinsScan();
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
