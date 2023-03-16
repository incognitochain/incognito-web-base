import InfoIconSrc from 'assets/svg/ic-info.svg';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import BalanceHandler from '../../../actions/balanceHandler';
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
}

const Header = (props: Props) => {
  console.log('Header Render');
  const dispatch = useDispatch();
  const { onCloseModal, onClickCoinInfo = () => {} } = props;
  const followTokenSelected: SelectedPrivacy = useSelector(getFollowTokenSelectedTokenSelector);
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
          <RemoveFollowTokenButton
            key={'remove-button'}
            onClickCallback={() => {
              //TO DO
            }}
          />,
          <div key="space" className="space" />,
          <ReloadBalanceButton
            key={'reload-balance-button'}
            onClickCallback={() => {
              BalanceHandler.getFollowTokensBalance();
            }}
          />,
        ]}
      />
    </Container>
  );
};

export default Header;
