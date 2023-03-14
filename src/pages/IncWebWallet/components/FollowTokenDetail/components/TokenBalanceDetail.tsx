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

  .space {
    height: 10px;
  }

  .text-center {
    text-align: center;
  }

  .button {
    padding: 8px;
    color: ${({ theme }) => theme.color_white};
    background-color: ${({ theme }) => theme.bg4};
    border-radius: 8px;
    height: 30px;
    min-width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }

  .rowButton {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .space-horizontal {
      width: 10px;
    }
  }
`;
interface Props {
  onCloseModal?: () => void;
}

interface Props {}

const TokenBalanceDetail = (props: Props) => {
  console.log('TokenBalanceDetail Render');
  // const dispatch = useDispatch();
  const followTokenSelected: SelectedPrivacy = useSelector(getFollowTokenSelectedTokenSelector);

  if (!followTokenSelected) return null;

  const { formatAmount = '0.00', symbol, formatBalanceByUsd = '0.00' } = followTokenSelected;

  return (
    <Container>
      <div className="center">
        <Image iconUrl={followTokenSelected.iconUrl} size={100} />
      </div>{' '}
      <div className="space" />
      <h3 className="text-center">{`${formatAmount} ${symbol}`}</h3>
      <div className="space" />
      <h6 className="text-center">{`$ ${formatBalanceByUsd}`}</h6>
      <div className="space" />
      <div className="rowButton">
        <div className="button">Send</div>
        <div className="space-horizontal" />
        <div className="button">Receive</div>
      </div>
    </Container>
  );
};

export default TokenBalanceDetail;
