import Column from 'components/Core/Column';
import { TAB_LIST, Tabs } from 'components/Core/Tabs';
import { selectedTabIndexSelector } from 'components/Core/Tabs/Tabs.selectors';
import KeyChain from 'pages/IncWebWallet/features/Keychain';
import { SwapTxs } from 'pages/Swap/features/SwapTxs';
import { useAppSelector } from 'state/hooks';
import styled from 'styled-components/macro';

import FollowTokensList from './balance/FollowTokens/FollowTokens.list';

const Styled = styled(Column)`
  padding-top: 10px;
  width: 100%;
  overflow-y: auto;
  max-height: 80vh;
  height: 600px;
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
  .tab-title {
    font-size: 16px;
  }
`;

const { INCOGNITO_ACCOUNT } = TAB_LIST;
const BalanceModal = (props: any) => {
  const selectedTabIndex = useAppSelector(selectedTabIndexSelector)(INCOGNITO_ACCOUNT.rootTab);
  const renderUI = () => {
    const tabs: any = [
      <FollowTokensList key="follow-tokens" />,
      // <SubmitForm key="submit-form" />,
      <SwapTxs key="swap-txs" />,
      <KeyChain key="keychain" />,
    ];
    return tabs[selectedTabIndex];
  };
  return (
    <Styled>
      <Tabs rootTab={INCOGNITO_ACCOUNT.rootTab} tabNames={INCOGNITO_ACCOUNT.tabNames} />
      <div className="lineBreak" />
      {renderUI()}
    </Styled>
  );
};

BalanceModal.displayName = 'BalanceModal';

export default BalanceModal;
