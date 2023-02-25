import { useModal } from 'components/Modal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultAccountWalletSelector, getKeyDefineAccountSelector } from 'state/account/account.selectors';
import { actionFistTimeScanCoins } from 'state/scanCoins/scanCoins.actions';

import { ButtonPrimary } from '../../../../components/Core/Button';
import { scanCoinHandler } from '../../actions/scanCoinHandler';
import { Styled } from './BoxScanCoin.styled';

const BoxScanCoinModal = () => {
  const dispatch = useDispatch();

  const { clearAllModal } = useModal();

  const accountSender = useSelector(defaultAccountWalletSelector);
  const keyDefine = useSelector(getKeyDefineAccountSelector);

  const onButtonPress = async (isCancel = false) => {
    try {
      if (clearAllModal) clearAllModal();
      if (!accountSender || !keyDefine) return;

      const isFirstTimeScan = isCancel ? false : true;

      await dispatch(actionFistTimeScanCoins({ isScanning: isFirstTimeScan, otaKey: keyDefine }));
      if (isCancel) {
        await accountSender.setNewAccountCoinsScan();
      }
      setTimeout(() => {
        scanCoinHandler({ isClear: false });
      }, 2000);
    } catch (err) {
      console.log('error: set default UTXOs scan coins failed  with error: %s', err);
    }
  };

  const onSkipPressed = async () => {
    console.log('onSkipPressed TO DO  ');
    onButtonPress(true);
  };

  const onSurePressed = async () => {
    console.log('onSurePressed TO DO  ');
    onButtonPress(false);
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
