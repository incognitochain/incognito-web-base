import { WalletState } from 'core/types';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { defaultAccountPaymentAddressSelector } from 'state/account/account.selectors';
import { webWalletStateSelector } from 'state/masterKey';
import { shortenString } from 'utils';

import { PRIVATE_TOKEN_CURRENCY_TYPE, ROOT_NETWORK_IMG } from '../../../constants';
import { Image } from '../Image';
import { Container, Text, WalletButton, Wrapper } from './WebWallet.styled';

const WebWallet = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const webWalletState = useSelector(webWalletStateSelector);
  const address = useSelector(defaultAccountPaymentAddressSelector);

  const onClickCreateWallet = async () => {
    history.push('/create-wallet');
  };

  const onClickImportWallet = async () => {
    history.push('/import-wallet');
  };

  const onClickWallet = () => {};

  return (
    <div className="wrap-inc-waller">
      <Container>
        {webWalletState === WalletState.uninitialized && (
          <>
            <WalletButton isImport={false} onClick={onClickCreateWallet}>
              <p className="text">Create wallet</p>
            </WalletButton>
            <WalletButton isImport style={{ marginLeft: 16 }} onClick={onClickImportWallet}>
              <p className="text">Import wallet</p>
            </WalletButton>
          </>
        )}
        {webWalletState === WalletState.locked && (
          <WalletButton isImport={false} onClick={onClickCreateWallet}>
            <p className="text">Unlock wallet</p>
          </WalletButton>
        )}
        {webWalletState === WalletState.unlocked && (
          <Wrapper isConnected onClick={onClickWallet}>
            <Image iconUrl={ROOT_NETWORK_IMG[PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO]} />
            <Text>{address ? shortenString(address) : ''}</Text>
          </Wrapper>
        )}
      </Container>
    </div>
  );
};

export default memo(WebWallet);
