import { TAB_LIST } from 'components/Core/Tabs';
import TabsSegment from 'components/Core/Tabs/Tabs.segment';
import { selectedTabIndexSelector } from 'components/Core/Tabs/Tabs.selectors';
import React from 'react';
import { useAppSelector } from 'state/hooks';

import { SubmitTxDeposit } from '../SubmitTxDeposit';
import { SubmitTxUnshield } from '../SubmitTxUnshield';

const { SUBMIT_PROOF: HEADER_TAB } = TAB_LIST;
const SubmitForm = React.memo((props: any) => {
  const selectedTabIndex = useAppSelector(selectedTabIndexSelector)(HEADER_TAB.rootTab);
  const renderUI = () => {
    const tabs: any = [<SubmitTxDeposit key="submit-deposit" />, <SubmitTxUnshield key="submit-unshield" />];
    return tabs[selectedTabIndex];
  };
  return (
    <>
      <TabsSegment {...HEADER_TAB} />
      {renderUI()}
    </>
  );
});

SubmitForm.displayName = 'SubmitForm';

export default SubmitForm;
