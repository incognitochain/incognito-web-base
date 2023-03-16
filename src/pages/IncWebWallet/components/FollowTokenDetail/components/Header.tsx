import { Popconfirm } from 'antd';
import InfoIconSrc from 'assets/svg/ic-info.svg';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { defaultAccountWalletSelector } from 'state/account/account.selectors';
import styled from 'styled-components/macro';

import { getFollowTokenSelectedTokenSelector } from '../../../state/followTokenSelected.selectors';
import NavigationHeader from '../../NavigationHeader/NavigationHeader';
import ReloadBalanceButton from './ReloadBalanceButton';
import RemoveFollowTokenButton from './RemoveFollowTokenButton';

const Container = styled.div`
  .container {
    background-color: ${({ theme }) => theme.color_grey1};
  }
  .space {
    width: 10px;
  }
`;
interface Props {
  onCloseModal?: () => void;
  onClickCoinInfo?: () => void;
  onReloadBalanceCallback?: () => void;
  onRemoveFollowTokeneCallback?: () => void;
}

const Header = (props: Props) => {
  const {
    onCloseModal,
    onClickCoinInfo = () => {},
    onReloadBalanceCallback = () => {},
    onRemoveFollowTokeneCallback = () => {},
  } = props;
  const followTokenSelected: SelectedPrivacy = useSelector(getFollowTokenSelectedTokenSelector);
  const accountWallet = useSelector(defaultAccountWalletSelector);
  const [isPopConfirm, setPopConfirm] = useState(false);
  if (!followTokenSelected || !accountWallet) return null;

  return (
    <Container>
      <NavigationHeader
        leftTitle={followTokenSelected.symbol || ''}
        onBack={() => {
          onCloseModal?.();
        }}
        leftSubView={
          <div key="info" className="hover-opacity center" onClick={onClickCoinInfo}>
            <div key="space" className="space" />,
            <img alt="ic-info" src={InfoIconSrc} />
          </div>
        }
        rightSubView={[
          followTokenSelected.isMainCrypto ? null : (
            <Popconfirm
              color="#000000"
              placement="bottom"
              title={'Are you sure to delete this token?'}
              onConfirm={() => {
                onRemoveFollowTokeneCallback && onRemoveFollowTokeneCallback();
              }}
              onCancel={() => {
                setPopConfirm(false);
              }}
              okText="Sure"
              cancelText="Cancel"
              open={isPopConfirm}
            >
              <RemoveFollowTokenButton key={'remove-button'} onClickCallback={() => setPopConfirm(true)} />
            </Popconfirm>
          ),
          <div key="space" className="space" />,
          <ReloadBalanceButton key={'reload-balance-button'} onClickCallback={onReloadBalanceCallback} />,
        ]}
      />
    </Container>
  );
};

export default Header;
