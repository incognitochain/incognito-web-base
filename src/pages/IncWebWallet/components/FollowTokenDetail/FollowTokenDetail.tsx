import { useModal } from 'components/Modal';
import Loading from 'components/Modal/Modal.loading';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { defaultAccountSelector, defaultAccountWalletSelector } from 'state/account/account.selectors';

import BalanceHandler from '../../actions/balanceHandler';
import QRCode from '../../features/QRCode';
import FormSendPage from '../../features/Send';
import { getFollowTokenSelectedTokenSelector } from '../../state/followTokenSelected.selectors';
import CoinsInfoModal from '../CoinsInfo/CoinsInfoModal';
import Header from './components/Header';
import HistoryList from './components/HistoryList';
import TokenBalanceDetail from './components/TokenBalanceDetail';
import { Container } from './styled';
interface Props {
  data?: any;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

const FollowTokenDetail = (props: Props) => {
  const [isShowCoinsInfo, setShowCoinsInfo] = useState(false);
  const { setModal, closeModal } = useModal();

  const followTokenSelected: SelectedPrivacy = useSelector(getFollowTokenSelectedTokenSelector);
  const accountWallet = useSelector(defaultAccountWalletSelector);
  const accountInfo: any = useSelector(defaultAccountSelector);

  const tokenID = followTokenSelected.tokenID;
  const { PaymentAddress = '', paymentAddress = '' } = accountInfo;

  if (!followTokenSelected || !accountWallet || !tokenID) return null;

  const goBack = () => {
    closeModal();
  };

  const renderMainContent = () => {
    return (
      <Container className="animation-opacity">
        <Header
          onCloseModal={() => {
            goBack();
          }}
          onClickCoinInfo={() => setShowCoinsInfo(true)}
          onReloadBalanceCallback={() => {
            BalanceHandler.getFollowTokensBalance();
          }}
          onRemoveFollowTokeneCallback={async () => {
            try {
              setModal({
                closable: false,
                data: <Loading />,
                isTransparent: false,
                rightHeader: undefined,
                title: '',
                hideHeaderDefault: true,
              });

              await accountWallet.removeFollowingToken({ tokenID });
              await BalanceHandler.getFollowTokensBalance();

              setTimeout(() => {
                toast.success('Remove Success');
                closeModal();
                goBack();
              }, 1000);
            } catch (error) {
              console.log('onRemoveFollowTokeneCallback ERROR ', error);
            }
          }}
        />
        <TokenBalanceDetail
          onReceiveClick={() => {
            setModal({
              closable: false,
              data: (
                <QRCode
                  title={'Payment Address'}
                  label={'This is your address. Use it to receive any cryptocurrency from another Incognito address.'}
                  value={PaymentAddress || paymentAddress}
                />
              ),
              isTransparent: false,
              rightHeader: undefined,
              title: '',
              isSearchTokenModal: false,
              hideHeaderDefault: true,
            });
          }}
          onSendClick={() => {
            setModal({
              closable: false,
              data: <FormSendPage />,
              isTransparent: false,
              rightHeader: undefined,
              title: '',
              isSearchTokenModal: false,
              hideHeaderDefault: true,
            });
          }}
        />
        <HistoryList />

        {/* Modal  */}
        {isShowCoinsInfo && (
          <CoinsInfoModal isModalOpen={isShowCoinsInfo} onCloseModal={() => setShowCoinsInfo(false)} />
        )}
      </Container>
    );
  };
  return renderMainContent();
};

export default FollowTokenDetail;
