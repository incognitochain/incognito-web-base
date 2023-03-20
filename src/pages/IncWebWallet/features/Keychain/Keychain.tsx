import { TAB_LIST, Tabs } from 'components/Core/Tabs';
import { selectedTabIndexSelector } from 'components/Core/Tabs/Tabs.selectors';
import { useAppSelector } from 'state/hooks';

import ListMasterKey from './ListMasterKey';
import ListMasterLess from './ListMasterLess';

const KeyChain = () => {
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
