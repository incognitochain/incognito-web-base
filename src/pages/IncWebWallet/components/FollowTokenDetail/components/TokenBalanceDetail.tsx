import { AppButton } from 'components/Core';
import { Space } from 'components/Core';
import { Image } from 'components/Core/Image';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { getFollowTokenSelectedTokenSelector } from '../../../state/followTokenSelected.selectors';
const Container = styled.div`
  margin-top: 20px;
  min-height: 200px;
  background-color: ${({ theme }) => theme.color_grey1};

  flex-direction: column;

  .text-center {
    text-align: center;
  }

  .rowButton {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;
interface Props {
  onCloseModal?: () => void;
  onSendClick?: () => void;
  onReceiveClick?: () => void;
}

const TokenBalanceDetail = (props: Props) => {
  console.log('TokenBalanceDetail Render');
  // const dispatch = useDispatch();

  const { onCloseModal, onSendClick, onReceiveClick } = props;
  const followTokenSelected: SelectedPrivacy = useSelector(getFollowTokenSelectedTokenSelector);

  if (!followTokenSelected) return null;

  const { formatAmount = '0.00', symbol, formatBalanceByUsd = '0.00' } = followTokenSelected;

  return (
    <Container>
      <Space.Vertical size={20} />
      <div className="center">
        <Image iconUrl={followTokenSelected.iconUrl} size={100} />
      </div>{' '}
      <Space.Vertical size={20} />
      <h3 className="text-center">{`${formatAmount} ${symbol}`}</h3>
      <Space.Vertical size={10} />
      <h6 className="text-center">{`$ ${formatBalanceByUsd}`}</h6>
      <Space.Vertical size={20} />
      <div className="rowButton">
        <AppButton variant="contained" buttonType="third" onClick={onSendClick} className="maxSize">
          Send
        </AppButton>
        <Space.Horizontal size={20} />
        <AppButton variant="contained" buttonType="third" onClick={onReceiveClick} className="maxSize">
          Receive
        </AppButton>
      </div>
    </Container>
  );
};

export default TokenBalanceDetail;
