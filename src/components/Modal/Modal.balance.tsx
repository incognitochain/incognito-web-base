import { TAB_LIST, Tabs } from 'components/Core/Tabs';
import { selectedTabIndexSelector } from 'components/Core/Tabs/Tabs.selectors';
import { useModal } from 'components/Modal';
import AddTokenModal from 'components/Modal/Modal.addToken';
import KeyChain from 'pages/IncWebWallet/features/Keychain';
import useWalletController from 'pages/IncWebWallet/hooks/useWalletController';
import { SwapTxs } from 'pages/Swap/features/SwapTxs';
import { useSelector } from 'react-redux';
import { useAppSelector } from 'state/hooks';
import { pTokensSelector } from 'state/token';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import FollowTokensList from './balance/FollowTokens/FollowTokens.list';

const Styled = styled.div`
  padding-top: 10px;
  width: 100%;
  overflow-y: auto;
  max-height: 80vh;
  position: relative;
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

  .addTokenBtn {
    margin-bottom: 20px;
    background-color: ${({ theme }) => '#252525'};
    position: sticky;
    bottom: 25px;
    margin-left: 85%;

    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    box-shadow: 0px 0px 5px white;

    :hover {
      cursor: pointer;
      transform: scale(1.03);
      box-shadow: 0px 0px 15px white;
    }
  }
`;

const BalanceModal = (props: any) => {
  const walletController = useWalletController();
  const { setModal, closeModal } = useModal();
  let tabList = walletController.isWalletWeb ? TAB_LIST.INCOGNITO_WEB_WALLET_ACCOUNT : TAB_LIST.INCOGNITO_ACCOUNT;

  const selectedTabIndex = useAppSelector(selectedTabIndexSelector)(tabList.rootTab);
  const pTokens: any = useSelector(pTokensSelector) || {};

  const renderUI = () => {
    const tabs: any = [
      <FollowTokensList key="follow-tokens" />,
      <SwapTxs key="swap-txs" />,
      <KeyChain key="keychain" />,
    ];
    return tabs[selectedTabIndex];
  };

  const renderAddTokenButton = () => {
    if (walletController.isWalletExtension) return null;
    if (selectedTabIndex !== 0) return null;
    else
      return (
        <div
          className="addTokenBtn hover"
          onClick={() => {
            setModal({
              closable: true,
              data: <AddTokenModal tokens={Object.values(pTokens)} showNetwork={true} />,
              isTransparent: false,
              rightHeader: undefined,
              title: 'Add Token',
            });
          }}
        >
          <ThemedText.LargeHeader fontSize={30}>+</ThemedText.LargeHeader>
        </div>
      );
  };

  return (
    <Styled>
      <Tabs rootTab={tabList.rootTab} tabNames={tabList.tabNames} />
      <div className="lineBreak" />
      {renderUI()}
      {renderAddTokenButton()}
    </Styled>
  );
};

BalanceModal.displayName = 'BalanceModal';

export default BalanceModal;
