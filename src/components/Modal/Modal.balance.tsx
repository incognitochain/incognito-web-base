import { useState } from 'react';
import styled from 'styled-components/macro';

import Column from '../Core/Column';
import FollowTokensList from './balance/FollowTokens/FollowTokens.list';
import PaymentAddressBar from './balance/PaymentAddressBar';
import TabBar, { TabType } from './balance/TabBar';

const Styled = styled(Column)`
  padding-top: 10px;
  width: 100%;
  overflow-y: auto;
  max-height: 80vh;

  .tab-bar-container {
    display: flex;
    position: relative;
  }

  .lineBreak {
    margin-top: 10px;
    margin-bottom: 20px;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.border5};
  }
`;

const BalanceModal = (props: any) => {
  const [activeTab, setActiveTab] = useState<TabType>('Profile');
  return (
    <Styled>
      <TabBar activeTab={activeTab} onTabClick={(tabActive) => setActiveTab(tabActive)} />
      <div className="lineBreak"></div>
      <PaymentAddressBar />
      {activeTab === 'Profile' ? <FollowTokensList /> : null}
    </Styled>
  );
};

BalanceModal.displayName = 'BalanceModal';

export default BalanceModal;
