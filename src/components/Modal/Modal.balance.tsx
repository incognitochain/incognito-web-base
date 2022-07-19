import Column from 'components/Core/Column';
import { TAB_LIST, Tabs } from 'components/Core/Tabs';
import styled from 'styled-components/macro';

import { useAppSelector } from '../../state/hooks';
import { selectedTabIndexSelector } from '../Core/Tabs/Tabs.selectors';
import FollowTokensList from './balance/FollowTokens/FollowTokens.list';
import PaymentAddressBar from './balance/PaymentAddressBar';

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
  const selectedTabIndex = useAppSelector(selectedTabIndexSelector)(TAB_LIST.INCOGNITO_ACCOUNT.rootTab);
  const renderUI = () => {
    const tabs: any = [<FollowTokensList key="follow-tokens" />, null, null];
    return tabs[selectedTabIndex];
  };
  return (
    <Styled>
      <Tabs rootTab={TAB_LIST.INCOGNITO_ACCOUNT.rootTab} tabNames={TAB_LIST.INCOGNITO_ACCOUNT.tabNames} />
      <div className="lineBreak" />
      <PaymentAddressBar />
      {renderUI()}
    </Styled>
  );
};

BalanceModal.displayName = 'BalanceModal';

export default BalanceModal;
