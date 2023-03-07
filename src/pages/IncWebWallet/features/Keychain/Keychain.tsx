import { TAB_LIST, Tabs } from 'components/Core/Tabs';
import { selectedTabIndexSelector } from 'components/Core/Tabs/Tabs.selectors';
import { useSelector } from 'react-redux';
import { useAppSelector } from 'state/hooks';
import { webWalletStateSelector } from 'state/masterKey';
import styled from 'styled-components/macro';

import ListMasterKey from './ListMasterKey';
import ListMasterLess from './ListMasterLess';

const Space = styled.div`
  height: 16px;
`;

const KeyChain = () => {
  const webWalletState = useSelector(webWalletStateSelector);
  const { KEYCHAIN } = TAB_LIST;
  const selectedTabIndex = useAppSelector(selectedTabIndexSelector)(KEYCHAIN.rootTab);
  const renderUI = () => {
    const tabs: any = [<ListMasterKey key="masterkey" />, <ListMasterLess key="masterkess" />];
    return tabs[selectedTabIndex];
  };
  return (
    <div className="default-max-width" style={{ width: '100%', paddingBottom: 40 }}>
      <div style={{ flex: 1 }}>
        <Tabs rootTab={KEYCHAIN.rootTab} tabNames={KEYCHAIN.tabNames} />
        {renderUI()}
      </div>
    </div>
  );
};
export default KeyChain;
