import { ButtonConfirmed } from 'components/Core/Button';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { VerticalSpace } from 'components/Core/Space';
import QrCode from 'components/QrCode';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import useSwitchNetwork from 'lib/hooks/useSwitchNetwork';
import debounce from 'lodash/debounce';
import React, { useEffect, useState } from 'react';
import { genDepositAddress, IDepositAddress } from 'services/rpcClient';
import { useWalletModalToggle } from 'state/application/hooks';
import styled from 'styled-components/macro';
import { getAcronymNetwork } from 'utils/token';

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
  const [isShowQrCode, setShowQrCode] = useState(true);
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

  return (
    <Styled>
      {/*<form onSubmit={handleSubmit(onSend)}>*/}
      <VerticalSpace />
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
          <VerticalSpace />
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
          <VerticalSpace />
          <ButtonConfirmed style={{ height: '50px' }} onClick={showPopup}>
            {isIncognitoInstalled() ? 'Connect wallet' : 'Install wallet'}
          </ButtonConfirmed>
        </>
      )}
    </Styled>
  );
};

FormDeposit.displayName = 'FormDeposit';

export default enhance(FormDeposit) as any;
