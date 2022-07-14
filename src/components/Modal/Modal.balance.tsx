import styled from 'styled-components/macro';

import Column from '../Core/Column';
import FollowTokensList from './balance/FollowTokens/FollowTokens.list';
import PaymentAddressBar from './balance/PaymentAddressBar';
import TabBar from './balance/TabBar';

const Styled = styled(Column)`
  padding-top: 10px;
  width: 100%;
  overflow-y: auto;
  max-height: 70vh;

  .lineBreak {
    margin-top: 10px;
    margin-bottom: 20px;
    width: 200%;
    height: 1px;
    background-color: ${({ theme }) => theme.border1};
  }
`;

const BalanceModal = (props: any) => {
  return (
    <Styled>
      <TabBar />
      <div className="lineBreak"></div>
      <PaymentAddressBar />
      <FollowTokensList />
    </Styled>
  );
};

BalanceModal.displayName = 'BalanceModal';

export default BalanceModal;
