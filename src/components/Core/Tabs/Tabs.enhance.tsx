import React from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';

import { changeTab } from './Tabs.reducer';
import { selectedTabSelector } from './Tabs.selectors';

const enhance = (WrappedComponent: any) => {
  const TabComp = (props: any) => {
    const dispatch = useAppDispatch();
    const { tabNames, rootTab, onChangeTab } = props;
    const selectedTab = useAppSelector(selectedTabSelector)(rootTab);

    const _onChangeTab = ({ tabName }: { tabName: string }) => {
      if (tabName === selectedTab) return;
      dispatch(changeTab({ tab: tabName, rootTab }));
      if (onChangeTab instanceof Function) {
        onChangeTab();
      }
    };

    const forceChangeTab = () => {
      if (selectedTab) return;
      _onChangeTab({ tabName: tabNames[0] });
    };

    React.useEffect(() => forceChangeTab(), []);
    return <WrappedComponent {...{ ...props, selectedTab, changeTab: _onChangeTab }} />;
  };
  TabComp.displayName = 'TabComp.enhance';
  return TabComp;
};

export default enhance;
