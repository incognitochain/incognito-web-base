import { useModal } from 'components/Modal';
import ConfirmReScanCoin from 'pages/IncWebWallet/components/ConfirmReScanCoin';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SettingItem from './SettingItem';
import { Styled } from './Settings.styled';
const SettingsPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { setModal } = useModal();

  const reScanCoinOnClicked = async () => {
    setModal({
      data: <ConfirmReScanCoin />,
      title: '',
      isTransparent: true,
      closable: false,
    });
  };

  return (
    <Styled className="default-max-width">
      <SettingItem
        title="Rescan coins"
        description="Clear storage cons and rescan"
        onClick={reScanCoinOnClicked}
      ></SettingItem>
    </Styled>
  );
};

export default memo(SettingsPage);
