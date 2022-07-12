import Loader from 'components/Core/Loader';
import { TAB_LIST, Tabs } from 'components/Core/Tabs';
import { selectedTabSelector } from 'components/Core/Tabs/Tabs.selectors';
import AppBody from 'pages/AppBody';
import { useAppSelector } from 'state/hooks';
import { isFetchingSelectors as isFetchingTokenSelector } from 'state/token';

import { FormDeposit } from './features/FormDeposit';
import { FormUnshield } from './features/FormUnshield';
import enhance from './Swap.enhance';

const Swap = (props: any) => {
  const { SWAP: HEADER_TAB } = TAB_LIST;
  const selectedTab = useAppSelector(selectedTabSelector)(HEADER_TAB.rootTab);
  const isFetching = useAppSelector(isFetchingTokenSelector);

  const renderForm = () => {
    // Deposit
    if (selectedTab === HEADER_TAB.tabNames[0]) return <FormDeposit {...props} />;
    return <FormUnshield {...props} />;
  };

  const renderContent = () => (
    <>
      <Tabs {...HEADER_TAB} />
      {renderForm()}
    </>
  );

  return (
    <>
      <AppBody>{isFetching ? <Loader /> : renderContent()}</AppBody>
    </>
  );
};

export default enhance(Swap);
