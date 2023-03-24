import { Space } from 'components/Core';
import { ButtonConfirmed } from 'components/Core/Button';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import QrCode from 'components/QrCode';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import useSwitchNetwork from 'lib/hooks/useSwitchNetwork';
import debounce from 'lodash/debounce';
import { WalletState } from 'pages/IncWebWallet/core/types';
import useUnlockWallet from 'pages/IncWebWallet/hooks/useUnlockWalelt';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { genDepositAddress, IDepositAddress } from 'services/rpcClient';
import { useWalletModalToggle } from 'state/application/hooks';
import { webWalletStateSelector } from 'state/masterKey';
import styled from 'styled-components/macro';
import { getAcronymNetwork } from 'utils/token';

import useWalletController from '../../../IncWebWallet/hooks/useWalletController';
import { Selection } from '../Selection';
import AddressBox from './components/AddressBox';
import DescriptionQrCode from './components/DescriptionQrCode';
import ShieldFeeEstimate from './components/ShieldFeeEstimate';
import enhance, { IMergeProps } from './FormDeposit.enhance';

const Styled = styled.div``;

const FormDeposit = (props: IMergeProps) => {
  const {
    sellNetworkList,
    sellTokenList,
    sellNetworkName,
    sellToken,

    onSelectNetwork,
    onSelectToken,
    incAccount,
  } = props;

  const [state, setState] = React.useState<{ isFetching: boolean; data: IDepositAddress | undefined }>({
    isFetching: false,
    data: undefined,
  });

  const [onSwitchNetwork] = useSwitchNetwork({ targetChain: sellToken.chainID });
  const { account } = useActiveWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  const webWalletState = useSelector(webWalletStateSelector);
  const [isShowQrCode, setShowQrCode] = useState(true);
  const { showUnlockModal } = useUnlockWallet();
  const walletController = useWalletController();

  const _actionMetamask = () => {
    if (!account) return toggleWalletModal();
    return onSwitchNetwork(false);
  };

  const { isIncognitoInstalled, showPopup } = useIncognitoWallet();

  const debounceGenDepositAddress = debounce(
    React.useCallback(async () => {
      if (!incAccount?.paymentAddress) return;
      setState({
        data: undefined,
        isFetching: true,
      });
      try {
        const data: IDepositAddress = await genDepositAddress({
          network: getAcronymNetwork(sellToken),
          incAddress: incAccount?.paymentAddress,
          tokenID: sellToken.tokenID,
          currencyType: sellToken.currencyType,
          isBTC: sellToken.isBTC,
        });
        setState({
          data,
          isFetching: false,
        });
      } catch (e) {
        setState({
          data: undefined,
          isFetching: false,
        });
        console.log('GEN ADDRESS ERROR: ', e);
      }
    }, [incAccount?.paymentAddress, sellToken.tokenID, sellToken.currencyType]),
    300
  );

  const shieldingFee = React.useMemo(() => {
    const fee = state.data?.tokenFee || state.data?.estimateFee || 0;
    if (fee) return `${state.data?.tokenFee || state.data?.estimateFee || 0} ${sellToken.symbol}`;
    return '';
  }, [state, sellToken.symbol]);

  useEffect(() => {
    if (!incAccount?.paymentAddress) return;
    debounceGenDepositAddress();
  }, [incAccount?.paymentAddress, sellToken.tokenID, sellToken.currencyType]);

  const buttonTitle = useMemo(() => {
    let title = '';
    if (walletController.isWalletExtension) {
      title = isIncognitoInstalled() ? 'Connect wallet' : 'Install wallet';
    }
    if (walletController.isWalletWeb) {
      switch (webWalletState) {
        case WalletState.uninitialized:
          title = 'Install wallet';
          break;
        case WalletState.unlocked:
        case WalletState.locked:
          title = 'Connect wallet';
          break;
      }
    }
    return title;
  }, [webWalletState]);

  return (
    <Styled>
      {/*<form onSubmit={handleSubmit(onSend)}>*/}
      <Space.Vertical size={16} />
      <Selection
        title="From"
        leftValue={sellToken.symbol}
        rightValue={sellNetworkName}
        tokens={sellTokenList}
        iconUrl={sellToken.iconUrl}
        networks={sellNetworkList}
        onSelectToken={onSelectToken}
        onSelectNetwork={onSelectNetwork}
        currency={sellToken.currencyType}
        showNetwork={true}
      />
      {isShowQrCode && (
        <div>
          <AddressBox paymentAddress={state && state.data?.address} />
          <Space.Vertical size={16} />
          <QrCode
            qrCodeProps={{
              value: state.data?.address || 'NON VALUE',
              size: 156,
            }}
            isBlur={!state.data?.address || !!state?.isFetching}
            isLoading={!!state?.isFetching}
          />
          <DescriptionQrCode
            symbol={sellToken.symbol}
            paymentAddress={state && state.data?.address}
            expiredAt={sellToken.isCentralized && state ? state.data?.expiredAt : undefined}
          />
          {/*<MinimumShiledAmount />*/}
          <ShieldFeeEstimate value={shieldingFee} sellNetworkName={sellNetworkName} />
          {/*<DescriptionBox symbol={sellToken.symbol} token={sellToken} />*/}
        </div>
      )}
      {/* {button.switchNetwork || !account ? (
          <ButtonConfirmed type="button" onClick={_actionMetamask}>
            {button.text}
          </ButtonConfirmed>
        ) : (
          <ButtonConfirmed type="submit">{button.text}</ButtonConfirmed>
        )} */}
      {/*</form>*/}
      {!incAccount && (
        <>
          <Space.Vertical size={16} />
          <ButtonConfirmed
            style={{ height: '50px' }}
            onClick={() => {
              // showPopup && showPopup();
              showUnlockModal();
            }}
          >
            {buttonTitle}
          </ButtonConfirmed>
        </>
      )}
    </Styled>
  );
};

FormDeposit.displayName = 'FormDeposit';

export default enhance(FormDeposit) as any;
