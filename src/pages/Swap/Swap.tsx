import { TAB_LIST, Tabs } from 'components/Core/Tabs';
import { selectedTabSelector } from 'components/Core/Tabs/Tabs.selectors';
import AppBody from 'pages/AppBody';
import { useAppSelector } from 'state/hooks';

import { FormDeposit } from './features/FormDeposit';
import { FormSwap } from './features/FormSwap';
import enhance from './Swap.enhance';

const Swap = (props: any) => {
  const { SWAP: HEADER_TAB } = TAB_LIST;
  const selectedTab = useAppSelector(selectedTabSelector)(HEADER_TAB.rootTab);

  const renderForm = () => {
    console.log(selectedTab);
    if (selectedTab === HEADER_TAB.tabNames[0]) return <FormDeposit {...props} />;
    return <FormSwap {...props} />;
  };

  return (
    <>
      <AppBody>
        <Tabs {...HEADER_TAB} />
        {renderForm()}
      </AppBody>
    </>
  );
};

export default enhance(Swap);
