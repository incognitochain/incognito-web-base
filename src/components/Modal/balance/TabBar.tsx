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

const TabBar = (props: any) => {
  return (
    <TabBarStyled>
      <ThemedText.RegularLabel
        fontWeight={500}
        color="primary5"
        className="button-hover"
        onClick={() => {
          console.log('Profile CLICKED');
        }}
      >
        {'Profile'}
      </ThemedText.RegularLabel>

      <div className="space" />

      <ThemedText.RegularLabel
        fontWeight={500}
        color="primary8"
        className="button-hover"
        onClick={() => {
          console.log('Transactions CLICKED');
        }}
      >
        {'Transactions'}
      </ThemedText.RegularLabel>
    </TabBarStyled>
  );
};

export default TabBar;
