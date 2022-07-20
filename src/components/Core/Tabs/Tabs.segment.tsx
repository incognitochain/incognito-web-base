import React from 'react';
import styled from 'styled-components/macro';

import { BaseButton } from '../Button';
import { ITabsProps } from './Tab.inteface';
import enhance from './Tabs.enhance';

const Styled = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.primary14};
  height: 50px;
  padding: 4px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  border: 1px solid ${({ theme }) => theme.border1};

  .segment-item {
    flex: 1;
    background-color: transparent;
    cursor: pointer;
    text-align: center;
    line-height: 100%;
    :hover {
      opacity: 0.8;
    }
  }
  .active {
    background-color: ${({ theme }) => theme.bg4};
    border: 1px solid ${({ theme }) => theme.border1};
  }
`;

interface IProps extends ITabsProps {
  selectedTab?: string;
  changeTab?: ({ tabName }: { tabName: string }) => void;
}

const TabsSegment = React.memo((props: IProps) => {
  const { tabNames, selectedTab, changeTab } = props;
  return (
    <Styled>
      {tabNames.map((tabName: string) => {
        const isActive = tabName === selectedTab;
        return (
          <BaseButton
            key={tabName}
            className={`segment-item ${isActive ? 'active' : ''}`}
            onClick={() => changeTab && changeTab({ tabName })}
          >
            {tabName}
          </BaseButton>
        );
      })}
    </Styled>
  );
});

TabsSegment.displayName = 'TabsSegment';

export default enhance(TabsSegment);
