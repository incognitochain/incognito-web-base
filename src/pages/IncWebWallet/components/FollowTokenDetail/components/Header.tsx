import BinIconSrc from 'assets/svg/ic-bin.svg';
import InfoIconSrc from 'assets/svg/ic-info.svg';
import ReloadIconSrc from 'assets/svg/ic-reload.svg';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { getFollowTokenSelectedTokenSelector } from '../../../state/followTokenSelected.selectors';
import NavigationHeader from '../../NavigationHeader/NavigationHeader';

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
          <div key="bin-ic-key" className="hover-opacity center">
            <img alt="ic-bin" src={BinIconSrc} />
          </div>,
          <div key="space" className="space" />,
          <div key="remove-ic-key" className="hover-opacity center">
            <img alt="ic-reload1" src={ReloadIconSrc} />
          </div>,
        ]}
      />
    </Container>
  );
};

export default Header;
