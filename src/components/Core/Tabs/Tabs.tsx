import Row from 'components/Core/Row';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import { ITabsProps } from './Tab.inteface';
import { changeTab } from './Tabs.reducer';
import { selectedTabSelector } from './Tabs.selectors';

const Styled = styled(Row)`
  .tab-title {
    cursor: pointer;
  }
  .tab-title ~ .tab-title {
    margin-left: 24px;
  }
`;

const Tabs = React.memo((props: ITabsProps) => {
  const { tabNames, rootTab } = props;

  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector(selectedTabSelector)(rootTab);

  const onChangeTab = ({ tabName }: { tabName: string }) => dispatch(changeTab({ tab: tabName, rootTab }));

  const forceChangeTab = () => {
    if (selectedTab) return;
    onChangeTab({ tabName: tabNames[0] });
  };

  React.useEffect(() => forceChangeTab(), []);

  return (
    <Styled>
      {tabNames.map((tabName) => {
        const isActive = tabName === selectedTab;
        return (
          <ThemedText.MediumLabel
            className="tab-title "
            color={isActive ? 'primary5' : 'primary7'}
            key={tabName}
            onClick={() => onChangeTab({ tabName })}
          >
            {tabName}
          </ThemedText.MediumLabel>
        );
      })}
    </Styled>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
