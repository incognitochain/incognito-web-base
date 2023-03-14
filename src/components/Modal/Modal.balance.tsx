import Column from 'components/Core/Column';
import { TAB_LIST, Tabs } from 'components/Core/Tabs';
import { selectedTabIndexSelector } from 'components/Core/Tabs/Tabs.selectors';
import KeyChain from 'pages/IncWebWallet/features/Keychain';
import useWalletController from 'pages/IncWebWallet/hooks/useWalletController';
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
  const walletController = useWalletController();

  let tabList = walletController.isWalletWeb ? TAB_LIST.INCOGNITO_WEB_WALLET_ACCOUNT : TAB_LIST.INCOGNITO_ACCOUNT;

  const selectedTabIndex = useAppSelector(selectedTabIndexSelector)(tabList.rootTab);
  const renderUI = () => {
    const tabs: any = [
      <FollowTokensList key="follow-tokens" />,
      <SwapTxs key="swap-txs" />,
      <KeyChain key="keychain" />,
    ];
    return tabs[selectedTabIndex];
  };
  return (
    <Styled>
      <Tabs rootTab={tabList.rootTab} tabNames={tabList.tabNames} />
      <div className="lineBreak" />
      {renderUI()}
    </Styled>
  );
};

BalanceModal.displayName = 'BalanceModal';

export default BalanceModal;
