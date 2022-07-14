/* eslint-disable @typescript-eslint/no-empty-function */
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

const TabBarStyled = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;

  .space {
    width: 25px;
  }
`;

export type TabType = 'Profile' | 'Transactions';
interface TabBarProps {
  activeTab: TabType;
  onTabClick: (activeTab: TabType) => void;
}
const TabBar = (props: TabBarProps) => {
  const { activeTab = 'Profile', onTabClick = () => {} } = props;
  return (
    <TabBarStyled>
      <ThemedText.RegularLabel
        fontWeight={500}
        color={activeTab === 'Profile' ? 'primary5' : 'primary8'}
        className="button-hover"
        onClick={() => {
          onTabClick('Profile');
        }}
      >
        {'Profile'}
      </ThemedText.RegularLabel>

      <div className="space" />

      <ThemedText.RegularLabel
        fontWeight={500}
        color={activeTab === 'Profile' ? 'primary8' : 'primary5'}
        className="button-hover"
        onClick={() => {
          onTabClick('Transactions');
        }}
      >
        {'Transactions'}
      </ThemedText.RegularLabel>
    </TabBarStyled>
  );
};

export default TabBar;
